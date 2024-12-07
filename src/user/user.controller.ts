import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/dto/update-put-user.dto';

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() { name, email, password }: CreateUserDTO) {
        return { name, email, password }
    }

    @Get()
    async list() {
        return { users: [] }
    }

    @Get(':id')
    async show(@Param() param) {
        return { user: {}, param }
    }

    @Put(':id')
    async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param() param) {
        return {
            method: 'put',
            name, email, password,
            param
        }
    }

    @Patch(':id')
    async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param() param) {
        return {
            method: 'patch',
            name, email, password,
            param
        }
    }

    @Delete(':id')
    async delete(@Param() param) {
        return { param }
    }
}
