import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Event } from './schemas/appointment.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: mongoose.Model<Event>,
  ) {}

  async findAll(
    query: Query,
    user: User,
  ): Promise<{ events: Event[]; count: number }> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const userFilter = { user: user.id };

    const events = await this.eventModel
      .find({ ...keyword, ...userFilter })
      .limit(resPerPage)
      .skip(skip);

    const count = await this.eventModel.countDocuments({ ...keyword });

    return {
      events,
      count,
    };
  }

  async create(event: Event, user: User): Promise<Event> {
    const data = Object.assign(event, { user: user._id });

    const res = await this.eventModel.create(data);
    return res;
  }

  // async findById(id: string): Promise<Book> {
  //   const isValidId = mongoose.isValidObjectId(id);

  //   if (!isValidId) {
  //     throw new BadRequestException('Please enter correct id.');
  //   }

  //   const book = await this.eventModel.findById(id);

  //   if (!book) {
  //     throw new NotFoundException('Book not found.');
  //   }

  //   return book;
  // }

  // async updateById(id: string, book: Book): Promise<Book> {
  //   return await this.eventModel.findByIdAndUpdate(id, book, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }

  // async deleteById(id: string): Promise<Book> {
  //   const book = await this.eventModel.findByIdAndDelete(id);

  //   if (!book) {
  //     throw new NotFoundException('Book not found.');
  //   }

  //   return book;
  // }
}
