type PlayerById = {
  id?: number,
  lastName: string,
  firstName: string,
  avgScore: number,
  avgPosition: number,
  gamesPlayed: number,
  birthDate: number
};

// This is the model of our module state
export type State = {
  players: number[],
  playersById: Array<PlayerById>
};
