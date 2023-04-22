const express = require ('express');              // Import the express library file
const path = require ('path');
const bodyParser = require('body-parser');

const port = 8000;

const db = require ('./config/mongoose');         // Start DB before starting express app
const Contact = require('./models/contact');
const app = express();                             // Importing all express file functions into app

app.set('view engine' , 'ejs');                    // Key and value for multiple keys
app.set('views' , path.join(__dirname, 'views'));  // View/frontend files path
app.use(express.urlencoded({}));                   // Parsing form data from URL - Middleware, not for URL 
app.use (express.static('assets'));                // Middleware to include CSS,JS, Images etc

// //middleware1 in between browser and controller
// app.use(function(req,res,next){
//     console.log("Middleware 1 called");
//     next();                                           // directs to next middleware/controller                                    
// });

// Local DB (code-level)
var contactList = [
    {
        name : "Shashank",
        phone : "1111111111"
    },
    {
        name : "Tyagi",
        phone : "2222222222"
    },
    {
        name : "Shashank tyagi",
        phone : "3333333333"
    }

]
app.get('/', function(req, res){
    // return res.render('home.ejs' , {'title' : 'My first Express App'});   // Sending dynamic data
    // res.send('<h1> Welcome to first Express App </h1>');
    /* return res.render('home.ejs' , {
        contact_list : contactList                                        // Sending dynamic data to view file
    }); */

        Contact.find({}).then(function(contacts){

            return res.render('home.ejs' , {
            contact_list :  contacts                                // Sending dynamic data to view file
            });
        
        })
        // console.log(Mycontacts);
        
})

app.get('/practice', function(req, res){
    return res.render('practice.ejs' , {
        'customTitle' : 'Practice page'
    });   // Sending dynamic data
})
app.get('/contacts', function(req, res){
    return res.render('contactList.ejs') });                                    // Sending dynamic data to view file
   
app.post('/create-contact',  function(req, res){                           // Post the data from HTML form action list
    /* Code when we want to add the details to an local RAM memory array
        contactList.push ({
        name : req.body.name,
        phone : req.body.phone,
         });   */

   Contact.create( {
    'name' : req.body.name,
    'phone' : req.body.phone,
   }).then (function(newContact) {
        return res.redirect('/');
   })
    // console.log(req.body);
    // console.log(req.body.name);
    // return res.redirect('/');                                     // After pushing redrect the page to this 
});


// Method 1 when data is received as string parameter
/*app.get('/delete-contact/:phone', function(req, res){
    console.log(req.params);
    let phone = req.params.phone
    return res.redirect('/');
}); */


//Method 2 when data is received in URL Query
app.get('/delete-contact/', function(req, res){
    /* console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex != -1){
        contactList.splice(contactIndex,1);
    } */

    let id = req.query.id;
    Contact.findByIdAndDelete(id).then(function(){
        return res.redirect('/');
    })
    
    
});


// Server start code
app.listen(port, function(err){
    if (err){
        console.log('Error in running the server ', err); return;
    }
    console.log('My server is running on port : ', port);
})
