const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expiresIn) => {
    if (typeof payload != 'object' || !payload)
        throw new Error('payload must be a non-empty object');
    if (typeof secretKey != 'string' || !secretKey)
        throw new Error('secretKey must be a non-empty object');

    try {
        const token = jwt.sign(payload, secretKey, { expiresIn:expiresIn });
        return token;
    } catch (errorResponse) {
        console.error('Failed to sign the JWT:', err);
        throw errorResponse;
    }
}

module.exports = { createJSONWebToken };