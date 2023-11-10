import User  from "../Models/UserModel.js"; 
import { createSecretToken }  from "../util/SecretToken.js";
import bcrypt from "bcryptjs";
 
export const Signup = async (req, res, next) => {
  try {   
    const { email, password, username, createdAt } = req.body;
    const image = req.file.originalname;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    } 
    // const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({ email, password, username, image, createdAt });

    res.status(201).json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error); 
  }
};

export const Login = async (req, res) => {
  console.log("visiting")
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect  email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    // console.log(auth)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
    //  console.log(user)
     res.status(201).json({ message: "User logged in successfully", success: true, token:token ,email_id:user.email,username:user.username});
     
  } catch (error) {
    console.error(error);
  }
};



export const profile = async(req,res,next)=>{
  const user = await User.findOne({});
  if(user){
      const params = req.query.param1;
      const thisuser = await User.findOne({email:params});
      console.log(params)
      console.log(thisuser)
      if(thisuser){
          // console.log(params)
          const pic = thisuser.image;
            //console.log("user",thisuser.email)
          //   const p = path.join(__dirname, '../uploads', `${pic}`);
          // const p = `${pic}` 
          // console.log("path",pic)       
          return res.json({pic,status:true});
      }
      else{
          return res.json({status:false})
      }
      
  }
  else{
      return res.json({status:false});
  }

}