const jwt = require('jsonwebtoken');

function jwtTokens({user_id, first_name, last_name, email, contact_no}) {
    const user = {user_id, first_name, last_name, email, contact_no};
    const userId = user.user_id;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(user, process.env.REFRESS_TOKEN_SECRET, {expiresIn: '15d'});
    return ({accessToken, refreshToken, userId});
}

module.exports = jwtTokens;