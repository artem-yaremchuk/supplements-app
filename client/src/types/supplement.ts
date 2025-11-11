export type EvidenceLevel = 'HIGH' | 'MODERATE' | 'LOW' | 'INSUFFICIENT';

export interface Supplement {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  mechanisms: string[];
  evidence: EvidenceLevel;
  isFavorite: boolean;
}
