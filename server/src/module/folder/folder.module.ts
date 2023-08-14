import { Module } from '@nestjs/common';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema, FolderSchema } from 'src/model/mongo';
import { Folder } from 'src/model/mongo/folder';
import { AuthorService } from '../author/author.service';
import { Author } from 'src/model/mongo/author';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],

  providers: [FolderResolver, FolderService, AuthorService],
})
export class FolderModule {}
