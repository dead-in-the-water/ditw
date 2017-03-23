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
  currentPlayers: Array<CurrentPlayer>,
  defaultPlayerSortOrder: number
};