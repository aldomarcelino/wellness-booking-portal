import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './appointment.service';
import { CreateEventDto } from './dto/create-appointment.dto';
import { UpdateEventDto } from './dto/update-appointment.dto';
import { Event } from './schemas/appointment.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllEvents(
    @Query() query: ExpressQuery,
    @Req() req,
  ): Promise<{ events: Event[]; count: number }> {
    return this.eventService.findAll(query, req.user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createEvent(
    @Body()
    event: CreateEventDto,
    @Req() req,
  ): Promise<Event> {
    return this.eventService.create(event, req.user);
  }

  // @Get(':id')
  // async getBook(
  //   @Param('id')
  //   id: string,
  // ): Promise<Event> {
  //   return this.eventService.findById(id);
  // }

  // @Put(':id')
  // async updateBook(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   event: UpdateEventDto,
  // ): Promise<Event> {
  //   return this.eventService.updateById(id, event);
  // }

  // @Delete(':id')
  // async deleteBook(
  //   @Param('id')
  //   id: string,
  // ): Promise<Event> {
  //   return this.eventService.deleteById(id);
  // }
}
