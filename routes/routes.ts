import express from 'express';
import controller from "../controllers/userController";

const router = express.Router();

router.post('/add/user', controller.addUser);
router.get('/get/users', controller.getAllUsers);

export = router;