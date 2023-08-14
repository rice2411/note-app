import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { FolderService } from './folder.service';
import { FolderRequest, IFolderDTO } from 'src/dtos/foder';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { FolderGraphQLModel } from 'src/model/graphql/folder';
import { AuthorGraphQLModel } from 'src/model/graphql/author';
import { AuthorService } from '../author/author.service';

@Resolver(() => FolderGraphQLModel)
@UseGuards(AuthGuard)
export class FolderResolver {
  constructor(
    private readonly folderService: FolderService,
    private readonly authorService: AuthorService,
  ) {}

  // @Query((returns) => FolderGraphQLModel)
  // async folder(@Args('id', { type: () => String }) id: string) {
  //   return null;
  // }

  // @ResolveField()
  // async notes(@Parent() folder: IFolderDTO): Promise<NoteGraphQLModel[]> {
  //   return null;
  // }
  @Query(() => [FolderGraphQLModel])
  async folders(@User() user) {
    return this.folderService.findAll(user.uid);
  }
  @ResolveField()
  async author(@Parent() folder: IFolderDTO) {
    const author = await this.authorService.getAuthorByUId(folder.authorId);
    return author[0];
  }

  @Mutation(() => FolderGraphQLModel)
  async createFolder(
    @User() user,
    @Args('folderRequest') folderRequest: FolderRequest,
  ) {
    return this.folderService.createFolder({
      ...folderRequest,
      authorId: user.uid,
    });
  }
}
