const router = require('express')();
const api = require('../api/steamAPI');
const mw = require('../middlewares/steamMw');

// GET
router.get('/id/:appID',
    mw.sanitizeOffsetAndLimit,
    api.getGame);

router.get('/games',
    mw.sanitizeOffsetAndLimit,
    api.getGames);

router.get('/dev-pub',
    mw.sanitizeOffsetAndLimit,
    api.getGamesByDevAndPub);

router.get('/pl',
    mw.sanitizeOffsetAndLimit,
    api.getGamesByPlatform);

router.get('/pr-rate',
    mw.sanitizeOffsetAndLimit,
    api.getGamesByPriceAndRatings);

router.get('/tags',
    mw.sanitizeOffsetAndLimit,
    api.getGamesByTags);

router.get('/top-tags',
    api.getTopTagGames);

router.get('/random',
    api.getRandomGames);

// POST

// PATCH

// DELETE

module.exports = router;