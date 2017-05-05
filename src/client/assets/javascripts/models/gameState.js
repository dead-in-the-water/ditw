export type CardClub = {
  key: string,
  name: string,
  members: Array<number>
};

export type PlayerTopLevel = {
  id: number,
  lastName: string,
  firstName: string,
  avgScore: number,
  avgPosition: number,
  gamesPlayed: number,
  birthDate: number,
  inThisGame: boolean,
  ordinalPosition: number,
  nickName: string,
  clubs: Array<CardClub>
};

export type RuleSet = {
  id: number,
  minPlayers: number,
  maxPlayers: number,
  contractBonus: number,
  contractBonusMultiplicative: boolean,
  trickBonus: number,
  screwTheDealer: boolean
};

export type CurrentUser = {
  key: string,
  loggedIn: boolean,
  activeClubKey: string,
  isAdmin: boolean
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
  persistedGameId: string,
  currentUser: CurrentUser,
  currentClub: CardClub,
  currentRound: number,
  currentDealer: number,
  currentBidder: number,
  currentRuleSet: RuleSet,
  playerRoster: Array<PlayerTopLevel>,
  gameRounds: Array<GameRound>,
  currentRoundIdx: number,
  bidding: boolean,
  scoring: boolean,
  defaultPlayerSortOrder: number
};
