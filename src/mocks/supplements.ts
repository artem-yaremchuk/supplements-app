import type { Supplement } from '../types/supplements';

export const supplements: Supplement[] = [
  {
    id: '1',
    name: 'Creatine Monohydrate',
    shortDesc: 'Improves strength & power. Cognitive benefits.',
    mechanisms: ['ATP resynthesis', 'Cell hydration'],
    evidence: 'High',
  },
  {
    id: '2',
    name: 'Vitamin D3',
    shortDesc: 'Bone health, immune modulation. Deficiency common.',
    mechanisms: ['Calcium homeostasis', 'Immune regulation'],
    evidence: 'High',
  },
  {
    id: '3',
    name: 'Ashwagandha',
    shortDesc: 'Stress management. Ergogenic effects on physical performance.',
    mechanisms: ['Cortisol/testosterone modulation', 'Antioxidant activity'],
    evidence: 'Moderate',
  },
];
