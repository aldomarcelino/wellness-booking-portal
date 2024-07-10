import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from './schemas/type.schema';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name)
    private typeModel: mongoose.Model<Type>,
  ) {}

  async findAll(): Promise<{ types: Type[] }> {
    const types: Type[] = await this.typeModel.find({}).exec();

    return { types };
  }
  async create(type: Type): Promise<Type> {
    const data = Object.assign(type);

    const res = await this.typeModel.create(data);
    return res;
  }
}
