const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const grivController=require( "../controllers/grievance");
const auth=require('../middleware/authorization');
const hrAuth=require('../middleware/hrAuth');
const grievanceJoi=require('../middleware/joi/grievance');
const userJoi=require('../middleware/joi/user')


// create a new user
router.post("/user",userJoi.createUser, controller.createUser);
// login user using email and password
router.post("/user/login",userJoi.loginUser, controller.loginUser);


//grievance  related routes

//add a new  grievance 
router.post('/grievance',auth,grievanceJoi.createGrievance,grivController.createGrievance);

//view  all the grievances by hr
router.get('/grievance/all',auth,grivController.getGrievance);

//update status of the grievance
router.put('/grievance',auth,hrAuth,grievanceJoi.updateGrievance,grivController.updateGrievance);

//chat routes

router.post('/chat/:grievanceId',auth,grivController.chatCreate);

router.get('/chat/:grievanceId',auth,grivController.chatView);

module.exports = router;
