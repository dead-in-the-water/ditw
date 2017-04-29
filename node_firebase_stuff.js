// Import Admin SDK
var admin = require("firebase-admin")

// Fetch the service account key JSON file contents
var serviceAccount = require("./ditw-5e8ff-firebase-adminsdk-7tn29-3e848e0fab.json")

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ditw-5e8ff.firebaseio.com"
})

// Get a database reference to our posts
var db = admin.database()
var rootRef = db.ref('/')

playersRef = rootRef.child('players')
gamesRef = rootRef.child('games')
clubsRef = rootRef.child('clubs')
ruleSetsRef = rootRef.child('ruleSets')
roundsRef = rootRef.child('rounds')
linkPlayersGamesRef = rootRef.child('linkPlayersGames')
linkPlayersRoundsRef = rootRef.child('linkPlayersRounds')


function listPlayersByRound(roundKey) {
	linkPlayersRoundsRef.orderByChild('roundKey').equalTo(roundKey).once('value', (links) => {
		links.forEach((link) => {
			console.log('In listPlayersByRound onceValue, link.val() = ' + JSON.stringify(link.val(), null, 2))
		})
	})
}

function listRoundsByPlayer(playerKey) {
	linkPlayersRoundsRef.orderByChild('playerKey').equalTo(playerKey).once('value', (links) => {
		links.forEach((link) => {
			console.log('In listRoundsByPlayer onceValue, link.val() = ' + JSON.stringify(link.val(), null, 2))
		})
	})
}

function listPlayersByGame(gameKey) {
	linkPlayersGamesRef.orderByChild('gameKey').equalTo(gameKey).once('value', (links) => {
		links.forEach((link) => {
			console.log('in onceValue, link.val() = ' + JSON.stringify(link.val(), null, 2))
		})
	})
}

function listGamesByPlayer(playerKey) {
	linkPlayersGamesRef.orderByChild('playerKey').equalTo(playerKey).once('value', (links) => {
		links.forEach((link) => {
			console.log('in onceValue, link.val() = ' + JSON.stringify(link.val(), null, 2))
		})
	})
}

function chgToRoundNumberInRounds() {
	roundsRef.once('value', (roundsSnap) => {
		roundsSnap.forEach((round) => {
			var tempRound = round.val()
			tempRound.roundNumber = tempRound.round
			delete tempRound.round
			roundsRef.child(round.key).set(tempRound)
				.then(() => {
					console.log('Update complete for roundKey = \'' + round.key + '\'') 
				})
				.catch((error) => {
					console.error('ERROR: Update complete for roundKey = \'' + round.key + '\' failed!')
					console.error('Code: ' + error.code + ' - ' + error.message)
				})
		})
	})
}

function addOrdinalToResultsInRounds() {
	console.log('In addOrdinalToResultsInRounds')
	roundsRef.once('value', (roundsSnap) => {
		roundsSnap.forEach((round) => {
			console.log('..looking at round \'' + round.key + '\'')
			var ordinal = 0
			round.child('results').forEach((playerResult) => {
				console.log('....looking at results for player key = \'' + playerResult.key + '\', attempting update/' + ordinal)
				playerResult.ref.update({ 'ordinal' : ordinal++ })
					.then(() => {
						console.log('......update complete for round \'' + round.key + '\' player key \'' + playerResult.key)
					})
				.catch((err) => {
					console.error('ERROR: On update for round \'' + round.key + '\' player key \'' + playerResult.key)
					console.error('  err.code: \'' + err.code + '\' - ' + err.message)
				})
			})
		})
	})
}

function addDirectionToRounds() {
	roundsRef.once('value', (roundsSnap) => {
		roundsSnap.forEach((round) => {
			roundsRef.child(round.key).update({ 'handSizeGoingUp' : true })
			.then(() => {
				console.log('Update complete for roundKey = \'' + round.key + '\'')
			})
			.catch((error) => {
				console.log('ERROR: Update failed for roundKey = \'' + round.key + '\'! Code: ' + error.code + ' - ' + error.message)
			})
		})
	})
}

function addTimestampsToRounds() {
	roundsRef.once('value', (roundsSnap) => {
		roundsSnap.forEach((round) => {
			roundsRef.child(round.key).update({ 'bidTimestamp' : admin.database.ServerValue.TIMESTAMP,
																					'scoredTimestamp' : admin.database.ServerValue.TIMESTAMP })
			.then(() => {
				console.log('Update complete for roundKey = \'' + round.key + '\'')
			})
			.catch((error) => {
				console.log('ERROR: Update failed for roundKey = \'' + round.key + '\'! Code: ' + error.code + ' - ' + error.message)
			})
		})
	})
}

