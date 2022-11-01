const express=require('express')
const router=express.Router();
const {getDocument,addDocument,showDocument,addSubDocument,editContent,removeReceived,addImage,getImage,deleteSubDoc,editDoc,editSubDoc,deleteDoc, deleteImage, sharedoc, getShared}=require('../controllers/document.js')

router.get('/:user_id',getDocument)
router.post('/:user_id/adddocs',addDocument)
router.get("/docs/:doc_id",showDocument)
router.post("/docs/:doc_id/add",addSubDocument)
router.post("/docs/:doc_id/:sub_id",editContent)
router.post("/image/:doc_id/:sub_id",addImage)
router.get("/image/:doc_id/:sub_id/:image_id",deleteImage)
router.get("/image/:doc_id/:sub_id",getImage)
router.get("/docs/:doc_id/:sub_id",deleteSubDoc)
router.put("/docs/:doc_id/",editDoc)
router.post("/docs/:doc_id/:sub_id/edit",editSubDoc)
router.get("/docs/:doc_id/delete/:u_id",deleteDoc)
router.post("/share/:doc_id/",sharedoc)
router.get("/share/:user_id/",getShared)
router.get("/remove/:user_id/:doc_id",removeReceived)


module.exports=router