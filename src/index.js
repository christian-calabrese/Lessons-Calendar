let express = require('express')
let app = express()
let calendarroute = require('./routes/calendar')
let lessonroute = require('./routes/lesson')
let bodyParser = require('body-parser')
const PORT = 3000

app.use(bodyParser.json())


app.use(calendarroute)
app.use(lessonroute)
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Lessons Calendar started listening on port ${PORT}`))