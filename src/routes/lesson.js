let express = require('express')
let router = express.Router()

router.get('/lesson', (req, res) => {
    console.log("Getting lessons");
})

router.post('/lesson', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    console.log(req.body)
})



module.exports = router