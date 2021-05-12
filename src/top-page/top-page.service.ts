import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { subDays } from 'date-fns';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async get(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async getByAlias(alias: string) {
    return this.topPageModel.findById({ alias }).exec();
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async update(id: string | Types.ObjectId, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findForHhUpdate(date: Date) {
    return this.topPageModel
      .find({
        firstCategory: 0,
        $or: [
          { 'hh.updatedAt': { $lt: subDays(date, 1) } },
          { 'hh.updatedAt': { $exists: false } },
        ],
      })
      .exec();
  }

  async find(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate()
      .match({ firstCategory })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { _id: '$_id', alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findAll() {
    return this.topPageModel.find({}).exec();
  }

  async findByText(text: string) {
    return this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }
}
