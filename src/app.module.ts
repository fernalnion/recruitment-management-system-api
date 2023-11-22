import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import configuration from './configuration';
import { AppliedJobController } from './modules/applied-job/applied-job.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StartupService } from './services/startup.service';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: +configService.get('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          cli: {
            entitiesDir: __dirname + '/entities',
          },
          enumName: 'string',
          debug: Boolean(configService.get('database.debug') ?? false),
          verboseRetryLog: Boolean(
            configService.get('database.debug') ?? false,
          ),
          synchronize: Boolean(
            configService.get('database.synchronize') ?? false,
          ),
        };
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], // Import ConfigModule
    //   useFactory: (configService: ConfigurationService) =>
    //     configService.typeOrmConfig,
    //   inject: [ConfigurationService],
    // }),
    BusinessModule,
    AuthModule,
    UsersModule,
    RoleModule,
  ],
  controllers: [AppController, AppliedJobController],
  providers: [AppService, StartupService],
})
export class AppModule {}
