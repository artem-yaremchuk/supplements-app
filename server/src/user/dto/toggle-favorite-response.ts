import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ToggleFavoriteResponse {
  @Field()
  message: string;
}
