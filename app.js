const express = require('express')
const app = express()
const EventEmitter = require('events');
const fs = require('fs')
require('path')
app.use(express.urlencoded({encoded:false}))
app.use(express.static('./public'))


class MyEmitter extends EventEmitter { }


const myEmitter = new MyEmitter();

const connection =[]




app.get('/start', (req, res) => {
    console.log('start req');
    connection.push(res)
    myEmitter.on('event', () => {
        console.log('event is triggered');
        data = fs.readFileSync('./dis.txt','utf8')
        connection.map((res)=>{
            console.log(data);
            res.json(data)
        })
        connection.length=0
    });

})

app.post('/update', (req, res) => {
    msg = req.body.msg
    console.log(msg);
    fs.writeFileSync('./dis.txt',`${msg}\n`, { flag: 'a' })
    console.log('update req');
    myEmitter.emit('event');
    console.log('emitted');
    res.end()
    

})

app.listen(3000, () => {
    console.log('started listening at port 3000');
})