const express = require("express");
const path = require('path');
const app = express();
const hbs = require("hbs")
const bycrypt = require("bcryptjs")// converts to  hash value
const Razorpay = require('razorpay');
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const port = process.env.PORT || 3000;

require("./db/conn");  // connected my mongo db with express
const MongoClient = require('mongodb').MongoClient
const Register = require("./models/registration");
const Contact = require("./models/contact");

const static_path = path.join(__dirname, "../public")
const templates_path = path.join(__dirname, "../templates/views"); // give the desired path of folder to connect with the html file
const partials_path = path.join(__dirname, "../templates/partials"); // run the file in partials folder i.e navbar
const images = path.join(__dirname, "../images")
// USE TO GET VALUE FROM FORM
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path)) // html fle connected at server 3000
app.set("view engine", 'hbs');  // run my view engine with file extension hbs
app.set("views", templates_path);  // run my view engine with file extension hbs
hbs.registerPartials(partials_path);// running the hbs partials file
app.use(express.static(images));

const instance = new Razorpay({
    key_id: 'rzp_test_IAdXdrHNpx6X7G',
    key_secret: 'lJqSBQLs4X705tfcaYLng4iC'
})

app.post('/createOrder', function (req, res) {

    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
    };

    instance.orders.create(options, function (err, order) {
        console.log(order);
        res.send({ orderID: order.id, orderAmount: order.amount})
    });
})

// open index page first
var database
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true },
    (error, result) => {
        if (error) throw error
        database = result.db("Medicine")
        console.log("medicine.js connected successfully")
    })


// open index page first
app.get('/', (req, res) => {
    database.collection('medicines').find({}).toArray((err, result) => {
        if (err) throw err
        res.render('index', {
            details: result
        })
    })
})

app.get('/productdetail', (req, res) => {
    database.collection('medicines').find({}).toArray((err, result) => {
        if (err) throw err
        res.render('productdetail', {
            details: result
        })
    })
})

app.get("/product", (req, res) => {
    const name = req.query.medname
    const id = req.params.id
    database.collection('medicines').find({ Medicinename: `${name}` }).toArray((err, result) => {
        if (err) throw err
        res.render('product', {
            details: result
        })
    })
})
// go to desire page
app.get("/registration", (req, res) => {
    res.render("registration");
})
app.get("/cart", (req, res) => {
    res.render("cart");
})
app.get("/product", (req, res) => {
    res.render("product");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/contact", async (req, res) => {
    try {
        // GET THE  VALUE ENTERED FROM FORM
        const contactperson = new Contact({
            firstname: req.body.firstname,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            message: req.body.message,
        })
        const registered = await contactperson.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error)
    }
})

// Login validation 
app.post("/login", async (req, res) => {
    try {
        const email = req.body.emaillogin;
        const userpassword = req.body.passwordlogin;
        const useremail = await Register.findOne({ email: email }) // check if the email is present in database

        const isMatch = await bycrypt.compare(userpassword, useremail.password) // compare the value of user entered password and encrypted password

        // isMatch returns true, if credentials are correct
        if (isMatch) {
            console.log("Matched!")
            MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true },
                (error, result) => {
                    if (error) throw error
                    logindb = result.db("Registrationformedical")
                    console.log("medicine.js connected successfully")
                })

            logindb.collection('registrations').find({ email: `${email}` }).toArray((err, result) => {
                if (err) throw err
                res.status(201).render('index', {
                    username: result
                })

            })
            //res.status(201).render("index");

        } else {
            res.send("Oops!Password is incorrect")

        }

    } catch (error) {
        res.status(400).send("Invalid Email or password")
    }
})


// New register sign in  
app.post("/registration", async (req, res) => {
    try {

        // GET THE  VALUE ENTERED FROM FORM
        const registerperson = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: req.body.password,
            cpassword: req.body.cpassword,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,

        })
        const registered = await registerperson.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error)
    }
})

// check if server is running
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running at port no ${port}`)
})
