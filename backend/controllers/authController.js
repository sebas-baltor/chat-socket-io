
const authController = {}
authController.createAccount=async(req,res)=>{
    try{
        console.log(req.file);
        res.send("success update")
    }catch(err){
        res.send(err);
    }
}
authController.login=async(req,res)=>{

}

export default authController;