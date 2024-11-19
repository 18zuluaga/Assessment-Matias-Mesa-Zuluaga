import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateUsers from './users.seed';
import CreateRoles from './roles.seed';
import CreatePermissions from './permissions.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const roleSeeders = new CreateRoles();
    await roleSeeders.run(this.dataSource);

    const userSeeders = new CreateUsers();
    await userSeeders.run(this.dataSource);

    const permissionsSeeders = new CreatePermissions();
    await permissionsSeeders.run(this.dataSource);
  }
}
