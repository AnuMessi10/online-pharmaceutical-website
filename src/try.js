const mogo = require('./db/conn')

try {

        
    // GET THE  VALUE ENTERED FROM FORM
    const  registerperson = ({
        // firstname:req.body.fname,
        // lastname:req.body.lname,
        // email:req.body.inputEmail,
        // mobileNo:req.body.inputMobile,
        // password:req.body.inputPassword,
        // cpassword:req.body.inputConfirmPassword,
        // address:req.body.inputAddress,
        // city:req.body.inputCity,
        // state:req.body.inputState,
        // pincode:req.body.inputZip,


        firstname:'Nihar',
        lastname:'Vira',
        email:'nv123',
        mobileNo:'9870041542',
        password:'123456',
        cpassword:'123456',
        address:'mufgh',
        city:'asdad',
        state:'asddsa',
        pincode:'412533',
    })
    console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body.inputEmail);
    console.log(req.body.inputMobile);
    console.log(req.body.inputPassword);
    console.log(req.body.inputConfirmPassword);
    console.log(req.body.inputAddress);
    console.log(req.body.inputCity);
    console.log(req.body.inputZip);
    
    const registered = await Register.save();
    res.status(201).render(index); 


} catch (error) {
    res.status(400).send(error)
}