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

    res.json(foundItem)
  })
})

//This is a get request with params
app.get('/data/:id',(req,res)=>{
  const id =parseInt(req.params.id);
  fs.readFile('abc.json',(err,data)=>{
    if(err){
      res.json('File error')
    }
    else{
      const arr = JSON.parse(data)
      const foundItem = arr.find(item=>item.id === id)
      res.json(foundItem)
    }
  })
})

//This is put request
app.put('/data/:id',(req,res)=>{
const id = parseInt(req.params.id);
const item = req.body;


fs.readFile('abc.json',(err,data)=>{
  if(err){
    res.json("File error");
  }
  
    let arr = JSON.parse(data);

    arr[id-1]=item;
  

  fs.writeFile('abc.json',JSON.stringify(arr),(err)=>{
    if(err){
      console.log('Error writing in file')
    }
    else{
    //  res.send("Data written successfully")
      res.json(arr);
    }
  });
});
});

//This is a delete request

app.listen(port, (req, res) => {
  console.log(`server is running at port ${port}`);
});
