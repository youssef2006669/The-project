const express=require('express');
const app=express();

const DataStore=require('nedb');
const database=new DataStore('database.db');
database.loadDatabase();

app.use(express.static('seen'));
app.use(express.json({limit:'10mb'}));
const port= process.env.PORT || 3000 ;
app.listen(port,()=>{
    console.log(`listening to server  ${port}`);
})
app.get('/api',(requeste , response)=>{
    database.find({},(err , data)=>{
        if(err){
            console.log(err);
        }
        response.json( data )
    })
})
app.post('/api',(requeste , response)=>{
    const data=requeste.body



    const timestamp=Date.now();
    data.time=timestamp;

    database.insert(data);

    response.json({
        status:'success',
        name:data.name,
        dis:data.dis,
        number:data.number,
        time:data.time
    });

    console.log('I got a request');
    console.log(data);
})