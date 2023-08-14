import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
// const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        // Create an http link:
        const http = httpLink.create({
          uri: environment.API_GRAPHQL_URL,
        });
        const ws = new WebSocketLink({
          uri: environment.WEB_SOCKET_GRAPHQL_URL,
        });
        const link = split(
          () => {
            return true;
          },
          ws,
          http
        );
        return {
          link: link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
