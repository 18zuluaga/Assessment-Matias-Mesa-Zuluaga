import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { Admin } from '../const';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const adminRole = await roleRepository.findOne({ where: { id: 1 } });
    const doctorRole = await roleRepository.findOne({ where: { id: 2 } });
    const patientRole = await roleRepository.findOne({ where: { id: 3 } });

    const usersData = [
      {
        name: Admin,
        doc_number: 123456,
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@correo.com',
        role: adminRole,
      },
      {
        name: 'Doctor',
        doc_number: 654321,
        password: bcrypt.hashSync('654321', 10),
        email: 'doctor@correo.com',
        role: doctorRole,
      },

      {
        name: 'patient',
        doc_number: 12345,
        password: bcrypt.hashSync('654321', 10),
        email: 'patient@correo.com',
        role: patientRole,
      },
    ];

    for (const user of usersData) {
      const userExists = await userRepository.findOneBy({
        doc_number: user.doc_number,
      });

      if (!userExists) {
        console.log('añadiendo user:', user.name);
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }

    console.log('Users creados');
  }
}
