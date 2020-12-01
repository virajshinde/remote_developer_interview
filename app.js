const express = require("express")
const bodyParser = require("body-parser")



//var LJSON = require("LJSON");



const app = express()

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

app.set('view engine',  'ejs')

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/UsersDB",{useNewUrlParser:true})

const usersSchema = {
  name: String,
  details: String
};

const User = mongoose.model("Item", usersSchema);


app.get("/",function(req,res){
  

  User.find({},function(err, foundItems){
    //if(foundItems.length === 0){
        //insertTodos()
        
        //const newList =JSON.stringify({name:"Today",_id:"defaultList"})
        //console.log(newList)
        res.render("users",{NewListItem:foundItems})
   // }else{

      //const newList =JSON.stringify({name:"Today",_id:"defaultList"})
      //console.log(newList)

     //   res.render("list",{listTitle:"Today",NewListItem:foundItems})
    //}

})
})


app.post("/user",function(req,res){
    const user = req.body.createUser
    const detail = req.body.details
    const userItem = new User ({
      name: user,
      details: detail
  })
  userItem.save()
  res.redirect("/")
})


app.post("/delete",function(req,res){
  
  const item = req.body.deleteButton

  //const list =req.body.currentList
  User.deleteOne(
    {_id: item},
    function(err,results){
      if(err){
        console.log(err)
      }
    }
  )

  res.redirect("/")
})

  app.post("/update",function(req,res){

    const userID = req.body.updateButtonNew
    const NewUserName = req.body.nameUpdate
    const newDetails = req.body.detailsUpdate
    User.findOneAndUpdate(
      {_id:userID},
      {name:NewUserName,details:newDetails},
      function(err,results){}
    )
    res.redirect("/")
  })

  app.post("/updateUser",function(req,res){
    const detail = req.body.updateButton
    res.render("updateUser.ejs",{user:detail})
  })

  







app.listen(3000,function(){
  console.log("Server has started succesfully")
})
