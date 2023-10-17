export interface Essence {
  id: number,
  name: string,
  icon: string,
  chaosValue: number,
  upgradeEfficiency: UpgradePriceEfficiency,
}

export type UpgradePriceEfficiency = 'Worth Upgrading' | 'Not Worth Upgrading' | 'Equivalent';

export type EssenceRank = 'Whispering' | 'Muttering' | 'Weeping' | 'Wailing' | 'Screaming' | 'Shrieking' | 'Deafening';
export const EssenceRanks: EssenceRank[] = ['Whispering', 'Muttering', 'Weeping', 'Wailing', 'Screaming', 'Shrieking', 'Deafening'];
  
export type EssenceType = 
'Greed' | 
'Contempt' | 
'Hatred' |
'Woe' |
'Fear' |
'Anger' |
'Torment' |
'Sorrow' |
'Rage' |
'Suffering' |
'Wrath' |
'Doubt' |
'Loathing' |
'Zeal' |
'Anguish' |
'Spite' |
'Scorn' |
'Envy' |
'Misery' |
'Dread';

export const EssenceTypes: EssenceType[] = ['Greed','Contempt','Hatred','Woe','Fear','Anger','Torment','Sorrow','Rage','Suffering','Wrath','Doubt','Loathing','Zeal','Anguish','Spite','Scorn','Envy','Misery','Dread'];

export interface EssenceHierarchy {
  type: EssenceType,
  ranks: Record<EssenceRank, Essence>,
}
