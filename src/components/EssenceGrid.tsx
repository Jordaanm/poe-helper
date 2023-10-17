import { Essence, EssenceHierarchy, UpgradePriceEfficiency } from '../types/essences';
import { ChaosOrbPrice } from './ChaosOrbPrice';
import './EssenceGrid.scss';

interface EssenceGridProps {
  essences: EssenceHierarchy[];
  specialEssences: Essence[];
}

export const EssenceGrid = (props: EssenceGridProps) => {
  const { essences, specialEssences } = props;

  const essenceMap = essences.reduce((acc, essence) => {
    acc[essence.type] = essence;
    return acc;
  }, {} as Record<string, EssenceHierarchy>);

  const remnant = specialEssences.find(ess => ess.name === 'Remnant of Corruption')!;
  const insanity = specialEssences.find(ess => ess.name === 'Essence of Insanity')!;
  const horror = specialEssences.find(ess => ess.name === 'Essence of Horror')!;
  const delirium = specialEssences.find(ess => ess.name === 'Essence of Delirium')!;
  const hysteria = specialEssences.find(ess => ess.name === 'Essence of Hysteria')!;

  return (
    <div className="essence-grid">
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Greed']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Loathing']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Contempt']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Zeal']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Hatred']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Anguish']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Woe']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Spite']} inverse={true} />
      </div>
      
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Fear']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Scorn']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Anger']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Envy']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Torment']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Misery']} inverse={true} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Sorrow']} />
        <EssenceHierarchyDisplay hierarchy={essenceMap['Dread']} inverse={true} />
      </div>

      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Rage']} />
        <SpecialEssenceDisplay essences={[remnant, insanity]} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Suffering']} />
        <SpecialEssenceDisplay essences={[horror]} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Wrath']} />
        <SpecialEssenceDisplay essences={[delirium]} />
      </div>
      <div className="essence-grid__row">
        <EssenceHierarchyDisplay hierarchy={essenceMap['Doubt']} />
        <SpecialEssenceDisplay essences={[hysteria]} />
      </div>
    </div>
  );
}
interface EssenceHierarchyDisplayProps {
  hierarchy: EssenceHierarchy;
  inverse?: boolean;
}

export const EssenceHierarchyDisplay = (props: EssenceHierarchyDisplayProps) => {
  const {hierarchy, inverse} = props;
  if(!hierarchy) { return null; }
  const list = buildHierarchyList(hierarchy, inverse);

  return (
    <div className="essence-hierarchy">
      {list.map(ess => <EssenceCell essence={ess} key={ess.name} />)}
    </div>
  );
};

interface SpecialEssenceDisplayProps {
  essences: (Essence | undefined)[];
}

export const SpecialEssenceDisplay = (props: SpecialEssenceDisplayProps) => {
  const { essences } = props;
  return (
    <div className="essence-set">
      {essences.map(ess => {
        if(!ess) { return null; }
        return (<EssenceCell essence={ess} key={ess.name} />);
    })}
    </div>
  )
};

const EfficiencyClassMap: Record<UpgradePriceEfficiency, string> = {
  'Equivalent': 'upgrade--equiv',
  'Worth Upgrading': 'upgrade--worth',
  'Not Worth Upgrading': 'upgrade--not-worth',
};

export const EssenceCell = (props: {essence: Essence}) => {
  const { essence } = props;
  const upgradeClass = EfficiencyClassMap[essence.upgradeEfficiency];
  return (
    <div className={`essence-cell ${upgradeClass}`}>
      <img src={essence.icon} alt={essence.name} />
      <span className="name">{essence.name}</span>
      <div className="top">
        <ChaosOrbPrice price={essence.chaosValue} />
      </div>
    </div>
  );
}



const buildHierarchyList = (hierarchy: EssenceHierarchy, inverse?: boolean): Essence[] => {
  const list = [
    hierarchy.ranks['Deafening'],
    hierarchy.ranks['Shrieking'],
    hierarchy.ranks['Screaming'],
    hierarchy.ranks['Wailing'],
    hierarchy.ranks['Weeping'],
    hierarchy.ranks['Muttering'],
    hierarchy.ranks['Whispering'],
  ].filter(ess => ess) as Essence[];

  if(inverse) {
    return [...list].reverse();
  } else {
    return list;
  }
}