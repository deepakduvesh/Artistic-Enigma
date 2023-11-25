import  { Signup, Login, profile } from "../Controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import multer from 'multer';
import express from "express"

const router = express.Router();


const storage = multer.diskStorage({
    destination: "./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({storage})

router.post("/signup",upload.single('photo'), Signup);
router.post("/login", Login);

router.post('/',userVerification)
router.get("/profile",profile)

export default router