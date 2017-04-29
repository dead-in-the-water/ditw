/* eslint semi: ["error", "never"] */
/* eslint no-console: "off" */
/* eslint no-unused-vars: "warn" */
/* eslint eqeqeq: "error" */
/* eslint no-undef: "error" */
/* eslint no-undef-init: "error" */
/* eslint no-undefined: "error" */
/* eslint no-tabs: "off" */
/* eslint indent: ["error", "tab"] */
/* no-use-before-define: "error" */

/* eslint no-unused-vars: "off" */

// Import Admin SDK
var admin = require('firebase-admin')
var async = require('async')

// Fetch the service account key JSON file contents
var serviceAccount = require('./ditw-5e8ff-firebase-adminsdk-7tn29-3e848e0fab.json')

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://ditw-5e8ff.firebaseio.com'
})

// Get a database reference to our posts
var db = admin.database()
var rootRef = db.ref('/')

var playersRef = rootRef.child('players')
var gamesRef = rootRef.child('games')
var clubsRef = rootRef.child('clubs')
var ruleSetsRef = rootRef.child('ruleSets')
var roundsRef = rootRef.child('rounds')
var linkPlayersGamesRef = rootRef.child('linkPlayersGames')
var linkPlayersRoundsRef = rootRef.child('linkPlayersRounds')

const INVALID_NUMERIC_VALUE = Number.MAX_SAFE_INTEGER

const initialRound = {
	GameKey: null,
	bidTimestamp: INVALID_NUMERIC_VALUE,
	dealerKey: null,
	firstBidderKey: null,
	handSizeGoingUp: false,
	handsize: INVALID_NUMERIC_VALUE,
	results: null,
	round: INVALID_NUMERIC_VALUE,
	scoredTimestamp: INVALID_NUMERIC_VALUE
}

var currentRound = {
	state: {
		GameKey: null,
		bidTimestamp: INVALID_NUMERIC_VALUE,
		dealerKey: null,
		firstBidderKey: null,
		handSizeGoingUp: false,
		handsize: INVALID_NUMERIC_VALUE,
		results: null,
		round: INVALID_NUMERIC_VALUE,
		scoredTimestamp: INVALID_NUMERIC_VALUE
	},
	getGameKey () {
		return this.state.gameKey
	},
	setGameKey (newGameKey) {
		this.state.gameKey = newGameKey
	},
	getBidTimestamp () {
		return this.state.bidTimestamp
	},
	setBidTimestamp (newTimeStamp) {
		this.state.bidTimestamp = newTimeStamp
	},
	getDealerKey () {
		return this.state.dealerKey
	},
	setDealerKey (newDealerKey) {
		this.state.dealerKey = newDealerKey
	},
	getFirstBidderKey () {
		return this.state.firstBidderKey
	},
	setFirstBidderKey (newBidderKey) {
		this.state.firstBidderKey = newBidderKey
	},
	getHandSizeGoingUp () {
		return this.state.handSizeGoingUp
	},
	setHandSizeGoingUp (newGoingUpFlag) {
		this.state.handSizeGoingUp = newGoingUpFlag
	},
	getHandsize () {
		return this.state.handsize
	},
	setHandsize (newHandSize) {
		this.state.handsize = newHandSize
	},
	getResults () {
		return this.state.results
	},
	setResults (newResultsThingy) {
		this.state.results = newResultsThingy
	},
	getRoundNumber () {
		return this.state.roundNumber
	},
	setRoundNumber (newRoundNumber) {
		this.state.roundNumber = newRoundNumber
	},
	getScoredTimestamp () {
		return this.state.scoredTimestamp
	},
	ScoredTimestamp (newTimeStamp) {
		this.state.scoredTimestamp = newTimeStamp
	}
}

var currentGame = {
	key: null,
	ref: null,
	dirty: false,
	state: {
		endTimestamp: INVALID_NUMERIC_VALUE,
		location: null,
		ruleSetKey: null,
		startTimestamp: INVALID_NUMERIC_VALUE
	},

	clearData () {
		this.key = null
		this.ref = null
		this.dirty = false
		this.state.endTimestamp = INVALID_NUMERIC_VALUE
		this.state.location = null
		this.state.ruleSetKey = null
		this.state.startTimestamp = INVALID_NUMERIC_VALUE
	},
	persist (onlyIfDirty = true) {
		if ((this.dirty) || !onlyIfDirty) {
			console.log('Issuing set for current game state')
			this.ref.set(this.state)
				.then(() => {
					this.dirty = false
					console.log('..persist of currentGame complete successfully')
				})
			.catch((err) => {
				console.error('ERROR! Persist of current game state failed with code: ' + err.code + '\'' + err.message + '\'')
			})
		}
	},
	getKey () {
		return this.key
	},
	setKey (newKey) {
		this.key = newKey
		this.dirty = true
	},
	getState () {
		return this.state
	},
	setState (newState) {
		this.state = newState
		this.dirty = true
	},
	getRef () {
		return this.ref
	},
	setRef (newRef) {
		this.ref = newRef
		this.dirty = true
	},
	getEndTimestamp () {
		return this.state.endTimestamp
	},
	setEndTimestamp (newTimeStamp) {
		this.state.endTimestamp = newTimeStamp
		this.dirty = true
	},
	getLocation () {
		return this.state.location
	},
	setLocation (newLocation) {
		this.state.location = newLocation
		this.dirty = true
	},
	getRuleSetKey () {
		return this.state.ruleSetKey
	},
	setRuleSetKey (newRuleSetKey) {
		this.state.ruleSetKey = newRuleSetKey
		this.dirty = true
	},
	getStartTimestamp () {
		return this.state.startTimestamp
	},
	setStartTimestamp (newTimeStamp) {
		this.dirty = true
		this.state.startTimestamp = newTimeStamp
	}
}

