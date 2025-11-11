import { Controller, Get, Param, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SupplementResponse } from './dto/supplement-response';
import { SupplementService } from './supplement.service';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';
import { OptionalAuthRequest } from '../auth/interfaces/authenticated-request.interface';

@ApiTags('Supplement')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
@UseGuards(OptionalAuthGuard)
@Controller('supplements')
export class SupplementController {
  constructor(private readonly supplementService: SupplementService) {}

  @ApiOperation({ summary: 'Get all supplements' })
  @ApiOkResponse({
    type: SupplementResponse,
    isArray: true,
    description: 'Successfully retrieved all supplements',
  })
  @ApiNotFoundResponse({ description: 'No supplements found in the database' })
  @Get()
  async findAll(@Req() req: OptionalAuthRequest): Promise<SupplementResponse[]> {
    const userId = req.user?.sub;

    return await this.supplementService.findAll(userId);
  }

  @ApiOperation({ summary: 'Get supplement details' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the supplement',
    example: '1e004131-75f7-4bd2-804a-6edf95b866c19',
  })
  @ApiOkResponse({
    type: SupplementResponse,
    description: 'Supplement details successfully retrieved ',
  })
  @ApiBadRequestResponse({ description: 'Invalid supplement ID' })
  @ApiNotFoundResponse({ description: 'Supplement not found' })
  @Get(':id')
  async findOne(
    @Req() req: OptionalAuthRequest,
    @Param('id', ParseUUIDPipe) supplementId: string,
  ): Promise<SupplementResponse> {
    const userId = req.user?.sub;

    return await this.supplementService.findOne(supplementId, userId);
  }
}
