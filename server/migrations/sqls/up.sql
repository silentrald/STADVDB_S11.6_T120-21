CREATE TABLE IF NOT EXISTS steam_profiles (
  appid            SERIAL        PRIMARY KEY,
  name             VARCHAR(128)  NOT NULL,  /* MAX: 106 */
  release_date     DATE          NOT NULL,
  english          BOOLEAN       NOT NULL,
  developer        VARCHAR(256)  NOT NULL,  /* MAX: 239 */
  publisher        VARCHAR(256),            /* MAX: 129 */
  platforms        VARCHAR(32)   NOT NULL,  /* MAX: 17 */
  required_age     INT           NOT NULL,
  categories       VARCHAR(512)  NOT NULL,  /* MAX: 299 */
  genres           VARCHAR(256)  NOT NULL,  /* MAX: 210 */
  achievements     INT           NOT NULL,
  positive_ratings INT           NOT NULL,
  negative_ratings INT           NOT NULL,
  steamspy_tags    VARCHAR(64)   NOT NULL,  /* MAX: 59 */
  average_playtime INT           NOT NULL,
  median_playtime  INT           NOT NULL
);

CREATE TABLE steam_details (
  appid                 SERIAL  PRIMARY KEY,
  owners                VARCHAR,
  price                 DECIMAL,
  detailed_description  VARCHAR,
  about_the_game        VARCHAR,
  short_description     VARCHAR,
  pc_requirements       VARCHAR,
  mac_requirements      VARCHAR,
  linux_requirements    VARCHAR,
  minimum               VARCHAR,
  recommended           VARCHAR,

  FOREIGN KEY(appid)  REFERENCES  steam_profiles(appid)
);

CREATE TABLE IF NOT EXISTS steam_supports (
  appid         SERIAL        PRIMARY KEY,
  website       VARCHAR(183),
  support_url   VARCHAR(349),
  support_email VARCHAR(247),

  FOREIGN KEY(appid)  REFERENCES  steam_profiles(appid)
);

CREATE TABLE IF NOT EXISTS steamspy_tags (
  appid       SERIAL  PRIMARY KEY,
  action      INT     DEFAULT 0 NOT NULL,
  multiplayer INT     DEFAULT 0 NOT NULL,
  fps         INT     DEFAULT 0 NOT NULL,
  sci_fi      INT     DEFAULT 0 NOT NULL,
  classic     INT     DEFAULT 0 NOT NULL,
  co_op       INT     DEFAULT 0 NOT NULL,
  arcade      INT     DEFAULT 0 NOT NULL,
  card_game   INT     DEFAULT 0 NOT NULL,
  drama       INT     DEFAULT 0 NOT NULL,
  puzzle      INT     DEFAULT 0 NOT NULL,
  survival    INT     DEFAULT 0 NOT NULL,
  rpg         INT     DEFAULT 0 NOT NULL,
  indie       INT     DEFAULT 0 NOT NULL,
  moba        INT     DEFAULT 0 NOT NULL,
  shooter     INT     DEFAULT 0 NOT NULL,

  FOREIGN KEY(appid)  REFERENCES  steam_profiles(appid)
);
