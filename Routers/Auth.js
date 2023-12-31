const express=require("express")
const router=express.Router();
const usermodel = require("../Models/User")
const JWT_SECRET ="yadgshdgjfrurfg"
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

router.post("/register", async (req, res) => {                                // http://localhost:5000/api/v3/register
    const { name, email,password,phone} = req.body
 
    if (!validator.isEmail(email)  || !validator.isLength(email, { min: 3, max: 320 })) {
        return res.status(400).send({
            success: false,
            message: "Invalid email"
        });
    }
    if(!validator.isLength(phone,{min:10,max:10})){
        return res.status(400).send({
            success: false,
            message: "Phone number should be 10 digits"
        });
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).send({
            success: false,
            message: "password shoul be at least 6 digits"
        });
    }
    const suser = await usermodel.findOne({ email })
    if (suser) {
        return res.status(400).send({
            success: false,
            message: "user already exist"
        })
    }

        const hashedpass = await bcrypt.hash(password, 10)
        const user = new usermodel({ name, email,  password: hashedpass,phone});
        const userd = await user.save();
        return res.status(200).send({
            success: true,
            message: "done",
            user: userd,
            

        })
    

    }

);

router.post("/login", async (req, res) => {               // http://localhost:5000/api/v3/login
    try {
        const { password, email } = req.body;
        //validation
        if (!password | !email) {
            return res.status(401).send({
                success: false,
                message: "Please provide  password",
            });
        }
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invlid email  or password",
            });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "7d"
        });
        return res.status(200).send({
            success: true,
            messgae: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                Enroll: user.Enroll,
                password: user.password,
                phone:user.phone,
                department:user.department,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error,
        });
    }
}
);



module.exports=router