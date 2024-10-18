import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private readonly databaseService: PrismaService){}

    async registerUser(email: string, username: string, password: string, role: Role) {
        const users = await this.databaseService.user.count();
        const userID = `USER-${users + 1}`;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.databaseService.user.create({
            data: { userID, username, email, password: hashedPassword, role },
        });
            return user;
      }
      
      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.databaseService.user.findFirst({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
          return user;  // Return the user if password matches
        }
        return null;  // Return null if invalid
      }
}
