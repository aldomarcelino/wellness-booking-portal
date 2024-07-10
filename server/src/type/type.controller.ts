import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from './schemas/type.schema';
import { EventTypeDto } from './dto/type.dto';

@Controller('types')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  async getAllType(): Promise<{ types: Type[] }> {
    return this.typeService.findAll();
  }

  @Post()
  async createType(
    @Body()
    type: EventTypeDto,
  ): Promise<Type> {
    return this.typeService.create(type);
  }
}
