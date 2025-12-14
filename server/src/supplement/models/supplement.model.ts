import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SupplementGraph {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  shortDesc: string;

  @Field()
  isFavorite: boolean;
}
