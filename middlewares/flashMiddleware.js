function flashMiddleware(req, res, next) {
    res.locals.success = req.flash("success");
    next()
}

module.exports = flashMiddleware
