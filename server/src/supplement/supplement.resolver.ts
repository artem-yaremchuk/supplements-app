import { Resolver, Query, Args } from '@nestjs/graphql';
import { SupplementGraph } from './models/supplement.model';
import { SupplementService } from './supplement.service';
import { GqlOptionalAuthGuard, GqlUser } from '../auth/gql-optional-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../auth/interfaces/authenticated-request.interface';

@Resolver(() => SupplementGraph)
@UseGuards(GqlOptionalAuthGuard)
export class SupplementResolver {
  constructor(private readonly supplementService: SupplementService) {}

  @Query(() => [SupplementGraph])
  async supplements(@GqlUser() user: JwtPayload | null) {
    const userId = user?.sub;
    return this.supplementService.findAll(userId);
  }

  @Query(() => SupplementGraph)
  async supplement(
    @Args('id', ParseUUIDPipe) supplementId: string,
    @GqlUser() user: JwtPayload | null,
  ) {
    const userId = user?.sub;
    return this.supplementService.findOne(supplementId, userId);
  }
}
