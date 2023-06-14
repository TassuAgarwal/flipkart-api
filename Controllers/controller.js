let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
// let mongoUrl = "mongodb://127.0.0.1:27017"
let mongoUrl = "mongodb+srv://tanu8562:wiyjH96ZOWLPd6pr@cluster0.ctrgs2r.mongodb.net/?retryWrites=true&w=majority"
let client = new MongoClient(mongoUrl)

async function dbConnect(){
    await client.connect()
}

let db = client.db('flipkart')

async function getData(collectionName, query){
    let output = [];
    try{
        // output = await db.collection(collectionName).find(query).toArray();
        const cursor = await db.collection(collectionName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    }catch(e){
        output.push({"Error" : "Error in getData"})
    }
    return output;
}

async function postData(collectionName,data){
    let output;
    try{
        output = await db.collection(collectionName).insertOne(data)
    }catch(e){
        output = {"Error" : "Error in getData"}
    }
    return output
}

async function updateOrder(collectionName,condition,data){
    let output;
    try{
        output = await db.collection(collectionName).updateOne(condition,data)
    }catch(e){
        output = {"Error" : "Error in getData"}
    }
    return output
}

async function deleteOrder(collectionName,condition){
    let output;
    try{
        output = await db.collection(collectionName).deleteOne(condition,data)
    }catch(e){
        output = {"Error" : "Error in delete getData"}
    }
    return output
}



module.exports = {
    dbConnect,
    getData,
    postData,
    updateOrder,
    deleteOrder
}