import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';

export default class CreatePermissions implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    const adminRole = await roleRepository.findOne({ where: { id: 1 } });
    const doctorRole = await roleRepository.findOne({ where: { id: 2 } });
    const patientRole = await roleRepository.findOne({ where: { id: 3 } });

    const permissionsData = [
      // Permissions for user
      {
        entity: 'users',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'users',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: doctorRole,
      },
      {
        entity: 'users',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: patientRole,
      },

      // Permissions for appointments
      {
        entity: 'appointments',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'appointments',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: doctorRole,
      },
      {
        entity: 'appointments',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: patientRole,
      },
    ];

    for (const permission of permissionsData) {
      const permissionExists = await permissionRepository.findOneBy({
        entity: permission.entity,
        role: permission.role,
      });

      if (!permissionExists) {
        const newPermission = permissionRepository.create(permission);
        await permissionRepository.save(newPermission);
      }
    }
  }
}
