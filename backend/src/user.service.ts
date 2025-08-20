import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/update_user.dto'


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({where: userWhereUniqueInput});
    }

    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const data: Prisma.UserCreateInput = {
            email: dto.email,
            name: dto.name ?? null
        };
        return this.prisma.user.create({data});
    }

    async updateUser(where: Prisma.UserWhereUniqueInput, dto: UpdateUserDto): Promise<User> {
        const data: Prisma.UserUpdateInput = {
            email: dto.email ?? undefined,
            name: dto.name ?? null
        };
        return this.prisma.user.update({where: where, data: data})
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({where: where});
    }
}