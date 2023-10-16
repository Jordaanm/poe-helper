import React from "react";
import { PriceDetail } from "../types/poe-ninja";
import { ChaosOrbPrice } from "./ChaosOrbPrice";
import './Catalyst.scss';

interface CatalystProps {
  catalyst: PriceDetail;
}

export const Catalyst = (props: CatalystProps) => {
  const { catalyst } = props;
  const iconSrc = catalystIconMap[catalyst.detailsId];

  return (
    <div className="catalyst row">
      <div className="icon">
        <img src={iconSrc} aria-hidden />
      </div>
      <div className="name">
        {catalyst.currencyTypeName}
      </div>
      <div className="price">
        <ChaosOrbPrice price={catalyst.chaosEquivalent}/>
      </div>
    </div>
  );
}

const catalystIconMap: Record<string, string> = {
  'abrasive-catalyst': 'https://www.poewiki.net/images/0/0d/Abrasive_Catalyst_inventory_icon.png',
  'unstable-catalyst': 'https://www.poewiki.net/images/1/1c/Unstable_Catalyst_inventory_icon.png',
  'fertile-catalyst': 'https://www.poewiki.net/images/c/c1/Fertile_Catalyst_inventory_icon.png',
  'accelerating-catalyst': 'https://www.poewiki.net/images/8/86/Accelerating_Catalyst_inventory_icon.png',
  'imbued-catalyst': 'https://www.poewiki.net/images/8/8a/Imbued_Catalyst_inventory_icon.png',
  'intrinsic-catalyst': 'https://www.poewiki.net/images/7/79/Intrinsic_Catalyst_inventory_icon.png',
  'noxious-catalyst': 'https://www.poewiki.net/images/a/a3/Noxious_Catalyst_inventory_icon.png',
  'prismatic-catalyst': 'https://www.poewiki.net/images/a/a0/Prismatic_Catalyst_inventory_icon.png',
  'tempering-catalyst': 'https://www.poewiki.net/images/8/84/Tempering_Catalyst_inventory_icon.png',
  'turbulent-catalyst': 'https://www.poewiki.net/images/6/61/Turbulent_Catalyst_inventory_icon.png'
}