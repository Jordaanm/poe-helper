import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChallengeDetail, parseChallengeList } from "../util/challenge-parse";

import './Challenges.scss';
import { Challenge } from "../components/Challenge";
import { ApplicationSettingsContext, SettingsContext } from "../contexts/settings-context";
import { Link } from "react-router-dom";
import { proxyFetch } from "../util/cors";

const challengeUrl = 'https://www.pathofexile.com/account/view-profile/${username}/challenges';

type SortByOption = 'GGG' | 'Alphabetical';
type FilterOption = 'All' | 'Completed' | 'Incomplete';

const sortSubChallenge = (challenge: ChallengeDetail): ChallengeDetail => {
  if(challenge.subchallenges) {
    return {
      ...challenge,
      subchallenges: [...challenge.subchallenges].sort((a, b) => a.name.localeCompare(b.name))
    };
  }
  return challenge;
}

const fetchChallenges = async (username: string): Promise<Document> => {
  if(!username) { throw new Error("username required to fetch challenges"); }
  const url = challengeUrl.replace('${username}', username);
  const response = await proxyFetch(url);

  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  return doc;
};

export const ChallengesPage = () => {
  const { settings } = useContext<ApplicationSettingsContext>(SettingsContext);
  if(!settings.poeUsername) {
    return (
      <div className="page-content challenges-page">
        <h1>Challenges</h1>
        <p>
          Please set your PoE Username in the <Link to="/settings">Settings Page</Link> in order to access Challenge info.
        </p>
      </div>
    )
  }

  return (
    <Challenges username={settings.poeUsername} />
  )
}

interface ChallengesProps {
  username: string;
}

export const Challenges = (props: ChallengesProps) => {
  const { username } = props;
  const { isLoading, data } = useQuery({
    queryKey: ['challenges', username],
    queryFn: () => fetchChallenges(username)
  });

  const [challenges, setChallenges] = useState<ChallengeDetail[]>([]);
  const [sortBy, setSortBy] = useState<SortByOption>('GGG');
  const [filterBy, setFilterBy] = useState<FilterOption>('All');

  useEffect(() => {
    if (!data) return;

    const challenges = parseChallengeList(data);
    setChallenges(challenges);
  }, [data]);

  const sortedChallenges = sortBy === 'Alphabetical' ? [...challenges].sort((a, b) => a.name.localeCompare(b.name)).map(sortSubChallenge) : challenges;
  const filteredChallenges = filterBy === 'All' ? sortedChallenges : sortedChallenges.filter(x => x.isCompleted === (filterBy === 'Completed'));
  const completedChallenges = challenges.filter(x => x.isCompleted).length;

  return (
    <div className="page-content challenges-page">
      <h1>Challenges</h1>
      {isLoading && 'Loading...'}
      <div className="row">
        <div className="sort-by">
          <label>Sort By: </label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortByOption)}>
            <option value="GGG">In-Game Order</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="filter-by">
          <label>Filter By: </label>
          <select value={filterBy} onChange={e => setFilterBy(e.target.value as FilterOption)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <div className="details">
        <h2>{username}'s Challenges</h2>
        <p className="complete-count">{completedChallenges}/{challenges.length} Completed</p>
      </div>
      <div className="challenge-list">
        {filteredChallenges.map(challenge => <Challenge key={challenge.name} challenge={challenge} index={challenges.findIndex(c => c.name === challenge.name) + 1} />)}
      </div>
    </div>
  );
};

