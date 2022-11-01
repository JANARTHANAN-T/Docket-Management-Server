const Document = require("../models/document.js");
const User = require("../models/user.js");
const SubDocument =require("../models/subDocument.js");
const Image =require("../models/image.js");

module.exports.getDocument = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById( user_id ).populate("document").populate("received");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
};

module.exports.getShared = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById( user_id ).populate("received");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
};

module.exports.addDocument = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(req.body)
    const document = new Document({ ...req.body });
    const user = await User.findById(user_id);
    user.document.push(document._id);
    await document.save();
    await user.save();
    const userDocs = await User.findById( user_id ).populate("document");
    res.status(200).json(userDocs);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.showDocument = async (req, res) => {
  try {
    const { doc_id } = req.params;
    const document = await Document.findById(doc_id).populate('subDocument');
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.addSubDocument = async (req,res) => {
  try{
    const {doc_id} = req.params;
    const document = await Document.findById(doc_id)
    const subDocument = new SubDocument({ ...req.body });
    document.subDocument.push(subDocument._id)
    await document.save()
    await subDocument.save()
    const Doc=await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc);
  }
  catch(err){
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports.editContent = async (req,res) =>{
  try{
    const {doc_id,sub_id}=req.params
    const {content}=req.body
    const sub = await SubDocument.findOneAndUpdate({_id:sub_id},{content:content})
    sub.save()
    const Doc=await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.addImage = async(req,res)=>{
  try{
    const {doc_id,sub_id}=req.params
    const image=new Image({...req.body})
    const subDocument=await SubDocument.findById(sub_id)
    subDocument.image.push(image._id)
    await image.save()
    await subDocument.save()
    const Doc=await SubDocument.findById(sub_id).populate('image')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.getImage = async(req,res)=>{
  try{
    const {doc_id,sub_id}=req.params
    const Doc=await SubDocument.findById(sub_id).populate('image')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports.deleteSubDoc = async(req,res) =>{
  try{
    const {doc_id,sub_id}=req.params
    const document = await Document.findById(doc_id)
    await document.subDocument.pop(sub_id)
    await SubDocument.deleteOne({_id:sub_id})
    
    const Doc=await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}

module.exports.deleteDoc = async(req,res) =>{
  try{
    const {doc_id,u_id}=req.params  
    console.log(doc_id,u_id);
    const user = await User.findById(u_id)
    await user.document.pop(doc_id)
    await Document.deleteOne({_id:doc_id})
    res.status(200).json({msg:"success"})
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}

module.exports.editSubDoc = async(req,res) =>{
  try{
    const {doc_id,sub_id}=req.params
    const {name}=req.body
    const sub = await SubDocument.findOneAndUpdate({_id:sub_id},{name:name})
    sub.save()
    const Doc =await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}

module.exports.editDoc = async(req,res) =>{
  try{
    const {doc_id}=req.params
    const {name,description}=req.body
    const sub = await Document.findOneAndUpdate({_id:doc_id},{name:name, description:description})
    sub.save()
    const Doc =await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}

module.exports.deleteImage = async(req,res)=>{
  try{
    const {image_id,sub_id,doc_id}=req.params
    console.log(image_id,sub_id,doc_id)
    const subdoc= await SubDocument.findById(sub_id)
    await subdoc.image.pop(sub_id)
    await Image.deleteOne({_id:image_id})
    const Doc=await Document.findById(doc_id).populate('subDocument')
    res.status(200).json(Doc)
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}

module.exports.sharedoc = async(req,res)=>{
  try{
    const {doc_id}=req.params
    const {email}=req.body
    const  to = await User.findOne({email}) 
    await to.received.push(doc_id)
    await to.save()
    res.status(200).json({msg:"success"})
  }catch(err){
    res.status(500).json({msg: "Internal Server Error"}) 
  }
}