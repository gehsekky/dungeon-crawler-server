CREATE DATABASE dungeoncrawler
    WITH
    ENCODING = 'UTF8';

CREATE TABLE game
(
    game_id bigint NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (game_id)
);

CREATE TABLE `attribute` (
  `attribute_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('health', 'the hit points of a person or thing.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('mana', 'mana ponts of person or thing.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('weight', 'the weight (in pounds) of a person or thing.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('strength', 'strength of person or thing. useful for physical tasks such as melee combat.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('intelligence', 'the mental strength of a player or object. this is useful for mental feats such as magic.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('defense', 'the resistance to damage of a person or thing.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('endurance', 'how much a player or thing can do until they get tired.');
INSERT INTO `dungeon_crawler`.`attribute` (`name`, `description`) VALUES ('attack', 'how much a weapon will hit a target for');

CREATE TABLE room_type (
  room_type_id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(1024) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (room_type_id)
);

CREATE TABLE room
(
    room_id bigint NOT NULL auto_increment,
    game_id bigint NOT NULL,
    location_x integer NOT NULL,
    location_y integer NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    room_type_id bigint NOT NULL,
    PRIMARY KEY (room_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id),
    FOREIGN KEY (room_type_id) REFERENCES room_type(room_type_id)
);

CREATE TABLE move
(
    move_id bigint NOT NULL auto_increment,
    game_id bigint NOT NULL,
    action varchar(64) NOT NULL,
    story_base text NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    turn integer NOT NULL,
    room_id bigint NOT NULL,
    is_first_visit boolean NOT NULL DEFAULT true,
    PRIMARY KEY (move_id),
    UNIQUE (game_id, move_id),
    FOREIGN KEY (game_id) REFERENCES game (game_id),
    FOREIGN KEY (room_id) REFERENCES room (room_id)
);

CREATE TABLE party_member
(
    party_member_id bigint NOT NULL auto_increment,
    name varchar(1024) NOT NULL,
    game_id bigint NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (party_member_id),
    FOREIGN KEY (game_id) REFERENCES game (game_id)
);

CREATE TABLE party_member_attribute
(
    party_member_id bigint NOT NULL,
    attribute_id bigint NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    value integer NOT NULL,
    PRIMARY KEY (party_member_id, attribute_id),
    FOREIGN KEY (attribute_id) REFERENCES attribute (attribute_id),
    FOREIGN KEY (party_member_id) REFERENCES party_member (party_member_id)
);

CREATE TABLE item_type
(
    item_type_id bigint NOT NULL auto_increment,
    name varchar(1024) NOT NULL,
    description text NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (item_type_id)
);

INSERT INTO `dungeon_crawler`.`item_type` (`name`, `description`, `created_at`, `updated_at`) VALUES ('weapon', 'anything used to attack another person or thing.', now(), now());
INSERT INTO `dungeon_crawler`.`item_type` (`name`, `description`, `created_at`, `updated_at`) VALUES ('armor', 'anything used to mitigate damage', now(), now());
INSERT INTO `dungeon_crawler`.`item_type` (`name`, `description`, `created_at`, `updated_at`) VALUES ('consumable', 'anything that is consumed for some effect', now(), now());

CREATE TABLE item
(
    item_id bigint NOT NULL auto_increment,
    name varchar(1024) NOT NULL,
    item_type_id bigint NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_type_id) REFERENCES item_type (item_type_id)
);

INSERT INTO `dungeon_crawler`.`item` (`name`, `item_type_id`, `created_at`, `updated_at`) VALUES ('simple sword', '1', now(), now());

CREATE TABLE item_type_attribute
(
    item_type_id bigint NOT NULL,
    attribute_id bigint NOT NULL,
    default_value integer NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    CONSTRAINT item_type_attribute_pkey PRIMARY KEY (item_type_id, attribute_id),
    FOREIGN KEY (attribute_id) REFERENCES attribute (attribute_id),
    FOREIGN KEY (item_type_id) REFERENCES item_type (item_type_id)
);

insert into item_type_attribute (item_type_id, attribute_id, default_value, created_at, updated_at) values (1, 3, 1, now(), now());
insert into item_type_attribute (item_type_id, attribute_id, default_value, created_at, updated_at) values (1, 8, 3, now(), now());

CREATE TABLE item_attribute
(
    item_id bigint NOT NULL,
    attribute_id bigint NOT NULL,
    value integer NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (item_id, attribute_id),
    FOREIGN KEY (attribute_id) REFERENCES attribute (attribute_id),
    FOREIGN KEY (item_id) REFERENCES item (item_id)
);

insert into item_attribute (item_id, attribute_id, value, created_at, updated_at) values (1, 3, 1, now(), now());
insert into item_attribute (item_id, attribute_id, value, created_at, updated_at) values (1, 8, 3, now(), now());

CREATE TABLE party_member_item
(
    party_member_id bigint NOT NULL,
    item_id bigint NOT NULL,
    quantity integer NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (party_member_id, item_id),
    FOREIGN KEY (item_id) REFERENCES item (item_id),
    FOREIGN KEY (party_member_id) REFERENCES party_member (party_member_id)
);

CREATE TABLE enemy_type (
  enemy_type_id BIGINT(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (enemy_type_id));

CREATE TABLE `enemy_type_attribute` (
  `enemy_type_id` bigint(20) NOT NULL,
  `attribute_id` bigint(20) NOT NULL,
  `default_value` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`enemy_type_id`,`attribute_id`),
  KEY `fk_enemy_type_attribute_attribute_id_idx` (`attribute_id`),
  CONSTRAINT `fk_enemy_type_attribute_attribute_id` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_enemy_type_attribute_enemy_type_id` FOREIGN KEY (`enemy_type_id`) REFERENCES `enemy_type` (`enemy_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `dungeon_crawler`.`enemy` (
  `enemy_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(2048) NOT NULL,
  `enemy_type_id` BIGINT(20) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`enemy_id`),
  INDEX `fk_enemy_enemy_type_id_idx` (`enemy_type_id` ASC),
  CONSTRAINT `fk_enemy_enemy_type_id`
    FOREIGN KEY (`enemy_type_id`)
    REFERENCES `dungeon_crawler`.`enemy_type` (`enemy_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `dungeon_crawler`.`enemy_attribute` (
  `enemy_id` BIGINT(20) NOT NULL,
  `attribute_id` BIGINT(20) NOT NULL,
  `value` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`enemy_id`, `attribute_id`),
  INDEX `fk_enemy_attribute_attribute_id_idx` (`attribute_id` ASC),
  CONSTRAINT `fk_enemy_attribute_enemy_id`
    FOREIGN KEY (`enemy_id`)
    REFERENCES `dungeon_crawler`.`enemy` (`enemy_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enemy_attribute_attribute_id`
    FOREIGN KEY (`attribute_id`)
    REFERENCES `dungeon_crawler`.`attribute` (`attribute_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
