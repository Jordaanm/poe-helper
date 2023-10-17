import { useQuery } from "react-query";
import { Essence, EssenceHierarchy, EssenceRank, EssenceRanks, EssenceTypes, UpgradePriceEfficiency } from "../types/essences";
import { useEffect, useState } from "react";
import { EssenceGrid } from "../components/EssenceGrid";

interface PoeNinjaOverviewLine {
  id: number,
  name: string,
  icon: string, 
  chaosValue: number,
}

const calcEfficiency = (scarab: PoeNinjaOverviewLine, nextRankedScarab: PoeNinjaOverviewLine | null): UpgradePriceEfficiency => {
  if(!nextRankedScarab) { return 'Not Worth Upgrading'; }
  const ratio = nextRankedScarab.chaosValue / scarab.chaosValue;
  if(ratio > 3) { return 'Worth Upgrading'; }
  return ratio === 3 ? 'Equivalent' : 'Not Worth Upgrading';
}

const getUpgradeRank = (rank: EssenceRank): EssenceRank | null => {
  switch(rank) {
    case 'Whispering': return 'Muttering';
    case 'Muttering': return 'Weeping';
    case 'Weeping': return 'Wailing';
    case 'Wailing': return 'Screaming';
    case 'Screaming': return 'Shrieking';
    case 'Shrieking': return 'Deafening';
    case 'Deafening': return null;
  }
};

const buildEssenceHierarchies = (essenceData?: PoeNinjaOverviewLine[]): EssenceHierarchy[] => {
  if(!essenceData) { return []; }

  const essenceHierarchies: EssenceHierarchy[] = [];

  const essenceRanks = EssenceRanks;
  const essenceTypes = EssenceTypes;

  essenceTypes.forEach(essenceType => {
    const scarabHierarchy: EssenceHierarchy = {
      type: essenceType,
      ranks: {} as Record<EssenceRank, Essence>,
    };

    essenceRanks.forEach(essenceRank => {
      const essence = essenceData.find(ess => ess.name.includes(essenceType) && ess.name.includes(essenceRank));
      const nextRank = getUpgradeRank(essenceRank);
      const nextRankedScarab = essenceRank === 'Deafening' ? null : 
        essenceData.find(ess => ess.name.includes(essenceType) && ess.name.includes(nextRank!)) || null;

      if (essence) {
        const efficiency = calcEfficiency(essence, nextRankedScarab);
        scarabHierarchy.ranks[essenceRank] = {
          id: essence.id,
          name: essence.name,
          icon: essence.icon,
          chaosValue: essence.chaosValue,
          upgradeEfficiency: efficiency,
        } as Essence;
      }
    });

    essenceHierarchies.push(scarabHierarchy);
  });

  return essenceHierarchies;
}

const parseSpecialEssences = (essenceData?: PoeNinjaOverviewLine[]): Essence[] => {
  if(!essenceData) { return []; }
  console.log("ED", essenceData);

  const mapToEssence = (essenceDatum: PoeNinjaOverviewLine): Essence | null => {
    if(!essenceDatum) { return null }
    return {
      id: essenceDatum.id,
      name: essenceDatum.name,
      icon: essenceDatum.icon,
      chaosValue: essenceDatum.chaosValue,
      upgradeEfficiency: 'Not Worth Upgrading',
    } as Essence;
  }

  return [
    mapToEssence(essenceData.find(ess => ess.name.includes('Remnant of Corruption'))!),
    mapToEssence(essenceData.find(ess => ess.name.includes('Essence of Insanity'))!),
    mapToEssence(essenceData.find(ess => ess.name.includes('Essence of Horror'))!),
    mapToEssence(essenceData.find(ess => ess.name.includes('Essence of Delirium'))!),
    mapToEssence(essenceData.find(ess => ess.name.includes('Essence of Hysteria'))!),    
  ].filter(ess => ess !== null) as Essence[];
}

const FetchEssencePrices = async(): Promise<PoeNinjaOverviewLine[]> => {
  const response = await fetch('https://poe.ninja/api/data/itemoverview?league=Ancestor&type=Essence');
  const json = await response.json();
  return json?.lines || [] as PoeNinjaOverviewLine[];
};

export const EssencesPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: FetchEssencePrices,
    queryKey: ['poe-ninja-essences']
  });

  const [essences, setEssences] = useState<EssenceHierarchy[]>([]);
  const [specialEssences, setSpecialEssences] = useState<Essence[]>([]);

  useEffect(() => {
    const essenceHierarchies = buildEssenceHierarchies(data);
    const specialEssences = parseSpecialEssences(data);
    setEssences(essenceHierarchies);
    setSpecialEssences(specialEssences);
  }, [data]);

  return (
    <div className="page-content essences-page">
      <h1>Essences</h1>
      {isLoading && 'Loading...'}
      <div className="essence-grid-wrapper">
        <EssenceGrid essences={essences} specialEssences={specialEssences} />
      </div>
    </div>
  );
}