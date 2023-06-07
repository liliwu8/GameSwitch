-- step 1 incase there is a database already, drop it
DROP DATABASE IF EXISTS game_switch;

--step 2 create the db
CREATE DATABASE game_switch; 

--step 3 connect to the db
\c game_switch; 

--step 4 create the tables
--create the USERS table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email TEXT,
    user_password TEXT NOT NULL,
    user_trade_score NUMERIC,
    user_bio TEXT,
    user_location TEXT,
    user_avatar TEXT,
    user_facebook TEXT,
    user_instagram TEXT,
    user_twitch TEXT
);

--create the games table
DROP TABLE IF EXISTS games;
CREATE TABLE games(
    game_id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL,
    game_img TEXT,
    game_rating NUMERIC,
    CHECK (game_rating >= 0 AND game_rating <= 5),
    game_description TEXT,
    game_brand TEXT,
    game_console TEXT,
    user_id INTEGER NOT NULL REFERENCES users (user_id)
     ON DELETE CASCADE
);


--create the trade request table
DROP TABLE IF EXISTS tradeRequests;
CREATE TABLE tradeRequests(
    trade_id SERIAL PRIMARY KEY,
    trade_offerer_game_id INTEGER NOT NULL,
    trade_receiver_game_id INTEGER NOT NULL,
    trade_offerer_user_id INTEGER NOT NULL REFERENCES users (user_id),
    trade_receiver_user_id INTEGER NOT NULL REFERENCES users (user_id),
    trade_success TEXT DEFAULT 'pending',
    trade_complete_from_offerer BOOLEAN DEFAULT false,
    trade_complete_from_receiver BOOLEAN DEFAULT false,
    created_at DATE DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS thread;
CREATE TABLE thread(
    thread_id serial primary key, 
    thread_title text,
    thread_created Date default CURRENT_DATE, 
    thread_user_id INTEGER NOT NULL REFERENCES users (user_id),
    thread_body text not null
    );

DROP TABLE IF EXISTS post;
CREATE TABLE post(
    post_id serial primary key,
    post_content text,
    post_created Date default CURRENT_DATE,
    post_user_id INTEGER NOT NULL REFERENCES users (user_id),
    post_thread_id INTEGER NOT NULL REFERENCES thread (thread_id)
);