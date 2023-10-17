import { Scarab, ScarabHierarchy, ScarabRank, UpgradePriceEfficiency } from "../types/scarabs";
import { ChaosOrbPrice } from "./ChaosOrbPrice";

import './Scarab.scss';

interface ScarabHierarchyProps {
  scarabHierarchy: ScarabHierarchy;
}

export const ScarabHierarchyRow = (props: ScarabHierarchyProps) => {
  const { scarabHierarchy } = props;
  return (
    <div key={scarabHierarchy.type} className="scarab-hierarchy row">
      <div className="type">{scarabHierarchy.type}</div>
      <ScarabDisplay scarab={scarabHierarchy.ranks.Rusted} rank="Rusted" />
      <ScarabDisplay scarab={scarabHierarchy.ranks.Polished} rank="Polished" />
      <ScarabDisplay scarab={scarabHierarchy.ranks.Gilded} rank="Gilded" />
      <ScarabDisplay scarab={scarabHierarchy.ranks.Winged} rank="Winged" />      
    </div>
  );
};

interface ScarabDisplayProps {
  scarab: Scarab;
  rank: ScarabRank;
}

const EfficiencyClassMap: Record<UpgradePriceEfficiency, string> = {
  'Equivalent': 'upgrade--equiv',
  'Worth Upgrading': 'upgrade--worth',
  'Not Worth Upgrading': 'upgrade--not-worth',
};

export const ScarabDisplay = (props: ScarabDisplayProps) => {
  const { scarab, rank } = props;
  const upgradeClass = EfficiencyClassMap[scarab.upgradeEfficiency];
  return (
    <div className={`scarab ${rank.toLowerCase()} ${upgradeClass}`}>
    <img
      src={scarab.icon}
      alt={scarab.name}
    />
    <div className="price">
      <ChaosOrbPrice price={scarab.chaosValue} />
    </div>
  </div>
  )
}

export const ScarabHierarchyHeader = () => {
  return (
    <div className="scarab-hierarchy row header">
      <div className="type">Type</div>
      <div className="scarab rusted">Rusted</div>
      <div className="scarab polished">Polished</div>
      <div className="scarab gilded">Gilded</div>
      <div className="scarab winged">Winged</div>
    </div>
  );
}
