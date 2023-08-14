import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { MessageGraphQLModel } from 'src/model/graphql/message';
import { PubSub } from 'graphql-subscriptions';
import { MessageRequest } from 'src/dtos/message';

const pubSub = new PubSub();

@Resolver(() => MessageGraphQLModel)
export class NotificationResolver {
  @Mutation(() => MessageGraphQLModel)
  pushNotification(@Args('messageRequest') messageRequest: MessageRequest) {
    pubSub.publish('PUSH_NOTIFICATION', {
      notification: {
        content: messageRequest.content,
      },
    });
    return pubSub.asyncIterator(['PUSH_NOTIFICATION']);
  }

  @Subscription(() => MessageGraphQLModel)
  notification() {
    return pubSub.asyncIterator(['PUSH_NOTIFICATION']);
  }
}
