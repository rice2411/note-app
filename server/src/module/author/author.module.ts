import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author, AuthorSchema } from 'src/model/mongo/author';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorService, AuthorResolver],
})
export class AuthorModule {}
