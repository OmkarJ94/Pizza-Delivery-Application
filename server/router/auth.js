const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const order = require("../schema/orders");
const nodemailer = require('nodemailer');
const user = require("../schema/userSchema");
const otp = require('../schema/Otp')
const pizzalist = require("../schema/pizzalist");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const hbs = require("nodemailer-express-handlebars")
const path = require("path");
const { extname } = require("path");

var razorpaya = new Razorpay({
    key_id: process.env._KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, password, cpassword, address } =
            req.body;
        if (
            !name ||
            !email ||
            !phone ||

            !password ||
            !cpassword ||
            !address
        ) {
            return res.status(422).json({ error: "Enter All Data" });
        } else {
            const result = await user.findOne({ email: email });

            if (result === null) {
                if (password != cpassword) {
                    return res.status(422).json({ error: "Enter Valid Data" });
                } else {
                    const newUser = new user({
                        name,
                        email,
                        phone,

                        password,
                        cpassword,
                        address,
                    });

                    const finalResult = await newUser.save();
                    res.status(201).send({
                        message: `${name} your registration completed successfully`,
                    });
                }
            } else {
                return res.status(422).json({ error: "Email already exists" });
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/profilepage", authenticate, (req, res) => {
    try {
        if (req.rootUser) {
            res.status(200).send(req.rootUser);
        } else {
            res.status(500).json({ "status": "error" });
        }
    } catch (error) {
        res.status(500).send(req.rootUser);
    }
});

router.get("/logout", async (req, res) => {
    res.clearCookie("jwt", {
        path: "/",
    });
    res.status(200).send("user Logout");
});

router.post("/signin", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" });
        }
        const result = await user.findOne({ email });

        if (email === process.env.adminemail) {
            const isMatch = await bcrypt.compare(password, result.password);
            token = await result.generateAuthToken();

            res.cookie("jwt", token, {

                httpOnly: true,
            });

            if (isMatch) {
                res.status(203).json({ message: "Log in successfully" });
            } else {
                res.status(400).json({ message: "Invalid Creadentials" });
            }
        }

        else if (result != null) {
            const isMatch = await bcrypt.compare(password, result.password);
            token = await result.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
            });

            if (isMatch) {
                res.status(200).json({ message: "Log in successfully" });
            } else {
                res.status(400).json({ message: "Invalid Creadentials" });
            }
        } else {
            res.status(400).json({ message: "Invalid Creadentials" });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/pizza", async (req, res) => {
    try {

        const data = await pizzalist.find({});

        res.send(data);
    } catch (err) {
        res.status(500).send("something went wrong")

    }
});

router.post("/razorpay", authenticate, async (req, res) => {
    const { amount, time } = req.body;


    try {
   
        const payment_capture = 1;
        const currency = "INR";
        const result = await razorpaya.orders.create({
            amount,
            currency,
            receipt: shortid.generate(),
            payment_capture,

        });
        const postorder = await new order({
            user: req.rootUser._id,
            name: req.rootUser.name,
            orderid: result.id,
            receipt: result.receipt,
            amount: result.amount,
            email: req.rootUser.email,
            time,
            status: "placed"
        });
        postorder.save();
        res.status(200).send(result.id);
    } catch (error) {

        res.status(500).send("something went wrong");
    }
});


router.get("/getorder", async (req, res) => {
    try {
        const data = await order.find()

    } catch (error) {

    }
})

router.get("/users", async (req, res) => {
    try {
        const data = await user.find({});

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);

    }
});

router.get("/orders", async (req, res) => {
    try {
        const data = await order.find({});
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/addproduct", async (req, res) => {
    try {
        const { name, description, category, image, Small, Large, price, Medium } =
            req.body;
        if (!name || !category || !image) {
            return res.status(422).json({ error: "Enter All Data" });
        } else {
            const result = await pizzalist.findOne({ name });

            if (result === null) {
                const newProduct = new pizzalist({
                    name,
                    description,
                    image,
                    category,
                    Small,
                    Large,
                    price,
                    Medium,
                });

                const finalResult = await newProduct.save();
                res.status(201).send({
                    message: `${name} product added successfully`,
                });
            } else {
                return res.status(422).json({ error: "product already exists" });
            }
        }
    } catch (error) {

    }
});


router.post("/reset", async (req, res) => {
    try {
        const { email } = req.body;


        if (!email) {


            return res.status(404).json({ error: "User Not Found" })
        }
        const result = await user.findOne({ email: email })


        if (result) {

            const code = Math.floor(Math.random() * 10000 + 1)
            let Code = new otp({
                email,
                Otp: code,
                expireIn: new Date().getTime() + 300 * 1000
            })
            const response = await Code.save()
            mailer(email, code)
            res.status(200).json({ error: "OTP Send Your Mail Id" })
        }
        else {

            res.status(404).json({ error: "User Not Found" })
        }
    } catch (error) {

        res.status(404).json({ error: error.message })
    }
})
router.post("/changepassword", async (req, res) => {
    try {
        let { Otp, email, password } = req.body;


        if (!Otp || !email || !password) {
            res.status(404).json({ error: "Enter All Fields" })
        }
        let data = await otp.findOne({ email, Otp })

        if (data) {

            let currTime = new Date().getTime()
            let diff = data.expireIn - currTime

            if (diff < 0) {
                res.status(401).json({ error: "Your OTP Expired" })

            }
            else {

                const data = await user.findOne({ email })

                if (user) {
                    data.password = password;
                    await data.save();

                    res.status(200).json({ message: "Your Password has been updated successfully" })
                }
                else {
                    res.status(404).status("Something Went Wrong")
                }
            }
        }
        else {
            res.status(404).json({ error: "Enter a Valid OTP" })
        }


    } catch (error) {

        res.status(404).status("Something Went Wrong")
    }
})





router.put("/status/:id", async (req, res) => {
    try {
        const data = await order.findOne({ _id: req.params.id })
        data.status = "delivered"
        await data.save();
        res.status(200).send("ok")
    } catch (error) {

        res.status(500).send("something went wrong")
    }
})

router.get("/getspecificorders", authenticate, async (req, res) => {
    try {
        if (req.rootUser) {
            const data = await order.find({ user: req.rootUser._id });
            console.log(data);
            res.status(200).send(data);
        } else {

            res.status(500).send(req.rootUser);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(req.rootUser);
    }
})

router.get("/particularproduct/:id", async (req, res) => {
    let { id } = req.params
    try {
        let data = await pizzalist.findById(id)
        if (data) {
            res.status(200).json(data)
        }
        else {
            res.status(203).json({ "message": "Something went wrong" })
        }
    } catch (e) {
        res.status(203).json({ "message": "Something went wrong" })
    }
})




const mailer = (mail, otp) => {
    try {


        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        mailTransporter.use('compile', hbs({
            viewEngine: {
                extname: ".handlebars",
                partialsDir: path.resolve('./views'),
                defaultLayout: false
            },

            viewPath: path.resolve('./views'),
            extname: ".handlebars",
        }))

        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject: 'Email For Forgot Password',
            template: 'index',
            context: {
                otp
            }
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {
                console.log(err)
            } else {

            }
        })
    } catch (error) {
        console.log(error)

    }
}

module.exports = router;
