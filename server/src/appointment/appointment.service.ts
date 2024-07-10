import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
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

    const userFilter = user.role !== 'Admin' && { user: user.id };

    const events = await this.eventModel
      .find({ ...keyword, ...userFilter })
      .limit(resPerPage)
      .skip(skip);

    const count = await this.eventModel.countDocuments({
      ...keyword,
      ...userFilter,
    });

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

  async findById(id: string): Promise<Event> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    return event;
  }

  async updateById(id: string, event: Event, user: User): Promise<Event> {
    if (user.role !== 'Admin') {
      throw new ForbiddenException('Forbidden request this action');
    }

    return await this.eventModel.findByIdAndUpdate(id, event, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string, user: User): Promise<Event> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    // Ensure event.user is treated as a Mongoose ObjectId
    const eventUserId = event.user as unknown as mongoose.Types.ObjectId;

    // Ensure user._id is treated as a Mongoose ObjectId
    const userId = user._id as unknown as mongoose.Types.ObjectId;

    if (!eventUserId.equals(userId)) {
      throw new ForbiddenException('Forbidden request for this action');
    }

    await this.eventModel.findByIdAndDelete(id);

    return event;
  }
}
