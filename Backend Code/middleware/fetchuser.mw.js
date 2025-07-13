const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    const token = req.header("auth_token")
    if (!token) {
        res.status(401).send({ error: "Please authenticate using correct token" })
    }

    try {
        const data = jwt.verify(token, "Sahil")
        req.user = data.user
        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).send({ error: "Server error while authenticating" })
    }
}

module.exports = fetchUser;