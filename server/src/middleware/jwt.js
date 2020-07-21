import expressJwt from 'express-jwt';

// Call the config file
import config from '../config/config.js';

// Call the user service
// import UserRepository from '../repositories/UserRepository';


export const jwt = () => {
    const secret = config.Secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/create',
            '/users/forgot',
            '/users/recovery'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await UserRepository.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

// module.exports = jwt;
