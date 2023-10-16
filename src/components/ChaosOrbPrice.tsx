import './ChaosOrbPrice.scss';

interface ChaosOrbPriceProps {
  price: number;
}

export const ChaosOrbPrice = (props: ChaosOrbPriceProps) => {
  return (
    <div className="chaos-orb-price">
      <span className="price">{props.price}</span>
      <img className="chaos-orb" src="https://www.pathofexile.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png" alt="Chaos Orb" />
    </div>
  );
}
