import { NotificationModule } from './module/notification/notification.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FolderModule } from './module/folder/folder.module';
import { NoteModule } from './module/note/note.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorModule } from './module/author/author.module';
import { DateScalar } from './model/graphql/scalar/date';

@Module({
  imports: [
    NotificationModule,
    FolderModule,
    NoteModule,
    AuthorModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '/tmp/schema.gql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
        'graphql-ws': {
          path: '/graphql',
        },
      },
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req }) => {
        return { token: req.headers.authorization, user: req.headers.user };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
