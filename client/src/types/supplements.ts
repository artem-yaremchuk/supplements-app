export type EvidenceLevel = 'High' | 'Moderate' | 'Low' | 'Insufficient';

export interface Supplement {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  mechanisms: string[];
  evidence: EvidenceLevel;
}
