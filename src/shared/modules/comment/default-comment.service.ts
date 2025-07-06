import {
  inject,
  injectable,
} from 'inversify';
import { Types } from 'mongoose';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/index.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.constant.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(userId: string, offerId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create({
      ...dto,
      userId,
      offerId,
    });

    await this.commentModel
      .aggregate([
        { $match: { offerId: new Types.ObjectId(offerId) } },
        { $group: { _id: '$offerId', averageRating: { $avg: '$rating' }, commentCount: { $sum: 1 } } },
        { $merge: { into: 'offers', on: '_id', whenMatched: [{ $set: { rating: '$$new.averageRating', commentCount: '$$new.commentCount' } } ] } },
      ])
      .exec();

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count: number = DEFAULT_COMMENTS_COUNT): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .limit(count)
      .sort({ createdAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
