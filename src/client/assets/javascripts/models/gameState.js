export type PlayerTopLevel = {
  id?: number,
  lastName: string,
  firstName: string,
  avgScore: number,
  avgPosition: number,
  gamesPlayed: number,
  birthDate: number,
  inThisGame: boolean,
  ordinalPosition: number,
  nickName: string,
  useGameName: boolean
};

export type RuleSet = {
  id: number,
  minPlayers: number,
  maxPlayers: number
};

export type CurrentUser = {
  loggedIn: boolean,
  id: number,
  activeClubId: number,
  isAdmin: boolean
};

export type GameRound = {
  dealer: number,
  bidder: number,
  handSize: number,
  results: Array<GamePlayerRound>
};

export type GamePlayerRound = {
  id: number,
  tricksBid: Array<number>,
  tricksWon: Array<number>,
};

export type GameRound = {
  dealer: number,
  bidder: number,
  handSize: number,
  results: Array<GamePlayerRound>
};

export type GameState = {
  currentUser: CurrentUser,
  currentRound: numbrer,
  currentDealer: number,
  currentBidder: number,
  currentRuleSet: RuleSet,
  playerRoster: Array<PlayerTopLevel>,
  currentPlayers: Array<CurrentPlayer>,
  gameRounds: Array<GameRound>,
  currentRound: number,
  bidding: boolean,
  playing: boolean,
  defaultPlayerSortOrder: number
};