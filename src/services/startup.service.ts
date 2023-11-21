import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DepartmentService } from './department.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _departmentService: DepartmentService,
    private readonly _roleService: RoleService,
    private readonly _userService: UserService,
  ) {}
  onApplicationBootstrap = async () => {
    // department
    const departmentName = 'HR';
    let defaultDepartment =
      await this._departmentService.findByName(departmentName);
    if (!defaultDepartment) {
      defaultDepartment = await this._departmentService.create({
        name: departmentName,
        isDefault: true,
      });
    }

    // role
    const roleName = 'admin';
    let defaultRole = await this._roleService.findByName(roleName);
    if (!defaultRole) {
      defaultRole = await this._roleService.create({
        name: roleName,
        isDefault: true,
      });
    }

    // user
    const username = this._configService.get('ADMIN_USER');
    const password = this._configService.get('ADMIN_PASSWORD');
    const defaultUser = await this._userService.findByUsername(username);
    if (!defaultUser) {
      await this._userService.create({
        username,
        password,
        email: 'admin@internal.com',
        mobile: '+91-9999999999',
        department: defaultDepartment,
        dob: new Date('1990-01-01'),
        firstname: 'Super',
        lastname: 'Admin',
        role: defaultRole,
        isActive: true,
        isVerified: true,
      });
    }
  };
}
