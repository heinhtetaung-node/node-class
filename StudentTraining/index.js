const express = require('express')
const app = express()
const port = 3000

const { db } = require('./Models/index.js');
const userRoute = require('./Routes/user.js')
// const teacherRoute = require('./Routes/teacher.js') // homework
db.sequelize.sync();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(userRoute)
// app.use(teacherRoute) // homework

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})