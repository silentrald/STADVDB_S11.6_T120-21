const steamMw = {
    sanitizeOffsetAndLimit: (req, _res, next) => {
        const {
            offset,
            limit
        } = req.query;

        req.query.offset =  (
            !isNaN(offset) &&
            offset > -1
        ) ? offset : 0;

        req.query.limit = (
            limit === 'ALL' || 
            !isNaN(limit) && limit < 1000
        ) ? limit : 100;

        next();
    }
};

module.exports = steamMw;