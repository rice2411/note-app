import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFolderRequestDTO } from 'src/dtos/foder';
import { Folder } from 'src/model/mongo/folder';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
  ) {}

  async findAll(userId: string): Promise<Folder[]> {
    return this.folderModel
      .find({ authorId: userId })
      .sort({ updatedAt: 'desc' })
      .exec();
  }
  async createFolder(request: IFolderRequestDTO) {
    const newFolder = new this.folderModel(request);
    newFolder.save();
    return newFolder;
  }
}
