import { ApiProperty } from '@nestjs/swagger';
import type { Evidence } from '../../generated/prisma/enums';

export class SupplementResponse {
  @ApiProperty({ example: '1e004131-75f7-4bd2-804a-6edf95b866c1' })
  id: string;

  @ApiProperty({ example: 'Beta-Alanine' })
  name: string;

  @ApiProperty({ example: 'Delays muscle fatigue. Boosts performance in short bursts.' })
  shortDesc: string;

  @ApiProperty({
    example:
      'Beta-alanine is a non-essential amino acid that increases muscle carnosine levels. Elevated carnosine helps buffer acid in muscles, which may delay fatigue during high-intensity efforts like sprints or heavy lifts. It’s especially useful for activities lasting 1–4 minutes.',
  })
  fullDesc: string;

  @ApiProperty({ example: ['Carnosine synthesis', 'pH buffering in muscle tissue'] })
  mechanisms: string[];

  @ApiProperty({ example: 'HIGH' })
  evidence: Evidence;

  @ApiProperty({ example: false })
  isFavorite: boolean;
}
