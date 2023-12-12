import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APPNAME } from './app.constants';
import helmet from 'helmet';
import { json } from 'express';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { transports, format } from 'winston';
import { Logger } from '@nestjs/common';
import { set } from 'mongoose';

async function bootstrap() {
  set('debug', !process.env.ENV_PROD);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '7d',
        }),
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '7d',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}:${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });

  // documentation
  const config = new DocumentBuilder()
    .setTitle(APPNAME)
    .setDescription(`${APPNAME} SERVICE`)
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // cors & helmet
  app.enableCors();
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(json({ limit: '10mb' }));

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);

  const exitHandler = async () => {
    if (app) {
      await app.close();
      Logger.log('Server closed');
      process.exit(1);
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    Logger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  // logger.log('SIGTERM received');
  process.on('SIGTERM', () => {
    if (app) {
      app.close();
    }
  });
}
bootstrap();
