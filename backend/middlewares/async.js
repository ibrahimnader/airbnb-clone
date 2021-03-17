const asyncHandler = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            console.log(1);
            next(err)
        }
    }
}

// const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = asyncHandler;