export const FolderTypeDefs = {
  getFolders: `query Folder{
        folders {
          _id
          name
          createdAt
          author {
            name
          }
        }
      }`,
  newFolder: `mutation Folder( $name: String!){
          createFolder(folderRequest: { name:$name}) {
          _id
          name
          createdAt
        }
      }`,
};
