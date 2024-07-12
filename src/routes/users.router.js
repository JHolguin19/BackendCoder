import { Router } from 'express';
import { checkAuth } from '../middlewares/authJwt.js';
import UserController from '../controllers/users.controllers.js';
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', checkAuth, controller.profile);

router.get('/profile-cookies', passport.authenticate('jwtCookies'), (req, res)=>res.json(req.user));


export default router;