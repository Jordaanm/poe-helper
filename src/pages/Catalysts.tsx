import { useState } from "react";
import { useQuery } from "react-query";
import { PoeNinjaPriceResponse, PriceDetail } from "../types/poe-ninja";
import { Catalyst } from "../components/Catalyst";
import { proxyFetch } from "../util/cors";

const FetchPoeNinjaPrices = async (): Promise<PoeNinjaPriceResponse> => {
  const response = await proxyFetch('https://poe.ninja/api/data/currencyoverview?league=Ancestor&type=Currency');
  const json = await response.json();
  return json as PoeNinjaPriceResponse;
}

type SortByOption = 'Alphabetical' | 'Price' | 'In-Game Order';

const catalystOrder = [
  'abrasive-catalyst',
  'tempering-catalyst',
  'fertilizer-catalyst',
  'unstable-catalyst',
  'accelerating-catalyst',
  'noxious-catalyst',
  'turbulent-catalyst',
  'imbued-catalyst',
  'prismatic-catalyst',
  'intrinsic-catalyst',
];

const sortCatalysts = (catalysts: PriceDetail[], sortBy: SortByOption): PriceDetail[] => {
  if (sortBy === 'Alphabetical') { 
    return [...catalysts].sort((a, b) => a.currencyTypeName.localeCompare(b.currencyTypeName));
  } else if (sortBy === 'Price') {
    return [...catalysts].sort((a, b) => b.chaosEquivalent - a.chaosEquivalent);
  } else {
    return [...catalysts].sort((a, b) => {
      const aIndex = catalystOrder.indexOf(a.detailsId);
      const bIndex = catalystOrder.indexOf(b.detailsId);
      return aIndex - bIndex;
    });
  }
};

export const Catalysts = () => {
  const { data, isLoading } = useQuery({
    queryFn: FetchPoeNinjaPrices,
    queryKey: ['poe-ninja']
  });

  const [sortBy, setSortBy] = useState<SortByOption>('In-Game Order');

  const catalysts = data?.lines.filter((x: PriceDetail) => x.currencyTypeName.includes('Catalyst')) || [];
  const sortedCatalysts = sortCatalysts(catalysts, sortBy);
  
  const groupA = sortedCatalysts.slice(0, 6);
  const groupB = sortedCatalysts.slice(6, 8);
  const groupC = sortedCatalysts.slice(8, 10);

  return (
    <>
      <h1>Catalysts</h1>
      {isLoading && 'Loading...'}
      <div className="sort-by">
        <label>Sort By: </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortByOption)}>
          <option value="Price">Price</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="In-Game Order">In-Game Order</option>
        </select>
      </div>
      <div className="catalyst-list row">
        {groupA.map(catalyst => <Catalyst key={catalyst.currencyTypeName} catalyst={catalyst} />)}
      </div>
      <div className="catalyst-list row">
        {groupB.map(catalyst => <Catalyst key={catalyst.currencyTypeName} catalyst={catalyst} />)}
        <div className="catalyst-spacer" style={{width: '8rem'}}></div>
        {groupC.map(catalyst => <Catalyst key={catalyst.currencyTypeName} catalyst={catalyst} />)}
        
      </div>
    </>
  );
};
