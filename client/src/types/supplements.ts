export type EvidenceLevel = 'High' | 'Moderate' | 'Low' | 'Insuffiecient';

export interface Supplement {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  mechanisms: string[];
  evidence: EvidenceLevel;
}
