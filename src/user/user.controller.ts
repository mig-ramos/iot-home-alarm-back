// import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/dto/update-put-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';

// @UseInterceptors(LogInterceptor)  // Exemplo de Intereptor
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService, private readonly prisma: PrismaService) { }

    @Post()
    async create(@Body() { name, email, password, active }: CreateUserDTO) {
        return this.userService.create({ name, email, password, active });
    }

    @Get()
    async list() {
        return this.userService.list();
    }

    // @Get(':id')
    // async show(@Param() param) {
    //     return { user: {}, param }
    // }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        await this.exists(id);
        return this.userService.show(id);
    }

    // @Put(':id')
    // async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param() param) {
    //     return {
    //         method: 'put',
    //         name, email, password,
    //         param
    //     }
    // }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        await this.exists(id);
        return this.userService.update(id, data);
    }

    // @Patch(':id')
    // async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param() param) {
    //     return {
    //         method: 'patch',
    //         name, email, password,
    //         param
    //     }
    // }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        await this.exists(id);
        return this.userService.updatePartial(id, data);
    }

    // @Delete(':id')
    // async delete(@Param('id') id) {
    //     return { id }
    // }

    // No caso do Id ser número, esta alteraçõ deve ser feita em toda a api
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.exists(id);
        return this.userService.delete(id);
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id,
            }
        }))) {
            throw new NotFoundException('O Usuário não existe.')
        }
    }
}
