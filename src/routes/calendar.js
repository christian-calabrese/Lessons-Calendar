let express = require('express')
let CalendarModel = require('../models/calendar.model')
let router = express.Router()

router.get('/calendar', (req, res) => {
    CalendarModel.find({
        calendarid: req.query.calendarid
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/calendar', (req, res) => {
    let model = new CalendarModel()
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router