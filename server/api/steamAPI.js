const db = require('../db');

const steamAPI = {
    // GET
    /**
     * Gets a game by the passed id
     */
    getGame: async (req, res) => {
        let {
            appID
        } = req.params;

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        (
                            SELECT  *
                            FROM    steam_profiles
                            WHERE   appid=$1
                        ) AS profiles
                        JOIN    (
                            SELECT  *
                            FROM    steam_details
                            WHERE   appid=$1
                        ) AS details    ON  profiles.appid=details.appid
                        JOIN    (
                            SELECT  *
                            FROM    steam_support_data
                            WHERE   appid=$1
                        ) AS supports   ON  profiles.appid=supports.appid
                        JOIN    (
                            SELECT  *
                            FROM    steamspy_tag_data
                            WHERE   appid=$1
                        ) AS tags       ON  profiles.appid=tags.appid
                    LIMIT       1;
                `,
                values: [ appID ]
            };

            const { rows: games, rowCount } = await db.query(query);
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ game: games[0] });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets games depending on the filter options given
     */
    // TODO: fix this
    getGames: async (req, res) => {
        let {
            name,
            offset,
            limit
        } = req.query;

        name = name ? `${name}%` : '%';

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        steam_profiles
                    WHERE       name        ILIKE $1
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [ name ]
            };
            
            // TODO: Get time here
            const { rows: games, rowCount } = await db.query(query);
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    getGamesByDevAndPub: async (req, res) => {
        let {
            publisher,
            developer,
            offset,
            limit
        } = req.query;

        publisher = publisher ? `${publisher}%` : '%';
        developer = developer ? `${developer}%` : '%';

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        steam_profiles
                    WHERE       developer   ILIKE $1
                        OR      publisher   ILIKE $2
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [
                    developer,
                    publisher
                ]
            };
            
            // TODO: Get time here
            const { rows: games, rowCount } = await db.query(query);
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    getGamesByPlatform: async (req, res) => {
        let {
            platform,
            offset,
            limit
        } = req.query;

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        steam_profiles
                    WHERE       platform    ILIKE $1
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [ platform ]
            };
            
            // TODO: Get time here
            const { rows: games, rowCount } = await db.query(query);
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets games depending on price and rating
     */
    getGamesByPriceAndRatings: async (req, res) => {
        const {
            priceL,
            priceH,
            ratings,
            offset,
            limit
        } = req.query;

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        (
                            SELECT  *
                            FROM    steam_details
                            WHERE   price   BETWEEN $1 AND $2    
                        ) AS details
                        JOIN    (
                            SELECT  *
                            FROM    steam_profiles
                            WHERE   positive_ratings - negative_ratings > $3
                        ) AS profiles   ON details.appid=profiles.appid
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [
                    priceL,
                    priceH,
                    ratings
                ]
            };
            
            // TODO: Get time here
            const { rows: games, rowCount } = await db.query(query);
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets games by tags given
     */
    getGamesByTags: async (req, res) => {
        let {
            tags,
            offset,
            limit
        } = req.query;

        try {
            if (typeof(tags) === 'string') {
                tags = [ tags ];
            }

            let text = `
                SELECT      *
                FROM        steam_profiles
                    JOIN    (
                        SELECT  *
                        FROM    steamspy_tag_data
            `;
            
            for (const index in tags) {
                // WHERE action > 0 | OR action > 0
                text += `${index === 0 ? 'WHERE' : 'OR'} ${tags[index]} > 0\n`;
            }

            text += `
                ) as tags   ON appid=steam_appid
                ORDER BY    appid
                OFFSET  ${offset}
                LIMIT   ${limit};
            `;

            // TODO: Get time here
            const { rows: games } = await db.query(text);

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    getTopTagGames: async (_req, res) => {
        try {
            let query = `
                SELECT      *
                FROM        steam_profiles AS profiles
                    JOIN    (
                        SELECT      *
                        FROM        steamspy_tag_data
                            JOIN    (
                                SELECT      MAX(action)         AS max_action,
                                            MAX(multiplayer)    AS max_multiplayer,        
                                            MAX(fps)            AS max_fps,
                                            MAX(sci_fi)         AS max_sci_fi,
                                            MAX(classic)        AS max_classic,    
                                            MAX(co_op)          AS max_co_op,
                                            MAX(arcade)         AS max_arcade,
                                            MAX(card_game)      AS max_card_game,    
                                            MAX(drama)          AS max_drama,
                                            MAX(puzzle)         AS max_puzzle,
                                            MAX(survival)       AS max_survival,    
                                            MAX(rpg)            AS max_rpg,
                                            MAX(indie)          AS max_indie,
                                            MAX(moba)           AS max_moba,
                                            MAX(shooter)        AS max_shooter
                                FROM        steamspy_tag_data
                                GROUP BY    appid
                            ) as top_tags
                                ON  max_action=action
                                OR  max_multiplayer=multiplayer
                                OR  max_fps=fps
                                OR  max_sci_fi=sci_fi
                                OR  max_classic=classic
                                OR  max_co_op=co_op
                                OR  max_arcade=arcade
                                OR  max_card_game=card_game
                                OR  max_drama=drama
                                OR  max_puzzle=puzzle
                                OR  max_survival=survival
                                OR  max_rpg=rpg
                                OR  max_indie=indie
                                OR  max_moba=moba
                                OR  max_shooter=shooter
                    ) as top_ids    ON  profiles.appid=top_ids.appid
                    JOIN    steam_details AS details
                                    ON  profiles.appid=details.appid;
            `;

            const { rows: games } = await db.query(query);

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets a random list of games
     */
    getRandomGames: async (req, res) => {
        let { limit } = req.query;

        limit = (limit && limit < 1000) ? limit : 100;

        try {
            const querySelGames = {
                text: `
                    SELECT      *
                    FROM        steam_profiles
                    WHERE       random() < 0.7
                    ORDER BY    random()
                    LIMIT       ${limit};
                `
            };

            const { rows: games } = await db.query(querySelGames);

            return res.status(200).send({ games });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    }
};

module.exports = steamAPI;