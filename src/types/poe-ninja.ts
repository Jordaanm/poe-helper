export interface CurrencyDetail {
  id: number,
  icon: string,
  name: string,
  tradeId: string
}

export interface PriceDetail {
  currencyTypeName: string;
  pay?: Pay;
  receive: Pay;
  paySparkLine: PaySparkLine;
  receiveSparkLine: ReceiveSparkLine;
  chaosEquivalent: number;
  lowConfidencePaySparkLine: PaySparkLine;
  lowConfidenceReceiveSparkLine: ReceiveSparkLine;
  detailsId: string;
}

export interface ReceiveSparkLine {
  data: number[];
  totalChange: number;
}

export interface PaySparkLine {
  data: (null | number | number)[];
  totalChange: number;
}

export interface Pay {
  id: number;
  league_id: number;
  pay_currency_id: number;
  get_currency_id: number;
  sample_time_utc: string;
  count: number;
  value: number;
  data_point_count: number;
  includes_secondary: boolean;
  listing_count: number;
}