function addTimestampsToGames() {
	gamesRef.once('value', (gamesSnap) => {
		gamesSnap.forEach((game) => {
			gamesRef.child(game.key).update({ 'startTimestamp' : admin.database.ServerValue.TIMESTAMP,
																					'endTimestamp' : admin.database.ServerValue.TIMESTAMP })
			.then(() => {
				console.log('Update complete for gameKey = \'' + game.key + '\'')
			})
			.catch((error) => {
				console.log('ERROR: Update failed for gameKey = \'' + game.key + '\'! Code: ' + error.code + ' - ' + error.message)
			})
		})
	})
}

// Build the linkPlayersRounds 'table'
function buildLinkPlayer2Rounds() {
	// Iterate games
	roundsRef.once('value', function(roundsSnap) {
		roundsSnap.forEach(function(round) {
			for (player in round.val().results) {
				linkPlayersRoundsRef.push({ 'roundKey' : round.key, 'playerKey' : player })
					.then(function() {
						console.log('Push completed successfully')
					})
					.catch(function(error) {
						console.log('ERROR: Push failed. Code: ' + error.code + ' - ' + error.message)
					})
			}
		})
	})
}

// Build the linkPlayersGames 'table'
function buildLinkPlayer2Games() {
	// Iterate games
	gamesRef.once('value', function(gamesSnap) {

		console.log('In onceValue')

		// Allow for possibility of multiple games (not currently true)
		gamesSnap.forEach(function(game) {
			for (player in game.val().players) {
				linkPlayersGamesRef.push({ 'gameKey' : game.key, 'playerKey' : player })
					.then(function() {
						console.log('Push completed successfully')
					})
					.catch(function(error) {
						console.log('ERROR: Push failed. Code: ' + error.code + ' - ' + error.message)
					})
			}
		})
	})
}

// This function restructures the round data from original saved from game instance to *new & improved*
// Saved as a function to keep useful bits around in case I need them later
function reStructureRounds() {
	var playerList = []

	// Read in only first 4 players 'cause I happen to know that's all that're in the game in this data set
	playersRef.orderByKey().limitToFirst(4).once('value', function(playersSnap) {
		// Save the player data for later reference
		playersSnap.forEach(function(player) {
			var tPlayer = player.val()
			tPlayer.key = player.key
			playerList.push(tPlayer)
		})

		// Read in the rounds (just once 'cause I'm going to change data)
		roundsRef.once('value', function(roundSnap) {
			// Itereate through the rounds to make changes in each
			roundSnap.forEach(function(round) {

				// This conditional necessary because I changed one round in earlier run
				if (!!round.val().round) {

					// Get the round data into js object so I cam make changes
					var ssVal = round.val()

					// Create new property 'firstBidderKey', set to key for this round's first bidder and delete old bidder idx prop
					ssVal.firstBidderKey = playerList[ssVal.bidder].key
					delete ssVal.bidder 

					// Create new property 'dealerKey', set to key for this rounds dealer and delete old dealer idx
					ssVal.dealerKey = playerList[ssVal.dealer].key
					delete ssVal.dealer 

					// Create new prop 'gameKey' and set to key of only game currently in database
					ssVal.GameKey = '-KhZVgWRcNVPOR7SWlaC'

					// Iterate through the results array, delete old id prop, insert new prop keyed on player & shove tricksBid & 
					// tricksWon under that
					var oldResultsLen = ssVal.results.length
					for (var i = 0; i < oldResultsLen; i++) {
						delete ssVal.results[i].id
						ssVal.results[playerList[i].key] = ssVal.results[i]
					}

					// Delete the older keyed-by-array-index results from working image
					ssVal.results.splice(0, oldResultsLen)

					// Now set the db with the updated working object
					roundsRef.child(round.key).set(ssVal)
						.then(function() {
							console.log('Set complete for result key = ' + round.key)
						})
						.catch(function(error) {
							console.log('ERROR on result key = ' + round.key + '! Code: ' + error.code + ' - \'' + error.message + '\'')
						})
				}
			})
		})
	})
}

console.log('Starting up...')
// listPlayersByGame('-KhZVgWRcNVPOR7SWlaC')
// listGamesByPlayer('-KhVrsiz8rq-xwQHlbuildLinkPlayer2Roundssj2')
// buildLinkPlayer2Rounds()
// listPlayersByRound('-KhiR1N0Xw4c0i4i1akt')
// listRoundsByPlayer('-KhVrsiz8rq-xwQHlsj2')
// addTimestampsToRounds()
// addTimestampsToGames()
// addDirectionToRounds()
// chgToRoundNumberInRounds()
addOrdinalToResultsInRounds()
