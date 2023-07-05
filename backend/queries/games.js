//import the db object
const db = require("../db/dbConfig.js");

//get all users info from the database
const getAllGames = async () => {
  try {
    const allGames = await db.any("SELECT * FROM games");
    return allGames;
  } catch (error) {
    console.log(error.message);
  }
};

const getGame = async (id) => {
  try {
    const game = await db.any("SELECT * FROM games WHERE game_id=$1", id);
    return game;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUsersByGameName = async (game_name) => {
  try {
    const allUserByGameName = await db.any('SELECT game_id, user_id FROM games WHERE game_name = $1', game_name)
    return allUserByGameName
  } catch (error) {
    console.log(error.message||error)
 }

}

/// finding the game by name and reutnr 
module.exports = {
  getAllGames,
  getGame,
  getAllUsersByGameName 
};
