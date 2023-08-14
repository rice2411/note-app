import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorRequest, IAuthorRequestDTO } from 'src/dtos/author';
import { Author } from 'src/model/mongo/author';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<Author>,
  ) {}
  async getAuthorByUId(authorId: string) {
    return this.authorModel.find({ uid: authorId });
  }
  async newAuthor(authorRequest: AuthorRequest) {
    const foundUser = await this.authorModel.findOne({
      uid: authorRequest.uid,
    });
    if (!foundUser) {
      const newUser = new this.authorModel(authorRequest);
      await newUser.save();
      return newUser;
    }
    return foundUser;
  }
}
