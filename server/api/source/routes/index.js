const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')
const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)

const jsonBodyParser = bodyParser.json()

router.post('/eaters', jsonBodyParser, (req, res) => {
    const { body: { name, lastName, email, password } } = req

    logic.registerEater(name, lastName, email, password)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateEater(email, password)
        .then(id => {

            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/eaters/:eaterId', jwtValidator, (req, res) => {
    const { params: { eaterId } } = req

    return logic.retrieveEater(eaterId)
        .then(eater => {
            res.status(200)
            res.json({ status: 'OK', data: eater })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.patch('/eaters/:eaterId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { eaterId }, body: { name, lastName, email, password, newEmail, newPassword } } = req

    logic.updateUser(eaterId, name, lastName, email, password, newEmail, newPassword)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.delete('/eaters/:eaterId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { eaterId }, body: { email, password } } = req

    logic.unregisterUser(eaterId, email, password)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.get('/courses/ids/', (req, res) => {
    const { query: { first, second } } = req
    const ids = [];
    if (first && second) {
        ids.push(first, second)
    }   

    return logic.retrieveCourses(ids)
        .then(course => {
            res.status(200)
            res.json({ status: 'OK', data: { course } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/courses/:first', (req, res) => {
    const { params: { first } } = req

    logic.listCoursesByDay(first)
        .then(courses => {
            res.status(200)
            res.json({ status: 'OK', data: { courses } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/eaters/order/:eaterId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { body: { firstCourse, secondCourse, pickupTime, statusPaid }, params: { eaterId } } = req

    return logic.createOrder(eaterId, firstCourse, secondCourse, pickupTime, statusPaid)
        .then(order => {
            res.status(200)
            res.json({ status: 'OK', data: order })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/todayorders/', (req, res) => {

    return logic.countOrdersByDay()
        .then(orders => {
            res.status(200)
            res.json({ status: 'OK', data: orders })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/courses/amount/:id', (req, res) => {
    const { params: { id } } = req

    logic.getCourseAmountLeftByDay(id)
        .then(amount => {
            res.status(200)
            res.json({ status: 'OK', data: { amount } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})



module.exports = router