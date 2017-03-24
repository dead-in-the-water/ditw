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
  gameName: string,
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

export type CurrentPlayer = {
  id: number,
  playerName: string
};

export type GameState = {
  currentUser: CurrentUser,
  currentDealer: number,
  currentBidder: number,
  currentRuleSet: RuleSet,
  playerRoster: Array<PlayerTopLevel>,
  currentPlayers: Array<CurrentPlayer>,
  defaultPlayerSortOrder: number
};