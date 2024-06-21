const express = require('express');
const path = require('path')
const userModel = require("./models/user");
const user = require('./models/user');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req,res)=>{
  res.render('index')
})
app.get("/read", async (req,res)=>{
  let users = await userModel.find();
  res.render("read",{users})
})

app.get("/delete/:id", async (req,res)=>{
  await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect("/read")
})

app.get("/edit/:userid", async (req,res)=>{
  let user = await userModel.findOne({_id: req.params.userid})
  res.render("edit",{user})
})

app.post("/create", async (req,res)=>{
  let {name, email, image} = req.body
  let createdUser = await userModel.create({
    username : name,
    email,
    imageUrl : image
  })
  // res.send(createdUser)
  res.redirect('/read')
})

app.post("/update/:userid", async (req,res)=>{
  let {name, email, image} = req.body
  let updatedUser = await userModel.updateOne({_id: req.params.userid},{
    username : name,
    email,
    imageUrl : image
  })
  // res.send(createdUser)
  res.redirect('/read')
})

app.listen(3000);