//import the db object
const db = require("../db/dbConfig.js");

//swap the games among two users
// const swapGames = async (swapGameRequest) => {
//   const { offerer_id, receiver_id, offerer_game_id, receiver_game_id } =
//     swapGameRequest;

//   try {
//     const swapGameOne = await db.one(
//       "update games set user_id=$1 where game_id=$2 returning *;",
//       [offerer_id, receiver_game_id]
//     );
//     const swapGameTwo = await db.one(
//       "update games set user_id=$1 where game_id=$2 returning *;",
//       [receiver_id, offerer_game_id]
//     );
//     return [swapGameOne, swapGameTwo];
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// if the trade exist and traded already then its unavavilable
const updateTradeSuccess = async (offerer_game_id, receiver_game_id) => {
  try {
    await db.none(
      "UPDATE tradeRequests SET trade_success = 'unavailable' WHERE (trade_offerer_game_id = $1 OR trade_receiver_game_id = $2) AND NOT (trade_offerer_game_id = $1 AND trade_receiver_game_id = $2)",
      [offerer_game_id, receiver_game_id]
    );
    console.log('Trade success updated successfully.');
  } catch (error) {
    console.log('Error updating trade success:', error.message);
  }
};

//swap the games among two users
const swapGames = async (swapGameRequest) => {
  const { offerer_id, receiver_id, offerer_game_id, receiver_game_id } =
    swapGameRequest;

  try {
    // Update trade success before swapping games
    await updateTradeSuccess(offerer_game_id, receiver_game_id);

    const swapGameOne = await db.one(
      "UPDATE games SET user_id = $1 WHERE game_id = $2 RETURNING *;",
      [offerer_id, receiver_game_id]
    );
    const swapGameTwo = await db.one(
      "UPDATE games SET user_id = $1 WHERE game_id = $2 RETURNING *;",
      [receiver_id, offerer_game_id]
    );
    return [swapGameOne, swapGameTwo];
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  swapGames,
};