var currentRuleSet = {
	cardDecks: {
		count: 1,
		size: 52
	},
	handSize: {
		increment: 1,
		max: INVALID_NUMERIC_VALUE,
		min: 1,
		roundTrip: true,
		startWithMax: true,
		starting: INVALID_NUMERIC_VALUE
	},
	name: 'Some Standard',
	playersMax: 10,
	playersMin: 4,
	scoring: {
		contractMadeBonus: 10,
		contractMadeBonusMultiplicative: false,
		multiplicativeGlobalAdjust: false,
		multiplicativeZeroAdjust: 1,
		perTrickValue: 1
	},
	screwTheDealer: true,
	timeLimitMinutes: INVALID_NUMERIC_VALUE
}

/* eslint no-unused-vars: "error" */

// Assuming that this functionality (appropriately installed in reducer/middleware) will be called
// when the user selects new game.
function initGame (gameKey = null) {
	console.log('Initializing game')

	// If a (what should be a) valid gameKey has been passed, treat as restore
	// TODO: LOGIC INCOMPLETE
	if (gameKey !== null) {
		console.log('In initGame, key passed path')
		currentGame.setRef(gamesRef.child(gameKey))
		currentGame.getRef().once('value')
			.then((gameStateSnap) => {
				console.log('In initGame, all good, setting currentGame state')
				currentGame.setState(gameStateSnap.val())
			})
			.catch((err) => {
				console.error('ERROR in initGame retrieving game state from passed key = \'' + gameKey + '\'')
				console.error('Code: ' + err.code + '\'' + err.message + '\'')
			})
	} else {
		console.log('..requesting new game key')
		// If this is a new game, create the stub & save the key + ref
		var tRef = gamesRef.push(currentGame.state)
		tRef.then(() => {
			console.log('..new game key arrivedL \'' + tRef.key + '\'')
			currentGame.setKey(tRef.key)
			currentGame.setRef(tRef)
		})
	}
}

function waitForGameKey (nxtFcn) {
	var count = 0

	console.log('Waiting for game key to fill in')
	async.whilst(
		() => ((currentGame.getKey() === null) && (count < 5)),
		(callback) => {
			count++
			setTimeout(callback, 1000)
		},
		(err, n) => {
			if (currentGame.getKey() === null) {
				console.error('..timeout occured while waiting for new game key')
				console.error('    err.message = \'' + err.message + '\'')
			} else {
				console.log('..new game key availble')
				nxtFcn()
			}
		}
	)
}

function waitForRulesKey (nxtFcn) {
	var count = 0

	console.log('Waiting for rules key to fill in')
	async.whilst(
		() => ((currentGame.getRuleSetKey() === null) && (count < 5)),
		(callback) => {
			count++
			setTimeout(callback, 1000)
		},
		(err, n) => {
			if (currentGame.getRuleSetKey() === null) {
				console.error('..timeout occured while waiting for new rules key')
				console.error('    err.message = \'' + err.message + '\'')
			} else {
				console.log('..new rules key availble')
				nxtFcn()
			}
		}
	)
}

function cancelCurrentGame () {
	console.log('Cancelling current game')
	if (currentGame.getKey()) {
		var removePromise = currentGame.getRef().remove()
		removePromise.then(() => {
			currentGame.clearData()
		})
	} else {
		console.error('ERROR: cancelCurrentGame called but currentGame.key is falsy')
	}
}

// For current purposes, just force the key for the only valid ruleSet
function selectRuleSet () {
	if (!currentGame.getKey()) {
		console.error('ERROR: selectRuleSet called with uninitialized game key')
	} else {
		ruleSetsRef.child('-KhXmZVCfTrM0zcbYYhF').once('value', (myRulesSnap) => {
			currentRuleSet = myRulesSnap.val()
			currentGame.setRuleSetKey(myRulesSnap.key)
			console.log('Data received in selectRuleSet. handSize.startWithMax = ' + currentRuleSet.handSize.startWithMax)
			console.log('toString = \'' + JSON.stringify(myRulesSnap.val()) + '\'')
		})
	}
}

function genRandomPlayerRoster (minPlayers, maxPlayers) {
	var range = maxPlayers - minPlayers

	var numberOfPlayers = Math.floor(Math.random() * range) + minPlayers

	console.log('The game will have ' + numberOfPlayers + ' players')

	return numberOfPlayers
}

function initRounds () {
	var playerCount = genRandomPlayerRoster(currentRuleSet.playersMin, currentRuleSet.playersMax)
	var maxHandSize = calcMaxHandSize(playerCount, currentRuleSet.cardDecks.count, currentRuleSet.cardDecks.size)
}

function calcMaxHandSize (players, decks, deckSize) {
	var maxHandSize = Math.floor((decks * deckSize) / players)

	// There has to be at least 1 card left to establish trump
	if (((decks * deckSize) % players) === 0) {
		maxHandSize--
	}
	console.log('maxHandSize = ' + maxHandSize)
	return maxHandSize
}

// Initialize the game, requesting new game key
initGame()
// selectPlayers()
waitForGameKey(selectRuleSet)
waitForRulesKey(initRounds)

// reportRounds()
// waitForGameKey(cancelCurrentGame)

// EOF
