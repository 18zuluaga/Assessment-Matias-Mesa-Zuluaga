import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { Admin } from '../const';

export default class CreateRoles implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);

    const rolesData = [
      { name: Admin },
      { name: 'doctor' },
      { name: 'patient' },
    ];

    for (const role of rolesData) {
      const roleExists = await roleRepository.findOneBy({ name: role.name });

      if (!roleExists) {
        console.log('añadiendo role: ', role.name);
        const newRole = roleRepository.create(role);
        await roleRepository.save(newRole);
      }
    }

    console.log('Roles creados');
  }
}
