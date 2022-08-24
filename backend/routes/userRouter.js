const express = require('express'); 
const { isadmin, getUser,blockUser,UnblockUser, getCompanys,approve } = require('../controller/adminControler');
const {registerUser, authUser,adduser} = require('../controller/userController')
const router = express.Router()
router.get('/',(req,res)=>{
    res.send("hello")
})
router.post("/login",authUser);
router.post("/signup",registerUser);
router.post('/admin/login',isadmin)
router.get('/admin/manageusers',getUser)
router.patch('/admin/blockUser',blockUser)
router.patch('/admin/UnBlockUser',UnblockUser)
router.post('/add-company',adduser)
router.get('/admin/applicationlist',getCompanys)
router.post('/admin/approve',approve)


module.exports = router