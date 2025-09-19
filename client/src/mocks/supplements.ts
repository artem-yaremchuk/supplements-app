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
  {
    id: '4',
    name: 'Magnesium',
    shortDesc: 'Supports muscle & nerve function. Aids sleep.',
    fullDesc:
      'Magnesium is an essential mineral involved in over 300 enzymatic reactions. It helps regulate muscle and nerve function, blood sugar levels, and sleep. Deficiency is common, especially in people with stress or poor diet.',
    mechanisms: ['NMDA receptor regulation', 'Enzymatic cofactor'],
    evidence: 'High',
  },
  {
    id: '5',
    name: 'Omega-3 (Fish Oil)',
    shortDesc: 'Supports heart & brain health. Anti-inflammatory.',
    fullDesc:
      'Fish oil is rich in omega-3 fatty acids EPA and DHA. These compounds have anti-inflammatory effects and support cardiovascular, cognitive, and joint health. Omega-3s are particularly beneficial when dietary intake is low.',
    mechanisms: ['Eicosanoid modulation', 'Neuroprotection'],
    evidence: 'High',
  },
  {
    id: '6',
    name: 'Collagen',
    shortDesc: 'Supports skin, joint, and bone health.',
    fullDesc:
      'Collagen is the most abundant protein in the human body, forming the structural framework of skin, joints, and connective tissues. Supplementing with hydrolyzed collagen may improve skin elasticity, reduce wrinkles, and support joint and bone health, especially in aging populations.',
    mechanisms: ['Collagen synthesis', 'Connective tissue remodeling'],
    evidence: 'Moderate',
  },
  {
    id: '7',
    name: 'Zinc',
    shortDesc: 'Supports immunity and hormone function.',
    fullDesc:
      'Zinc is an essential mineral that is critical for the function of hundreds of enzymes. Consequently, it plays many roles, including in antioxidant enzymes, brain function, and the immune system. Zinc is most commonly taken to reduce the duration of respiratory infections and the common cold.',
    mechanisms: ['Enzymatic cofactor', 'Immune modulation'],
    evidence: 'Moderate',
  },
  {
    id: '8',
    name: 'Melatonin',
    shortDesc: 'Regulates sleep-wake cycle. Helpful for jet lag & insomnia.',
    fullDesc:
      'Melatonin is a hormone that helps regulate circadian rhythms. Supplementation is effective for improving sleep onset, especially in people with disrupted sleep schedules or jet lag.',
    mechanisms: ['Circadian rhythm regulation', 'Sleep signaling receptors'],
    evidence: 'High',
  },
  {
    id: '9',
    name: 'Probiotics',
    shortDesc: 'Supports gut health and digestion.',
    fullDesc:
      'Probiotics are live microorganisms that support gut microbiota. They may improve digestive health, reduce symptoms of IBS, and support immune function. Effects depend on the strain and dose used.',
    mechanisms: ['Microbiome modulation', 'Gut barrier integrity'],
    evidence: 'Moderate',
  },
  {
    id: '10',
    name: 'Curcumin',
    shortDesc: 'Anti-inflammatory. May relieve joint pain.',
    fullDesc:
      'Curcumin is the active compound in turmeric, known for its anti-inflammatory and antioxidant properties. It’s commonly used for joint pain, arthritis, and general inflammation. Bioavailability is low unless combined with piperine.',
    mechanisms: ['NF-κB inhibition', 'Antioxidant activity'],
    evidence: 'Moderate',
  },
  {
    id: '11',
    name: 'Glucosamine',
    shortDesc: 'Joint support. May reduce osteoarthritis symptoms.',
    fullDesc:
      'Glucosamine is a natural compound found in cartilage. Supplementation is popular for managing joint pain and improving mobility, especially in osteoarthritis. Often combined with chondroitin and MSM.',
    mechanisms: ['Cartilage regeneration', 'Inflammation reduction'],
    evidence: 'Moderate',
  },
  {
    id: '12',
    name: 'Beta-Alanine',
    shortDesc: 'Delays muscle fatigue. Boosts performance in short bursts.',
    fullDesc:
      'Beta-alanine is a non-essential amino acid that increases muscle carnosine levels. Elevated carnosine helps buffer acid in muscles, which may delay fatigue during high-intensity efforts like sprints or heavy lifts. It’s especially useful for activities lasting 1–4 minutes.',
    mechanisms: ['Carnosine synthesis', 'pH buffering in muscle tissue'],
    evidence: 'High',
  },
];
