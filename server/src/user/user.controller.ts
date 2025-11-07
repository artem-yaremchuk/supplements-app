import { Controller, UseGuards, Patch, Get, Param, Req, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { SupplementResponse } from '../supplement/dto/supplement-response';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Toggle supplement in user favorites' })
  @ApiParam({
    name: 'supplementId',
    description: 'UUID of the supplement',
    example: '1e004131-75f7-4bd2-804a-6edf95b866c19',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Supplement successfully added to favorites',
        },
      },
      required: ['message'],
    },
    description: 'Supplement successfully added or removed from favorites',
  })
  @ApiBadRequestResponse({ description: 'Invalid supplement ID' })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiNotFoundResponse({ description: 'Supplement not found' })
  @Patch('favorites/:supplementId')
  async toogleFavorite(
    @Req() req: AuthenticatedRequest,
    @Param('supplementId', ParseUUIDPipe) supplementId: string,
  ): Promise<{ message: string }> {
    const userId = req.user.sub;

    return await this.userService.toogleFavorite(userId, supplementId);
  }

  @ApiOperation({ summary: 'Get all favorite supplements for the current user' })
  @ApiOkResponse({
    type: SupplementResponse,
    isArray: true,
    description: 'Favorite supplements successfully retrieved',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiNotFoundResponse({ description: 'Favorite supplements not found' })
  @Get('favorites')
  async getFavorites(@Req() req: AuthenticatedRequest): Promise<SupplementResponse[]> {
    const userId = req.user.sub;

    return await this.userService.getFavorites(userId);
  }
}
