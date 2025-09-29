import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SupplementResponseDto } from './dto/supplement-response.dto';
import { SupplementService } from './supplement.service';

@ApiTags('Supplement')
@Controller('supplements')
export class SupplementController {
  constructor(private readonly supplementService: SupplementService) {}

  @ApiOperation({ summary: 'Get all supplements' })
  @ApiOkResponse({
    type: SupplementResponseDto,
    isArray: true,
    description: 'Successfully retrieved all supplements',
  })
  @ApiNotFoundResponse({ description: 'No supplements found in the database' })
  @Get()
  async findAll(): Promise<SupplementResponseDto[]> {
    return await this.supplementService.findAll();
  }

  @ApiOperation({ summary: 'Get supplement details' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the supplement',
    example: '1e004131-75f7-4bd2-804a-6edf95b866c19',
  })
  @ApiOkResponse({
    type: SupplementResponseDto,
    description: 'Successfully retrieved supplement details',
  })
  @ApiNotFoundResponse({ description: 'Supplement not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) supplementId: string): Promise<SupplementResponseDto> {
    return await this.supplementService.findOne(supplementId);
  }
}
