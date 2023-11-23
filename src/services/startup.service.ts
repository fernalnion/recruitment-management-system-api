import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DepartmentService } from '../business/department.service';
import { RoleService } from '../business/role.service';
import { UserService } from '../business/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly departmentService: DepartmentService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}
  onApplicationBootstrap = async () => {
    // department
    const departmentName = 'HR';
    let defaultDepartment =
      await this.departmentService.findByName(departmentName);
    if (!defaultDepartment) {
      defaultDepartment = await this.departmentService.create({
        name: departmentName,
        isDefault: true,
      });
    }

    // role
    const roleName = 'admin';
    let defaultRole = await this.roleService.findByName(roleName);
    if (!defaultRole) {
      defaultRole = await this.roleService.create({
        name: roleName,
        isDefault: true,
      });
    }

    // user
    const { username, password } = this.configService.get('defaultAccount');
    const defaultUser = await this.userService.findByUsername(username);
    if (!defaultUser) {
      await this.userService.create({
        username,
        password,
        email: 'admin@internal.com',
        mobile: '+91-9999999999',
        department: defaultDepartment._id,
        dob: new Date('1990-01-01'),
        firstname: 'Super',
        lastname: 'Admin',
        role: defaultRole._id,
        isActive: true,
        isVerified: true,
      });
    }
  };
}
