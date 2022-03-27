import express, { Application, Request, Response, NextFunction } from 'express'
import { migrate } from "./Models/migration"
import student from "./Routes/student"
import admin from "./Routes/admin"

const app : Application = express()
const port : number = 3000

migrate();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(student);
app.use(admin);
// app.get('/', (req : Request, res : Response) => {
//   res.send('Hello World!')
// })


// interface User {
//   id : number
//   name : string
//   age : number
// }
// const users : User[]  = [
//   {
//     id : 1,
//     name : "Hein",
//     age : 20
//   },
//   {
//     id : 2,
//     name : "Pyae",
//     age : 18
//   },
//   {
//     id : 3,
//     name : "Sithu",
//     age : 20 
//   }
// ]

// app.get('/user/select', (req: Request, res : Response) => {
//   console.log(users)
//   res.send(users);
// })

// app.get('/user/select/:id', (req: Request, res : Response) => {
//   const id = req.params.id
//   const userObj = users.filter((u : User) => u.id === parseInt(id))
//   res.send(userObj);
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})