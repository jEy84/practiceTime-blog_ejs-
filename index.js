const path = require('path')
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const methodOverride = require('method-override');
const articalRoute = require('./routes/artical');
const Articals  = require('./models/artical_mod');

// connecting to the database 
mongoose.connect('mongodb://localhost:27017/blogsite')
    .then(()=>{
        console.log("Database Connected ");
    })
    .catch((er)=>{
        console.log("Error Occur",err);
    })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(methodOverride('_method'));  // set method override string as the "_method" to use in the form 

app.use('/articals',articalRoute);


app.get('/',async(req,resp)=>{
    const articals = await Articals.find({}).sort({createdAt:"desc"}); 
    resp.render('artical/index',{articals});
})



port = 5555;

app.listen(port,()=>{
    console.log(`Listning On Port ${port}`);
});