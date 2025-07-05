import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/index.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(userId: string, offerId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
