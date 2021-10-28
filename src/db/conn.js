// connect with database 
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registrationformedical",{
    useNewUrlParser:true ,
    useUnifiedTopology:true

}).then(()=>{
   console.log('connection successful');
}).catch((e) =>{
    console.log(`no connection ${e}` );
})


// mongoose.connect("mongodb://localhost:27017/Pharmacy_website/Medicines",{
//     useNewUrlParser:true ,
//     useUnifiedTopology:true

// }).then(()=>{
//    console.log(' Medicne connection successful');
// }).catch((e) =>{
//     console.log(`Medicine no connection ${e}` );
// })
