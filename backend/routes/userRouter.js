const express = require('express'); 
const { isadmin, getUser,blockUser,UnblockUser, getCompanys,approve ,decline, approvedlist, declinedlist, addroom, getrooms, asignslot, viewdata} = require('../controller/adminControler');
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
router.post('/admin/decline',decline)
router.get('/admin/approvedlist',approvedlist)
router.get('/admin/declinedlist',declinedlist)
router.post('/admin/addroom',addroom)
router.get('/admin/bookslot',getrooms)
router.post('/admin/asignslot',asignslot)
router.post('/admin/viewdata',viewdata)


module.exports = router