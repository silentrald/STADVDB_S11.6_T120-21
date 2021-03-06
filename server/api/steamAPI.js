const db = require('../db');

const timeExecution = async (promise) => {
    const start = new Date();
    const result = await promise;
    const time = new Date() - start;
    return { result, time };
};

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
                            FROM    steam_supports
                            WHERE   appid=$1
                        ) AS supports   ON  profiles.appid=supports.appid
                        JOIN    (
                            SELECT  *
                            FROM    steamspy_tags
                            WHERE   appid=$1
                        ) AS tags       ON  profiles.appid=tags.appid
                    LIMIT       1;
                `,
                values: [ appID ]
            };
            
            const { result, time } = await timeExecution(db.query(query));
            const { rows: games, rowCount } = result;
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ game: games[0], time });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets games depending on the filter options given
     */
    getGames: async (req, res) => {
        let {
            offset,
            limit
        } = req.query;

        try {
            const query = `
                SELECT      *
                FROM        steam_profiles
                ORDER BY    appid
                OFFSET      ${offset}
                LIMIT       ${limit};
            `;

            const { result, time } = await timeExecution(db.query(query));
            const { rows: games, rowCount } = result;
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
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
                        AND     publisher   ILIKE $2
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [
                    developer,
                    publisher
                ]
            };
            
            const { result, time } = await timeExecution(db.query(query));
            const { rows: games, rowCount } = result;
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
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

        platform = typeof(platform) === 'string'
            ? `%${platform}%` : '%';

        try {
            const query = {
                text: `
                    SELECT      *
                    FROM        steam_profiles
                    WHERE       platforms ILIKE $1
                    ORDER BY    appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [ platform ]
            };
            
            const { result, time } = await timeExecution(db.query(query));
            const { rows: games, rowCount } = result;
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
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
            limit,
            query: type
        } = req.query;

        let ratingsL, ratingsH;
        switch(ratings) {
        case 'opos':
            ratingsH = 100;
            ratingsL = 95;
            break;
        case 'vpos':
            ratingsH = 94;
            ratingsL = 80;
            break;
        case 'mpos':
            ratingsH = 79;
            ratingsL = 70;
            break;
        case 'pos':
            ratingsH = 100;
            ratingsL = 70;
            break;
        case 'mix':
            ratingsH = 69;
            ratingsL = 40;
            break;
        case 'mneg':
            ratingsH = 39;
            ratingsL = 20;
            break;
        case 'vneg':
            ratingsH = 19;
            ratingsL = 0;
        }

        try {
            const query = type === 'op' ? {
                text: `
                    SELECT      *
                    FROM        (
                            SELECT  *
                            FROM    steam_details
                            WHERE   price   BETWEEN $1 AND $2
                        ) details
                        JOIN    (
                            SELECT  *,
                                    (positive_ratings * 100 / (positive_ratings + negative_ratings)) AS true_rating
                            FROM    steam_profiles
                            WHERE   positive_ratings + negative_ratings > 0
                        ) profiles      ON  details.appid=profiles.appid
                                        AND true_rating BETWEEN $3 AND $4
                    ORDER BY    details.appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [
                    priceL,
                    priceH,
                    ratingsL,
                    ratingsH
                ]
            } : {
                text: `
                    SELECT      *
                    FROM        steam_details details
                        JOIN    (
                            SELECT  *
                            FROM    steam_profiles
                            WHERE   positive_ratings + negative_ratings > 0
                                AND (positive_ratings * 100 / (positive_ratings + negative_ratings)) BETWEEN $1 AND $2
                    ) profiles  ON  details.appid=profiles.appid
                    WHERE    price    BETWEEN $3 AND $4
                    ORDER BY    details.appid
                    OFFSET      ${offset}
                    LIMIT       ${limit};
                `,
                values: [
                    ratingsL,
                    ratingsH,
                    priceL,
                    priceH
                ]
            };
            
            const { result, time } = await timeExecution(db.query(query));
            const { rows: games, rowCount } = result;
            if (rowCount === 0) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
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
            limit,
            query: type
        } = req.query;

        try {
            if (typeof(tags) === 'string') {
                tags = [ tags ];
            }

            let text = type === 'op' ? `
                SELECT      *
                FROM        steam_profiles profiles
                    JOIN    (
                        SELECT  *
                        FROM    steamspy_tags
            ` : `
                SELECT      *
                FROM        steam_profiles profiles
                    JOIN    steamspy_tags tags
                        ON  profiles.appid=tags.appid
            `;
            
            for (const index in tags) {
                // WHERE action === 0 | OR action > 0
                text += `${index === '0' ? 'WHERE' : 'OR'} ${tags[index]} > 0\n`;
            }

            if (type === 'op') {
                text += ') tags   ON profiles.appid=tags.appid\n';
            }

            text += `
                ORDER BY    profiles.appid
                OFFSET      ${offset}
                LIMIT       ${limit};
            `;

            const { result, time } = await timeExecution(db.query(text));
            const { rows: games } = result;

            return res.status(200).send({ games, time });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    /**
     * Gets the top from each tags
     */
    getTopTagGames: async (req, res) => {
        const { query: type } = req.query;
        try {
            let query = type === 'op' ? `
                SELECT      *
                FROM        steam_profiles profiles
                    JOIN    (
                        SELECT      *
                        FROM        steamspy_tags
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
                                FROM        steamspy_tags
                            ) top_tags
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
                    ) top_ids       ON  profiles.appid=top_ids.appid
                    JOIN    steam_details AS details
                                    ON  profiles.appid=details.appid;
            ` : `
            SELECT      *
            FROM        (
                SELECT  *
                FROM    steam_profiles
                WHERE   appid IN (
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(action) AS max_action
                            FROM        steamspy_tags
                        ) t_action      ON    max_action=action
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(multiplayer) AS max_multiplayer
                            FROM        steamspy_tags
                        ) t_multiplayer     ON    max_multiplayer=multiplayer
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(fps) AS max_fps
                            FROM        steamspy_tags
                        ) t_fps         ON    max_fps=fps
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(sci_fi)         AS max_sci_fi
                            FROM        steamspy_tags
                        ) t_sci_fi      ON    max_sci_fi=sci_fi
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(classic) AS max_classic
                            FROM        steamspy_tags
                        ) t_classic     ON    max_classic=classic
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(co_op) AS max_co_op
                            FROM        steamspy_tags
                        ) t_co_op       ON    max_co_op=co_op
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(arcade) AS max_arcade
                            FROM        steamspy_tags
                        ) as t_arcade   ON    max_arcade=arcade
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(card_game) AS max_card_game
                            FROM        steamspy_tags
                        ) t_card_game   ON    max_card_game=card_game
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(drama) AS max_drama
                            FROM        steamspy_tags
                        ) t_drama       ON    max_drama=drama
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(puzzle) AS max_puzzle
                            FROM        steamspy_tags
                        ) t_puzzle      ON    max_puzzle=puzzle
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(survival) AS max_survival
                            FROM        steamspy_tags
                        ) t_survival    ON    max_survival=survival
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT  MAX(rpg) AS max_rpg
                            FROM    steamspy_tags
                        ) t_rpg     ON    max_rpg=rpg
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT  MAX(indie) AS max_indie
                            FROM    steamspy_tags
                        ) t_indie   ON    max_indie=indie
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT  MAX(moba) AS max_moba
                            FROM    steamspy_tags
                        ) t_moba    ON    max_moba=moba
                        LIMIT 1
                    )
                    UNION
                    (
                        SELECT      appid
                        FROM        steamspy_tags
                        JOIN        (
                            SELECT      MAX(shooter) AS max_shooter
                            FROM        steamspy_tags
                        ) t_shooter     ON    max_shooter=shooter
                        LIMIT 1
                    )
                )
            ) profiles
                JOIN    steam_details AS details    ON    details.appid=profiles.appid;
            `;

            const { result, time } = await timeExecution(db.query(query));
            const { rows: games } = result;

            return res.status(200).send({ games, time });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    getTopRatedTags: async (req, res) => {
        const {
            tag,
            query: type
        } = req.query;

        console.log(tag);

        try {
            const text = type === 'op' ? `
                SELECT  *
                FROM    (
                    SELECT      year,
                                MAX(ratings) AS max_ratings
                    FROM        (
                        SELECT      *,
                                    EXTRACT(YEAR FROM release_date) AS year,
                                    (positive_ratings - negative_ratings) AS ratings
                        FROM        steam_profiles
                            JOIN    (
                                SELECT  *
                                FROM    steamspy_tags
                                WHERE   ${tag} > 0
                            ) tags ON steam_profiles.appid=tags.appid
                        WHERE       release_date > date '2014-01-01'
                    ) years
                    GROUP BY    year
                ) max_ratings
                    JOIN    steam_profiles profiles
                        ON  max_ratings.max_ratings = profiles.positive_ratings - profiles.negative_ratings
                        AND max_ratings.year = EXTRACT(YEAR FROM profiles.release_date)
                    JOIN    steam_details   details
                        ON  details.appid=profiles.appid;
            ` : `
                SELECT  *
                FROM    (
                    SELECT      year,
                                MAX(positive_ratings - negative_ratings) AS max_ratings
                    FROM        (
                        SELECT      *,
                                    EXTRACT(YEAR FROM release_date) AS year
                        FROM        steam_profiles
                            JOIN    (
                                SELECT  *
                                FROM    steamspy_tags
                                WHERE   ${tag} > 0
                            ) tags ON steam_profiles.appid=tags.appid
                        WHERE       EXTRACT(YEAR FROM release_date) > 2014
                    ) years
                    GROUP BY    year
                ) max_ratings
                    JOIN    steam_profiles profiles
                        ON  max_ratings.max_ratings = profiles.positive_ratings - profiles.negative_ratings
                        AND max_ratings.year = EXTRACT(YEAR FROM profiles.release_date)
                    JOIN    steam_details   details
                        ON  details.appid=profiles.appid;
            `;

            const { result, time } = await timeExecution(db.query(text));
            const { rows: games, rowCount } = result;
            if (rowCount < 1) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
        } catch (err) {
            console.log(err);

            return res.status(500).send();
        }
    },

    getMostPlayedGamesByTag: async (req, res) => {
        const {
            tag,
            query: type
        } = req.query;

        try {
            const text = type === 'op' ? `
                SELECT      profiles2.appid,
                            name, 
                            profiles2.platforms,
                            price,
                            website
                FROM        (
                    SELECT      platforms,
                                MAX(average_playtime) as max_playtime
                    FROM        (
                        SELECT      *
                        FROM        steamspy_tags
                        WHERE       ${tag} > 0
                    ) tags
                    JOIN    steam_profiles profiles
                        ON  tags.appid=profiles.appid
                    GROUP BY    platforms
                ) max_playtime
                    JOIN        steam_profiles profiles2
                        ON      profiles2.average_playtime=max_playtime.max_playtime
                        AND     profiles2.platforms=max_playtime.platforms
                    JOIN        steam_details details
                        ON      profiles2.appid=details.appid
                    JOIN        steam_supports supports
                        ON      profiles2.appid=supports.appid;
            ` : `
                SELECT      profiles2.appid,
                            name, 
                            profiles2.platforms,
                            price,
                            website
                FROM        (
                    SELECT      platforms,
                                MAX(average_playtime) as max_playtime
                    FROM        (
                        SELECT      *
                        FROM        steamspy_tags tags
                            JOIN    steam_profiles profiles
                                ON  tags.appid=profiles.appid
                        WHERE       ${tag} > 0
                    ) tag_profs_in
                    GROUP BY    platforms
                ) max_playtime
                    JOIN        steam_profiles profiles2
                        ON      profiles2.average_playtime=max_playtime.max_playtime
                        AND     profiles2.platforms=max_playtime.platforms
                    JOIN        steam_details details
                        ON      profiles2.appid=details.appid
                    JOIN        steam_supports supports
                        ON      profiles2.appid=supports.appid;
            `;

            const { result, time } = await timeExecution(db.query(text));
            const { rows: games, rowCount } = result;
            if (rowCount < 1) {
                return res.status(404).send();
            }

            return res.status(200).send({ games, time });
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