const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const initialData = require('./InitialData');
let new_id = initialData[initialData.length-1].id
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student',(req,res)=>{
    res.json(initialData)
})
app.get('/api/student/:id',(req,res)=>{
    for(let i=0; i<initialData.length;i++){
        if(req.params.id==initialData[i].id){
           return res.json(initialData[i])
        }
    }
    res.sendStatus(404)
       
})
app.post('/api/student',(req,res)=>{
   if(req.body.name && req.body.currentClass && req.body.division){
        initialData.push({id:++new_id,...req.body})
        res.json({'id':new_id})

   }else{
    res.sendStatus(400)
   }
})
app.put('/api/student/:id',(req,res,next) => {
    for(let i=0; i<initialData.length;i++){
        if(initialData[i].id==req.params.id){
            initialData[i].name = (req.body.name||initialData[i].name);
            initialData[i].currentClass = (req.body.currentClass||initialData[i].currentClass);
            initialData[i].division = (req.body.division||initialData[i].division);
             return res.json(initialData[i])
        }
    }
    res.sendStatus(400)
        
})
app.delete('/api/student/:id',(req,res)=>{
    
    try{
        for(let i=0; i<initialData.length;i++){
        if(initialData[i].id==req.params.id){
             return res.json(initialData.splice(i,1));
        }
    }
        res.sendStatus(404)
    }catch(err){
        console.log(err)
    }
    
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   