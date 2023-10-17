export interface Scarab {
  id: number,
  name: string,
  icon: string,
  chaosValue: number,
  upgradeEfficiency: UpgradePriceEfficiency,
}
export type UpgradePriceEfficiency = 'Worth Upgrading' | 'Not Worth Upgrading' | 'Equivalent';

export type ScarabRank = 'Rusted' | 'Polished' | 'Gilded' | 'Winged';

export type ScarabType = 'Abyss' | 'Ambush' | 'Bestiary' | 'Blight' | 
  'Breach' | 'Cartography' | 'Divination' | 'Elder' | 
  'Expedition' | 'Harbinger' | 'Legion' | 'Metamorph' | 
  'Reliquary' | 'Shaper' | 'Sulphite' | 'Torment';

export interface ScarabHierarchy {
  type: ScarabType,
  ranks: Record<ScarabRank, Scarab>,
}
