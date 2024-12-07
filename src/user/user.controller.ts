// import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/dto/update-put-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userServices: UserService) { }

    @Post()
    async create(@Body() { name, email, password }: CreateUserDTO) {
        return this.userServices.create({ name, email, password });
    }

    @Get()
    async list() {
        return { users: [] }
    }

    // @Get(':id')
    // async show(@Param() param) {
    //     return { user: {}, param }
    // }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return { user: {}, id }
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
    async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'put',
            name, email, password,
            id
        }
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
    async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'patch',
            name, email, password,
            id
        }
    }

    // @Delete(':id')
    // async delete(@Param('id') id) {
    //     return { id }
    // }

    // No caso do Id ser número, esta alteraçõ deve ser feita em toda a api
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return { id }
    }
}
