import express from 'express';
import userController from "../controllers/userController";
import locationController from "../controllers/locationController";

const router = express.Router();

router.post('/add/user', userController.addUser);
router.get('/get/users', userController.getAllUsers);
router.get('/get/location', locationController.getAllLocations);

export = router;
