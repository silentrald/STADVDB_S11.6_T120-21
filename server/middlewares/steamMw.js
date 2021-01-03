const steamMw = {
    sanitizeOffsetAndLimit: (req, _res, next) => {
        const {
            offset,
            limit
        } = req.query;

        req.query.offset =  (
            typeof(offset) === 'number' &&
            offset > -1
        ) ? offset : 0;

        req.query.limit = (
            typeof(limit) === 'number' &&
            limit < 1000
        ) ? limit : 100;

        next();
    }
};

module.exports = steamMw;