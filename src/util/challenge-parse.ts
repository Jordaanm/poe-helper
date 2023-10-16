export interface ChallengeDetail {
  name: string,
  completion: string,
  isCompleted?: boolean,
  subchallenges: SubchallengeDetail[],
}

export interface SubchallengeDetail {
  name: string,
  completed: boolean,
}

export const parseChallengeList = (doc?: Document): ChallengeDetail[] => {

  if(!doc) { return []; }
  

  const elements = Array.from(doc.querySelectorAll('.achievement-list .achievement'));
  return elements.map(element => parseChallenge(element));
}

export const parseChallenge = (root: Element): ChallengeDetail =>{
  const name = root.querySelector('h2')?.textContent || '';
  const completion = root.querySelector('h2.completion-detail')?.textContent || '';

  const subchallenges = Array.from(root.querySelectorAll('.items ul li')).map(parseSubchallenge);
  const isCompleted = parseIsCompleted(completion);
  return { name, completion, subchallenges, isCompleted };
}

const parseSubchallenge = (root: Element): SubchallengeDetail => {

  const name = root.textContent || '';
  const completed = root.classList.contains('finished');

  return { name, completed };
}

const parseIsCompleted = (completion: string): boolean => {
  const [pre, post] = completion.split('/');
  const [completed, total] = [parseInt(pre), parseInt(post)];
  return completed >= total;
}