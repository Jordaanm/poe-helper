import { UpgradePriceEfficiency } from "../types/common";
import { PoeNinjaOverviewLine } from "../types/poe-ninja";

export const calcEfficiency = (item: PoeNinjaOverviewLine, nextItem: PoeNinjaOverviewLine | null): UpgradePriceEfficiency => {
  if(!nextItem) { return 'Not Worth Upgrading'; }
  const ratio = nextItem.chaosValue / item.chaosValue;
  if(ratio > 3) { return 'Worth Upgrading'; }
  return ratio === 3 ? 'Equivalent' : 'Not Worth Upgrading';
}
