const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());


const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/",(req,res)=>{  //get all users
  res.send(users);
})

app.get("/first", (req, res) => {//get first user
  res.send(users[0]);
});

app.get("/last", (req, res) => {
  //get last user
  res.send(users[users.length - 1] );
});

app.get("/user/:id", (req, res) => {//get user by id
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});

app.get("/users/city/:ucity", (req, res) => {
  let city = req.params.ucity;
   //TODO : get user by city
   userCity=users.find((e)=>e.address.city===city);

  res.send(userCity);
});

app.post("/user", (req, res) => {// add new user
  let id = users.length + 1;

  let name = req.body.name;
  let age = req.body.age;

  let newUser = { id,name, age };
  users.push(newUser);

  fs.writeFileSyc("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.put("/user/update/:id", (req, res) => {  //TODO : add update function
  let id = req.params.id;
  let name = req.body.name;
  let age = req.body.age;
  userUp=users.find((e)=>e.id===parseInt(id));
  if(!userUp){
    res.send({ success: false });
  }
  userUp={id,name,age};
  //users.push(userUp);
  fs.writeFileSync("./users.json", JSON.stringify(users));

});

app.delete("/user/delete/:id", (req, res) => {
  let id = req.params.id;
  //TODO : add delete function
  userDel=users.filter((e)=>e.id!==parseInt(id));

  fs.writeFileSync("./users.json", JSON.stringify(userDel));

 

});
app.get("/user/street/:id", (req, res) => {//get street by id

  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user.address.street);

});
app.get("/user/company/:id", (req, res) => {//get company by id 
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user.company.name);

})


app.listen(port, () => {
  console.log(`localhost:${port}`);
});
