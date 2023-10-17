import { useState } from "react";
import { ChallengeDetail, SubchallengeDetail } from "../util/challenge-parse";

interface ChallengeProps {
  challenge: ChallengeDetail
  index: number;
}
export const Challenge = (props: ChallengeProps) => {
  const { challenge, index } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(v => !v);

  return (
    <div className="challenge col" data-completed={challenge.isCompleted}>
      <div className=" name-row row">
        <button className={`toggle ${isOpen ? 'open' : 'closed'}`} onClick={toggle}></button>
        <h2>{challenge.name} ({index})</h2>
        <div className="completion">
          {challenge.completion}
        </div>
        <div className="icon">{challenge.isCompleted ? '✓' : '✗'}</div>
      </div>
      <div className="items" data-isopen={isOpen} >
        <div className="items-inner">
          {challenge.subchallenges.map(x => <Subchallenge key={x.name} subchallenge={x} />)}
        </div>
      </div>
    </div>
  );
}

const Subchallenge = (props: { subchallenge: SubchallengeDetail}) => {
  const { subchallenge } = props;
  const { completed, name } = subchallenge;

  return (
    <div className="subchallenge" data-completed={completed}>
      <div className="name">
        {name}
      </div>
      <div className="completion">
        {completed ? '✓' : '✗'}
      </div>
    </div>
  )
}