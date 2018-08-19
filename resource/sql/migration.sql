CREATE DATABASE dungeoncrawler
    WITH
    ENCODING = 'UTF8';

-- Table: public.game

-- DROP TABLE public.game;

CREATE TABLE public.game
(
    game_id integer NOT NULL,
    turn integer NOT NULL,
    current_location integer NOT NULL,
    CONSTRAINT game_pkey PRIMARY KEY (game_id)
)
