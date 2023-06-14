let express = require('express');
let app = express();
let port = process.env.PORT || 9120;
// let port = 9120;
let Mongo = require('mongodb');
const bodyParser = require('body-parser')
let {dbConnect,getData,postData,updateOrder,deleteOrder} = require('./Controllers/controller.js') 

//middleware - supporting library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.send('hii from express  jkshfsK')
})

app.get('/categories',async(req,res) => {
    let query = {};
    let collection = 'categories';
    let output = await getData(collection,query);
    res.send(output);
})

app.get('/products',async(req,res) => {
    let query = {};
    if(req.query.brandId){
        query = {"brand_id" : req.query.brandId}
    }else if(req.query.catId){
        query = {"cat_id" : req.query.catId}
    }
    else{
        query = {}
    }
    let collection = 'products';
    let output = await getData(collection,query);
    res.send(output);
})

app.get('/brands',async(req,res) => {
    let query = {};
    if(req.query.catId){
        query = {"cat_id" : Number(req.query.catId)}
    }
    else{
        query = {}
    }
    let collection = 'brands';
    let output = await getData(collection,query);
    res.send(output);
})

app.get('/details/:id',async(req,res)=>{
    let id = Number(req.params.id)
    // let id = new Mongo.ObjectId(req.params.id)
    let query = {product_id: Number(id)}
    // let query = {_id:id}
    let collection = 'products';
    let output = await getData(collection,query);
    res.send(output);
})

//place order
app.post('/placeOrder',async(req,res)=>{
    let data = req.body;
    let collection = 'orders'
    let response = await postData(collection,data)
    res.send(response);
})

app.get('/orders',async(req,res)=>{
    let query = {}
    if(req.query.email){
        query = {email : req.query.email}
    }else{
        query = {}
    }
    let collection = 'orders';
    let output = await getData(collection,query);
    res.send(output);
})

//update
app.put('/updateOrder',async(req,res)=>{
    let collection = 'orders';
    let condition = {"_id" : new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status" : req.body.status
        }
    }
    let response = await updateOrder(collection,condition,data)
    res.send(response);
})

//delete
app.delete('/deleteOrder',async(req,res)=>{
    let collection = 'orders';
    let condition = {"_id" : new Mongo.ObjectId(req.body._id)}
    let response = await deleteOrder(collection,condition)
    res.send(response);
})

app.listen(port,(err)=>{
    dbConnect();
    if(err) throw err;
    console.log(`server is running on port ${port}`)
});