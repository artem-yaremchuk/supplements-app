import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { GqlUser } from '../auth/gql-optional-auth.guard';
import { JwtPayload } from '../auth/interfaces/authenticated-request.interface';
import { ToggleFavoriteResponse } from './dto/toggle-favorite-response';

@Resolver()
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => ToggleFavoriteResponse)
  async toogleFavorite(
    @Args('supplementId', ParseUUIDPipe) supplementId: string,
    @GqlUser() user: JwtPayload,
  ): Promise<ToggleFavoriteResponse> {
    const userId = user?.sub;
    return await this.userService.toogleFavorite(userId, supplementId);
  }
}
