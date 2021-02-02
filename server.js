//1- connect DB
const mongoose=require("mongoose")
require('dotenv').config({ path: './.env' })

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> console.log("Database is connected"))
.catch(err => 
    console.error('Database connection error'))
//2-Create a person having this prototype:
    let personSchema = new mongoose.Schema({
        name :{type: String,
       required: true},

     age : Number,

     favoriteFoods : [String]
     })
const Person=mongoose.model('Person', personSchema)


//3-Create and Save a Record of a Model
const Pers = new Person({
   name : 'imen',
   age : 30,
   favoriteFoods:['pizza','ojja']
})

Pers.save((err,data)=>{
 err ? console.log(err) : console.log('person saved',data)
})

//4-Create Many Records with model.create()
Person.create([

   { name:'sondos',
       age:30,
       favoriteFoods:['ojja','kafteji'],
  },
       
       { name:'hasnia',
       age:29,
       favoriteFoods:['pizza','spagetti']},

       { name:'Hanen',
       age:25,
       favoriteFoods:['jelbena','kefteji']},
])
.then((persons)=>{
console.log("persons saved",persons)
})
.catch(err=>console.log(err))




//5-Use model.find() to Search Your Database

   Person.find({name:"sondos"})
   .then((person)=>{
       console.log(person)
       })
       .catch(err=>console.log(err))
 
       
//6-Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({favoriteFoods: 'ojja'})
.then((person)=>{
   console.log(person)
   })
   .catch(err=>console.log(err))
 

   //7-Use model.findById() to Search Your Database By _id

   var findPersonById = (personId, done) => {
       Person.findById(personId, (err, data) => err ? done(err) : done(null, data)); 
     };
     
     // 8- Perform Classic Updates by Running Find, Edit, then Save

var findEditThenSave = function(personId, done) {
   var foodToAdd = 'hamburger';
   Person.findById(personId, function(err, data) {
     this.favoriteFoods.push(foodToAdd).save();
     if (err) {
       return done(err);
     }
     else {
       done(null, data);
     }
   });
 };
 
 // 9- Perform New Updates on a Document Using model.findOneAndUpdate()
 
 var findAndUpdate = function(personName, doc) {
   var ageToSet = 20;
   
   Person.findOneAndUpdate(
     {"name": personName},
     {$set: {"age":ageToSet}},
     {new : true},
     function(err,done){
       if(err){
         console.log("Error Ocurred")
       }
       console.log(done)
     }    
 )};
 
 // 10- Delete One Document Using model.findByIdAndRemove
 
 
 var findByIdAndRemove = (personId, done) => {
   Person.findOneAndRemove(personId, (err, data) => err ? done(err) : done(null, data)); 
 };
 
 // 11- MongoDB and Mongoose - Delete Many Documents with model.remove()
 
 var removeManyPeople = function(done) {
   var nameToRemove = "Hanen";
   Person.remove({name: nameToRemove}, (err, data) => done(null, data));
 };
 
 // 12- Chain Search Query Helpers to Narrow Search Results
 
 var queryChain = function(done) {
   var foodToSearch = "ojja";
   Person.find({favoriteFoods:foodToSearch}).sort({name : 1}).limit(2).select("-age").exec((err, data) => {
      if(err)
        done(err);
     done(null, data);
   })
 };