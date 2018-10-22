let mongoose = require('mongoose')

const server = 'ds137913.mlab.com:37913'
const database = 'lessonscalendar'
const user = 'root'
const password = 'administrator1'

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)

let LessonSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    where: {
        type: String,
        require: true,
    },
    day: {
        type: Number,
        require: true,
    }, 
    slice: {
        type: Number,
        require: true,
    },
    calendarid: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Lesson', LessonSchema)