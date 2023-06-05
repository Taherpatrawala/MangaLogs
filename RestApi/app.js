const express=require('express');
const bodyParser=require('body-parser');

const app=express();

const routes=require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 


app.use(routes)

app.listen(3000,()=>{
     console.log('Server started at port 3000')
})