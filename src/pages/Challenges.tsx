import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChallengeDetail, parseChallengeList } from "../util/challenge-parse";

import './Challenges.scss';
import { Challenge } from "../components/Challenge";

const challengeUrl = 'https://www.pathofexile.com/account/view-profile/jordaanm/challenges';

type SortByOption = 'GGG' | 'Alphabetical';

const fetchChallenges = async (): Promise<Document> => {
  const response = await fetch(challengeUrl);

  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  return doc;
};

export const Challenges = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges
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
    <>
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
    </>
  );
};

