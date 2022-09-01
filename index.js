import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

////MONGO DB CONNECTION////
const URI=process.env.MONGO_URI;
const client=new MongoClient(URI);
const database=client.db('Cakes-recipes');
const cake=database.collection('Cakes');

client.connect();

console.log('Mongo connection');
const PORT = process.env.PORT;

const app=express();
app.use(cors());
app.use(express.json());
app.listen(PORT,()=>console.log('API is running 4000'));

// READ---->GET ALL CAKES FROM MONGO DB 'CAKES' COLLECTION //    

app.get('/', async (req,res)=>{
const allCakes =await cake.find().toArray()
res.send(allCakes)
console.log(allCakes)
});

// CREATE ---->POST CAKE TO MONGO DB 'CAKES' COLLECTION //

app.post('/', async (req, res) => {
await cake.insertOne(req.body)
res.json('Item was added')
})

// DELETE ---->DELETE CAKE FROM MONGO DB 'CAKES' COLLECTION //

app.delete('/', async (req, res) => {
await cake.findOneAndDelete(req.query)
res.json('Item was deleted')
})

// UPDATE - PUT CAKE INFORMATION IN MONGO DB 'CAKES' COLLECTION //

app.put('/', async (req, res) => {
await cake.findOneAndUpdate(req.query, { $set: req.body })
res.json('Item was updated with special field')
})