import { useQuery } from "react-query";
import { ChaosOrbPrice } from "../components/ChaosOrbPrice";
import { PoeNinjaOverviewLine } from "../types/poe-ninja";
import "./DeliriumPage.scss";
import { useState } from "react";
import { proxyFetch } from "../util/cors";

const FetchDeliriumPrices = async(): Promise<PoeNinjaOverviewLine[]> => {
  const response = await proxyFetch('https://poe.ninja/api/data/itemoverview?league=Ancestor&type=DeliriumOrb');
  const json = await response.json();
  return json?.lines || [] as PoeNinjaOverviewLine[];
};

type SortByOption = 'Alphabetical' | 'Price';

export const DeliriumPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: FetchDeliriumPrices,
    queryKey: ['poe-ninja-deli']
  });

  const [sortBy, setSortBy] = useState<SortByOption>('Price');

  const deliriumOrbs = data || [];

  const sortedDeliriumOrbs = (sortBy === 'Alphabetical') ? 
    [...deliriumOrbs].sort((a, b) => a.name.localeCompare(b.name)) : 
    [...deliriumOrbs].sort((a, b) => b.chaosValue - a.chaosValue);


  return (
    <div className="delirium-page page-content">
      <h1>Delirium</h1>
      {isLoading && 'Loading...'}
      <div className="sort-by">
        <label>Sort By: </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortByOption)}>
          <option value="Price">Price</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>
      <div className="delirium-orb-list">
        {sortedDeliriumOrbs.map((orb: PoeNinjaOverviewLine) => (
          <div key={orb.id} className="delirium-orb">
            <div className="icon icon-cell">
              <img
                src={orb.icon}
                alt={orb.name}
              />
            </div>
            <div className="price">
              <ChaosOrbPrice price={orb.chaosValue} />
            </div>                
            <div className="name">
              {orb.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}