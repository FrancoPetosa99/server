import passport from 'passport';
import passportLocal from 'passport-local';
// import encrypt from "../util/encrypt.js";
import userService from '../services/UserService.js';
import users from '../dao/models/users.js';
import GHStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import cookieExtractor from '../util/cookieExtractor.js';

const initializePassport = ()=> {

    /********************************************************/
    //LOCAL AUTHENTICATION ESTRATEGY (USER - PASSWORD)
    /********************************************************/
    const localStrategy = passportLocal.Strategy;

    const registerStategyObj = {
        passReqToCallback: true,
        usernameField: 'email',
    }

    passport.use('register', new localStrategy(registerStategyObj, async (request, username, password, done)=> {
        
        const { firstName, lastName } = request.body;

        try{

            const newUserObj = {};

            newUserObj.firstName = firstName;
            newUserObj.lastName = lastName;
            newUserObj.email = username;
            newUserObj.password = password;


            const userCreated = await userService.createNewUser(newUserObj);

            done(null, userCreated);
            
        }catch(error){
            done(error);
        }
    }));
    
    const loginStategyObj = {
        passReqToCallback: true,
        usernameField: 'email',
    }

    passport.use('login', new localStrategy(loginStategyObj, async (request, username, password, done)=> {
        try{
            
            const user = await userService.checkEmailAndPassword(username, password);

            if(!user) return done(null, false);

            done(null, user);

        }catch(error){
            done(error);
        }
    }));

    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done)=> {
        const user = await users.findById(id);
        done(null, user);
    });


    /********************************************************/
    //THIRD PARTY AUTHENTICATION ESTRATEGY (GITHUB)
    /********************************************************/

    const GHStrategyObj = {
        clientID: 'Iv1.0cf3273a63e06ee3',
        clientSecret: 'dd50fe05fd5571fdf8f23177131731c6342836b1',
        callbackURL: 'http://localhost:8080/api/session/githubCallback'
    }

    passport.use('github', new GHStrategy(GHStrategyObj, async (accessToken, refreshToken, profile, done)=> {
        try{
         
            const { email, name } = profile._json;

            const user = await users.findOne({email: email});

            if(!user){

                const newUserData = {};
                newUserData.email = email;
                newUserData.firstName = name;
                newUserData.lastName = ''; //lastName is not provided by GitHub
                newUserData.password = 'created with GH'; //password is never granted by GitHub

                const newUser = await userService.createNewUserByThird(newUserData);

                return done(null, newUser);
            }

            done(null, user);

        }catch(error){
            done(error);
        }
    }));

    /********************************************************/
    //JWT AUTHENTICATION ESTRATEGY (USER - PASSWORD)
    /********************************************************/
    const JWTStrategy = jwt.Strategy;
    const extractJWT = jwt.ExtractJwt;

    const JWTStrategyObj = {
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'JWT_SECRET_KEY'
    }

    passport.use('jwt', new JWTStrategy(JWTStrategyObj, async (jwtPayload, done)=> {
        try{
            done(null, jwtPayload);
        }catch(error){
            done(error);
        }
    }));
}

export default initializePassport;