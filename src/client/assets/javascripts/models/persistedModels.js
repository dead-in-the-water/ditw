export type persKey = {
	key: string,
	flag: boolean
};

export type persLocation = {
	name: string
};

export type persPlayerName = {
	prefix: string,
	first: string,
	middle: string,
	last: string,
	post: string,
	nickName: string,
	preferred: string
};

export type persSummaryStats = {
	avgFinalPos: number,
	gamesPlayed: number,
	avgFinalScore: number
};

export type persPlayerResult = {
	playerKey: string,
	playingPosition: number,
	tricksBid: number,
	tricksWon: number
};

export type persRound = {
	gameKey: persGame,
	roundNumber: number,
	handSize: number,
	dealer: persKey,
	firstBidder: persKey,
	playerResults: Array<persPlayerResult>
};

export type persClubs = {
	members: Array<persKey>,
	name: string
};

export type persPlayer = {
	name: persPlayerName,
	clubs: Array<persKey>,
	games: Array<persKey>,
	rounds: Array<persKey>,
	stats: persSummaryStats
};

export type persGame = {
	location: persLocation,
	startDateTime: object,
	endDateTime: object,
	players: Array<persKey>
	rounds: Array<persKey>
	ruleSet: persKey
};