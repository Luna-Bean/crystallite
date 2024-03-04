/* connect MongoDB to project. when hit enter, should go and retrieve stuff from db. */

const express = require('express');
const app = express()
//const ejs = require('ejs')
const mongoose = require('mongoose');
const DayResults = require('./model/modelschema');
const path = require('path')
const dotenv = require('dotenv')
//const router = express.Router()
const cloudinary = require('cloudinary').v2
dotenv.config({ path: './config/.env'})
const cloudinaryImage = require('@cloudinary/url-gen');


//* connecting to MongoDB database
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// app.use(express.static('public'))
app.use(express.static('public', { type: 'application/javascript' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



const clientJS = require('./public/client');
const day = require('./model/modelschema');
const { auto } = require('@cloudinary/url-gen/qualifiers/quality');
const { error } = require('console');



//function where we find the day of week inside the database
async function findDayByDayName(day) {
  try {
    const user = await DayResults.findOne({ day: day }).select('day planet stone stoneMeaning healingProperties').exec();
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


//display image when day of week is searched 

// cloudinary.image("https://res.cloudinary.com/dfzma8xcv/image/upload/v1698403290/Citrine_points__10197.1602692356_vrbhqe.jpg")



//connect to cloudinary to show stone images
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure : true
})



//opens up main page
app.get('/', (request , response) => {
    
        response.render('webpage')
    })

    // citrine transformation info - delete later

    // const myImage = cloudinary.image("Citrine_points__10197.1602692356_vrbhqe.jpg",{transformation: [
    //   {cloud_name: process.env.CLOUDINARY_NAME},
    //   {width: 1000, crop: "scale"},
    //   {quality: "auto"},
    //   {fetch_format: "auto"},
    //   ]})
    
      

    //route to go to when user enters day with just server side code



      // route to shop page
  app.get('/shop',(request, response) => {
    try{
    response.render('shop');
    }
    catch(error){
      console.log(error)
   }
  })


  app.get('/:userResults?', async(request, response, ) => { 

    const userInput = request.params.userResults.toLowerCase();
    const cloudinaryPicTag = request.params.userResults.toLowerCase();
    
    //retrieving cloudinary URL with specific tag
    try{
      const imageSearch = await cloudinary.search

      .expression(`tags: ${cloudinaryPicTag}`, 
    {cloud_name: process.env.CLOUDINARY_NAME},
    )
      .execute()

      if(imageSearch.resources.length > 0){
        const imageURL = imageSearch.resources[0].public_id;

        const transformedImageURL = cloudinary.url(imageURL,{transformation:[
          {width: 400, crop: 'scale'},
          {quality: 'auto'},
          {fetch_format: 'auto'}
        ]});
  
    
        const user = await findDayByDayName(userInput);

      if (user) {


        response.render('results',{ user , transformedImageURL })
        console.log({user})
      } else {
        response.status(404).json({ message: 'Please enter a day of the week' });
      }
    }
   } catch (error) {
      response.status(500).json({ message: 'Server error' });
      console.log(error)
    }

  });


       


app.listen(process.env.PORT, () => {

    console.log(`Server is running `)
})




/* does actual function on the webpage */