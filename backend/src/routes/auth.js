import express from 'express';
import { Signin, Signout, Signup } from '../controllers/auth.js';

const router = express.Router();


router.post('/signup',Signup);
router.post('/signin',Signin);
router.post('/signout',Signout);
export default router