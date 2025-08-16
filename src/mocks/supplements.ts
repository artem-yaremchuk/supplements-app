import type { Supplement } from '../types/supplements';

export const supplements: Supplement[] = [
  {
    id: '1',
    name: 'Creatine Monohydrate',
    shortDesc: 'Improves strength & power. Cognitive benefits.',
    fullDesc:
      'Creatine is among the most well-studied and effective supplements for improving exercise performance. It does this mainly by increasing energy availability during high-intensity activity. Creatine may also provide cognitive and mental health benefits in some contexts.',
    mechanisms: ['ATP resynthesis', 'Cell hydration'],
    evidence: 'High',
  },
  {
    id: '2',
    name: 'Vitamin D',
    shortDesc: 'Bone health, immune modulation. Deficiency common.',
    fullDesc:
      'Vitamin D is a fat-soluble vitamin that our skin synthesizes when exposed to the sun. It benefits us in many ways, from bone health to mood.',
    mechanisms: ['Calcium homeostasis', 'Immune regulation'],
    evidence: 'High',
  },
  {
    id: '3',
    name: 'Ashwagandha',
    shortDesc: 'Stress management. Ergogenic effects on physical performance.',
    fullDesc:
      'Ashwagandha has been called the king of Ayurvedic herbs. It is best known for reducing stress and anxiety. It may also modestly enhance various aspects of physical performance, increase testosterone levels, and improve reproductive health, but more research is needed to confirm these effects.',
    mechanisms: ['Cortisol/testosterone modulation', 'Antioxidant activity'],
    evidence: 'Moderate',
  },
];
