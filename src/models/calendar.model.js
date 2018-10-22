let mongoose = require('mongoose')

const server = 'ds137913.mlab.com:37913'
const database = 'lessonscalendar'
const user = 'root'
const password = 'administrator1'

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)

let CalendarSchema = new mongoose.Schema({

})

module.exports = mongoose.model('Calendar', CalendarSchema)