const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


app.use(cors())
app.use(express.json())

// mongodb user & password
// user:    bayzid21
// password:  uApw1M91sn9yf1D6



const uri = "mongodb+srv://bayzid21:uApw1M91sn9yf1D6@cluster0.h4ajy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        });
        
        app.post('/user', async (req,  res) =>{
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

        app.delete('/user/:id', (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId()}
        })



    }
    finally{

    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log('listening my app', port)
})
