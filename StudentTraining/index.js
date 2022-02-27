const express = require('express')
const app = express()
const port = 3000

const { db } = require('./Models/index.js');
const userRoute = require('./Routes/user.js')
const classRoute = require('./Routes/class.js')
const courseRoute = require('./Routes/course.js')
const teacherRoute = require('./Routes/teacher.js')
const joinerRoute = require('./Routes/joiner.js')
const adminRoute = require('./Routes/admin.js')
require('./Models/migration.js');
// const teacherRoute = require('./Routes/teacher.js') // homework
// db.sequelize.sync();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(userRoute)
app.use(classRoute)
app.use(teacherRoute) // homework
app.use(courseRoute)
app.use(joinerRoute)
app.use(adminRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})