import { useQuery } from 'react-query';
import './OilsPage.scss';
import { PoeNinjaOverviewLine } from '../types/poe-ninja';
import { proxyFetch } from '../util/cors';
import { UpgradePriceEfficiency } from '../types/common';
import { ChaosOrbPrice } from '../components/ChaosOrbPrice';
import { EfficiencyClassMap, calcEfficiency } from '../util/efficiency';
import { UpgradeLegend } from '../components/UpgradeLegend';

const FetchOilsPrices = async(): Promise<PoeNinjaOverviewLine[]> => {
  const response = await proxyFetch('https://poe.ninja/api/data/itemoverview?league=Ancestor&type=Oil');
  const json = await response.json();
  return json?.lines || [] as PoeNinjaOverviewLine[];
};

interface Oil {
  id: string,
  name: string,
  icon: string,
  chaosValue: number,
  upgradeEfficiency: UpgradePriceEfficiency,
}

const oilOrder: string[] = [  
'clear-oil',
'sepia-oil',
'amber-oil',
'verdant-oil',
'teal-oil',
'azure-oil',
'indigo-oil',
'violet-oil',
'crimson-oil',
'black-oil',
'opalescent-oil',
'silver-oil',
'golden-oil',
];

const mapOil = (line: PoeNinjaOverviewLine, allLines: PoeNinjaOverviewLine[]): Oil => {
  const orderIndex = oilOrder.indexOf(line.detailsId);
  const nextOilId = (orderIndex === -1) ? null : oilOrder[orderIndex + 1];
  const nextOil = nextOilId ? allLines.find(l => l.detailsId === nextOilId) || null : null;

  const efficiency = calcEfficiency(line, nextOil);

  return {
    id: line.detailsId,
    name: line.name,
    icon: line.icon,
    chaosValue: line.chaosValue,
    upgradeEfficiency: efficiency,
  } 
};

const mapOils = (lines: PoeNinjaOverviewLine[]): Oil[] => {
  return lines.map(line => mapOil(line, lines));
}

export const OilsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['poe-ninja-oils'],
    queryFn: FetchOilsPrices
  });

  const oils: Oil[] = mapOils(data || []);
  //Sort oils by their index in the oilOrder array
  const sortedOils = [...oils].sort((a, b) => oilOrder.indexOf(a.id) - oilOrder.indexOf(b.id));
  
  return (
    <div className="oils-page page-content">
      <h1>Oils</h1>
      {isLoading && 'Loading...'}
      <div className="oil-list">
        {sortedOils.map(oil => {
          const efficiencyClass = EfficiencyClassMap[oil.upgradeEfficiency];
          return (
            <div className={`oil`} key={oil.id}>
              <div className={`icon icon-cell ${efficiencyClass}`}>
                <img
                  src={oil.icon}
                  alt={oil.name}
                />
              </div>
              <div className="col">
                <div className="name">
                  {oil.name}
                </div>
                <div className="price">
                  <ChaosOrbPrice price={oil.chaosValue} />
                </div>                
              </div>
            </div>
          );
        })}
      </div>
      <UpgradeLegend />
    </div>
  );
}