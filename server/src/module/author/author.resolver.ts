import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorRequest } from 'src/dtos/author';
import { AuthorService } from './author.service';
import { AuthorGraphQLModel } from 'src/model/graphql/author';

@Resolver(() => AuthorGraphQLModel)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Mutation(() => AuthorGraphQLModel)
  async newAuthor(@Args('authorRequest') authorRequest: AuthorRequest) {
    return this.authorService.newAuthor(authorRequest);
  }
}
