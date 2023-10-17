import { useState } from "react";
import { useQuery } from "react-query";
import { PoeNinjaPriceResponse, PriceDetail } from "../types/poe-ninja";
import { Catalyst } from "../components/Catalyst";

const FetchPoeNinjaPrices = async (): Promise<PoeNinjaPriceResponse> => {
  const response = await fetch('https://poe.ninja/api/data/currencyoverview?league=Ancestor&type=Currency');
  const json = await response.json();
  return json as PoeNinjaPriceResponse;
}

type SortByOption = 'Alphabetical' | 'Price';

export const Catalysts = () => {
  const { data, isLoading } = useQuery({
    queryFn: FetchPoeNinjaPrices,
    queryKey: ['poe-ninja']
  });

  const [sortBy, setSortBy] = useState<SortByOption>('Price');

  const catalysts = data?.lines.filter((x: PriceDetail) => x.currencyTypeName.includes('Catalyst')) || [];
  const sortedCatalysts = sortBy === 'Alphabetical' ? [...catalysts].sort((a, b) => a.currencyTypeName.localeCompare(b.currencyTypeName)) : [...catalysts].sort((a, b) => b.chaosEquivalent - a.chaosEquivalent);

  console.log("Cataltysts", catalysts);
  return (
    <>
      <h1>Catalysts</h1>
      {isLoading && 'Loading...'}
      <div className="sort-by">
        <label>Sort By: </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortByOption)}>
          <option value="Price">Price</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>
      <div className="catalyst-list">
        {sortedCatalysts.map(catalyst => <Catalyst key={catalyst.currencyTypeName} catalyst={catalyst} />)}
      </div>
    </>
  );
};
