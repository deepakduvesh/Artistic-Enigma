const { Signup, Login, profile } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const multer = require('multer');

const router = require("express").Router();
//router.post('/',userVerification)


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
module.exports = router;