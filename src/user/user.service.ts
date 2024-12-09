import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/user/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/user/dto/update-put-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ name, email, password }: CreateUserDTO) {

        return this.prisma.user.create({
            data: {
                name,
                email,
                password
            },
        });
    }

    async list() {

        return this.prisma.user.findMany({});
    }

    async show(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: UpdatePutUserDTO) {
        return this.prisma.user.update({
            data,
            where: {
                id,
            }
        })
    }

    async updatePartial(id: number, { name, email, password, active, role }: UpdatePatchUserDTO) {
        return this.prisma.user.update({
            data: { name, email, password, active, role },
            where: {
                id,
            }
        })
    }

    async delete(id: number) {
        return this.prisma.user.delete({
            where: {
                id,
            }
        })
    }
}
