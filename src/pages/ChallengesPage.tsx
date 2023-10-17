import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChallengeDetail, parseChallengeList } from "../util/challenge-parse";

import './Challenges.scss';
import { Challenge } from "../components/Challenge";
import { ApplicationSettingsContext, SettingsContext } from "../contexts/settings-context";
import { Link } from "react-router-dom";

const challengeUrl = 'https://www.pathofexile.com/account/view-profile/${username}/challenges';

type SortByOption = 'GGG' | 'Alphabetical';

const fetchChallenges = async (username: string): Promise<Document> => {
  console.log("Fetching Challenges for " + username);
  if(!username) { throw new Error("username required to fetch challenges"); }
  const url = challengeUrl.replace('${username}', username);
  const response = await fetch(url);

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

  useEffect(() => {
    if (!data) return;

    const challenges = parseChallengeList(data);
    setChallenges(challenges);
  }, [data]);

  const sortedChallenges = sortBy === 'Alphabetical' ? [...challenges].sort((a, b) => a.name.localeCompare(b.name)) : challenges;

  return (
    <div className="page-content challenges-page">
      <h1>Challenges</h1>
      {isLoading && 'Loading...'}
      <div className="sort-by">
        <label>Sort By:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortByOption)}>
          <option value="GGG">In-Game Order</option>
          <option value="Alphabetical">Alphabetical</option>
        </select>
      </div>
      <div className="challenge-list">
        {sortedChallenges.map(x => <Challenge key={x.name} challenge={x} />)}
      </div>
    </div>
  );
};

