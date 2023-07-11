//import the db object
const db = require('../db/dbConfig.js')

// if the trade exist and traded already then its unavavilable
const updateTradeSuccess = async (offerer_game_id, receiver_game_id) => {
  try {
    await db.none(
      "UPDATE tradeRequests SET trade_success = 'unavailable' WHERE (trade_offerer_game_id = $1 OR trade_receiver_game_id = $2) AND NOT (trade_offerer_game_id = $1 AND trade_receiver_game_id = $2)",
      [offerer_game_id, receiver_game_id]
    )
    console.log('Trade success updated successfully.')
  } catch (error) {
    console.log('Error updating trade success:', error.message)
  }
}

//swap the games among two users
const swapGames = async (swapGameRequest) => {
  const { offerer_id, receiver_id, offerer_game_id, receiver_game_id } =
    swapGameRequest

  try {
    // Update trade success before swapping games
    await updateTradeSuccess(offerer_game_id, receiver_game_id)

    const swapGameOne = await db.one(
      'UPDATE games SET user_id = $1 WHERE game_id = $2 RETURNING *;',
      [offerer_id, receiver_game_id]
    )
    const swapGameTwo = await db.one(
      'UPDATE games SET user_id = $1 WHERE game_id = $2 RETURNING *;',
      [receiver_id, offerer_game_id]
    )

    const updateOffererTradeScore = await db.one(
      'UPDATE users SET user_trade_score = user_trade_score + 1 WHERE user_id = $1 RETURNING *;',
      [offerer_id]
    )

    const updateReceiverTradeScore = await db.one(
      'UPDATE users SET user_trade_score = user_trade_score + 1 WHERE user_id = $1 RETURNING *;',
      [receiver_id]
    )
    return [
      swapGameOne,
      swapGameTwo,
      updateOffererTradeScore,
      updateReceiverTradeScore,
    ]
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  swapGames,
}
