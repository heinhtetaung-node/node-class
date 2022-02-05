const express = require('express')
const app = express()
const port = 3000

const user = [
    {
        id : 1,
        name : 'Bhone'
    },
    {
        id : 2,
        name : 'Pyae',
    },
    {
        id : 3, 
        name : 'Sithu'
    }
];

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3000/user/select
app.get('/user/select', (req, res) => {
    console.log('user select');  
    res.send(user);
})

// http://localhost:3000/user/add
// { name : '' } POST
app.post('/user/add', (req, res) => {
    const name = req.body.name
    const id = user.length + 1
    user.push({
        id,
        name
    })
    res.send({ result : true });
})

// http://localhost:3000/user/update/{id}
// { name : '' } PUT
app.patch('/user/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const singleUser = user.filter(u => u.id == id) // return [ {} , {} , {} ]
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    const updateUser = singleUser[0];
    const updateIndex = user.indexOf(updateUser);
    user[updateIndex].name = name
    res.send({
        result : true
    })
})

// http://localhost:3000/user/remove/{id}
app.delete('/user/remove/:id', (req, res) => {
    const id = req.params.id;
    const singleUser = user.filter(u => u.id == id) 
    if (singleUser.length == 0) {
        return res.send({
            result : false,
            message : 'User not found!'
        })
    }
    const updateUser = singleUser[0];
    const updateIndex = user.indexOf(updateUser);
    user.splice(updateIndex, 1);
    res.send({
        result : true
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})