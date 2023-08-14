export const AuthTypeDefs = {
  newAuthor: `mutation Author($uid: String!, $name: String!){
    newAuthor(authorRequest: {uid: $uid, name:$name}) {
      uid
      name
    }
  }`,
};
