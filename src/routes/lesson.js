let express = require('express')
let LessonModel = require('../models/lesson.model')
let router = express.Router()

router.get('/lesson', (req, res) => {
    LessonModel.find()
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/lesson', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    let model = new LessonModel(req.body)
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

router.put('/lesson', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    LessonModel.findOneAndUpdate({
        day: req.body.day,
        slice: req.body.slice
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



module.exports = router