import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ScarabHierarchyHeader, ScarabHierarchyRow } from "../components/ScarabHierarchy";
import { Scarab, ScarabHierarchy, ScarabRank, ScarabType, UpgradePriceEfficiency } from "../types/scarabs";

interface PoeNinjaOverviewLine {
  id: number,
  name: string,
  icon: string, 
  chaosValue: number,
}

const calcEfficiency = (scarab: PoeNinjaOverviewLine, nextRankedScarab: PoeNinjaOverviewLine | null): UpgradePriceEfficiency => {
  if(!nextRankedScarab) { return 'Not Worth Upgrading'; }
  const ratio = nextRankedScarab.chaosValue / scarab.chaosValue;
  console.log('calcEfficiency', scarab.name, nextRankedScarab.name, ratio);
  if(ratio > 3) { return 'Worth Upgrading'; }
  return ratio === 3 ? 'Equivalent' : 'Not Worth Upgrading';
}

const getUpgradeRank = (rank: ScarabRank): ScarabRank | null => {
  switch(rank) {
    case 'Rusted':
      return 'Polished';
    case 'Polished':
      return 'Gilded';
    case 'Gilded':
      return null;
    case 'Winged':
      return null;
  }
};

const buildScarabHierarchies = (scarabs?: PoeNinjaOverviewLine[]): ScarabHierarchy[] => {
  if(!scarabs) { return []; }

  const scarabHierarchies: ScarabHierarchy[] = [];

  const scarabRanks = [...new Set(scarabs.map(scarab => scarab.name.split(' ')[0]))] as ScarabRank[];
  const scarabTypes = [...new Set(scarabs.map(scarab => scarab.name.split(' ')[1]))] as ScarabType[];

  scarabTypes.forEach(scarabType => {
    const scarabHierarchy: ScarabHierarchy = {
      type: scarabType,
      ranks: {} as Record<ScarabRank, Scarab>,
    };

    scarabRanks.forEach(scarabRank => {
      const scarab = scarabs.find(scarab => scarab.name.includes(scarabType) && scarab.name.includes(scarabRank));
      const nextRank = getUpgradeRank(scarabRank);
      const nextRankedScarab = scarabRank === 'Winged' ? null : 
        scarabs.find(scarab => scarab.name.includes(scarabType) && scarab.name.includes(nextRank!)) || null;

      if (scarab) {
        const efficiency = calcEfficiency(scarab, nextRankedScarab);
        scarabHierarchy.ranks[scarabRank] = {
          id: scarab.id,
          name: scarab.name,
          icon: scarab.icon,
          chaosValue: scarab.chaosValue,
          upgradeEfficiency: efficiency,
        } as Scarab;
      }
    });

    scarabHierarchies.push(scarabHierarchy);
  });

  return scarabHierarchies;
}

const FetchScarabPrices = async(): Promise<PoeNinjaOverviewLine[]> => {
  const response = await fetch('https://poe.ninja/api/data/itemoverview?league=Ancestor&type=Scarab');
  const json = await response.json();
  return json?.lines || [] as PoeNinjaOverviewLine[];
};

export const ScarabsPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: FetchScarabPrices,
    queryKey: ['poe-ninja-scarabs']
  });

  const [scarabs, setScarabs] = useState<ScarabHierarchy[]>([]);

  useEffect(() => {
    const scarabHierarchies = buildScarabHierarchies(data);
    setScarabs(scarabHierarchies);
  }, [data]);

  return (
    <>
      <h1>Scarabs</h1>
      {isLoading && 'Loading...'}
      <div className="scarab-grid">
        <ScarabHierarchyHeader />
        {scarabs.map(scarab => <ScarabHierarchyRow key={scarab.type} scarabHierarchy={scarab} />)}
      </div>
    </>
  );
}