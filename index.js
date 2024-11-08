const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

const fs = require("fs");

//This is a post request
app.post("/add", (req, res) => {
  const book = req.body;

  fs.writeFile("abc.json", JSON.stringify(book), (err) => {
    if (err) {
      console.log(err);
      res.send("Book not find");
    } else {
      res.send("Book added successfully");
    }
  });
});

//This is a get request
app.get("/data",(req,res)=>{
  fs.readFile('abc.json', (err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json(JSON.parse(data))
    }
  })
})

//This is a get request with query
app.get('/data/search',(req,res)=>{
  const search = req.query.name;
  fs.readFile('abc.json',(err,data)=>{
    const arr = JSON.parse(data);

    const foundItem = arr.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))

    res.send(foundItem)
  })
})

app.listen(port, (req, res) => {
  console.log(`server is running at port ${port}`);
});
