import { Injectable } from '@angular/core';
import { GraphqlService } from '../graphql/graphql.service';
import { FolderTypeDefs } from './folder.typedefs';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private graphqlService: GraphqlService) {}

  getFolders() {
    const query = FolderTypeDefs.getFolders;
    return this.graphqlService.request(query);
  }

  createFolder(name: string) {
    const query = FolderTypeDefs.newFolder;
    return this.graphqlService.request(query, { name });
  }
}
