'use strict'

require('dotenv').config()

// TODO test api client (not server-side logic)

const { mongoose, models: { Eater, Course, Order, Payment } } = require('data')
const logic = require('logic')
const { expect } = require('chai')
const eatersApi = require('./index')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

eatersApi.url = API_URL

describe('logic (myApp)', () => {
    const eaterData = { name: 'John', lastName: 'Doe', email: 'jd@mail.com', password: '123' }
    const otherEaterData = { name: 'Jack', lastName: 'Wayne', email: 'jw@mail.com', password: '456' }
    const dummyUserId = '123456781234567812345678'
    const dummyOrderId = '123456781234567812345678'

    const firstCourse1 = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '1' }
    const secondCourse1 = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '1' }
    const firstCourse2 = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '2' }
    const secondCourse2 = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '2' }
    const firstCourse3 = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '3' }
    const secondCourse3 = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '3' }
    const firstCourse4 = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '4' }
    const secondCourse4 = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '4' }
    const firstCourse5 = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '5' }
    const secondCourse5 = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '5' }

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Eater.remove(), Course.deleteMany())

    describe('register eater', () => {
        it('should succeed on correct dada', () =>
            logic.registerEater('John', 'Doe', 'jd@mail.com', '123')
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already registered eater', () => {
            Eater.create(eaterData)
                .then(eater => {
                    const { name, lastName, email, password } = eater

                    return logic.registerEater(name, lastName, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`eater with email ${email} already exists`)
                })
        })

        it('should fail on no eater name', () =>
            logic.registerEater()
                .catch(({ message }) => expect(message).to.equal('eater name is not a string'))
        )

        it('should fail on empty eater name', () =>
            logic.registerEater('')
                .catch(({ message }) => expect(message).to.equal('eater name is empty or blank'))
        )

        it('should fail on blank eater name', () =>
            logic.registerEater('     ')
                .catch(({ message }) => expect(message).to.equal('eater name is empty or blank'))
        )

        it('should fail on no eater lastName', () =>
            logic.registerEater(eaterData.name)
                .catch(({ message }) => expect(message).to.equal('eater lastName is not a string'))
        )

        it('should fail on empty eater lastName', () =>
            logic.registerEater(eaterData.name, '')
                .catch(({ message }) => expect(message).to.equal('eater lastName is empty or blank'))
        )

        it('should fail on blank eater lastName', () =>
            logic.registerEater(eaterData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('eater lastName is empty or blank'))
        )

        it('should fail on no eater email', () =>
            logic.registerEater(eaterData.name, eaterData.lastName)
                .catch(({ message }) => expect(message).to.equal('eater email is not a string'))
        )

        it('should fail on empty eater email', () =>
            logic.registerEater(eaterData.name, eaterData.lastName, '')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on blank eater email', () =>
            logic.registerEater(eaterData.name, eaterData.lastName, '     ')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on no eater password', () =>
            logic.registerEater(eaterData.name, eaterData.lastName, eaterData.email)
                .catch(({ message }) => expect(message).to.equal('eater password is not a string'))
        )

        it('should fail on empty eater password', () =>
            logic.registerEater(eaterData.name, eaterData.lastName, eaterData.email, '')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )

        it('should fail on blank eater password', () =>
            logic.registerEater(eaterData.name, eaterData.lastName, eaterData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )
    })

    describe('authenticate eater', () => {
        it('should succeed on correct data', () => {
            return Eater.create(eaterData)
                .then(eater => {
                    return logic.authenticateUser('jd@mail.com', '123')
                        .then(id => expect(id).to.exist)
                })
        })

        it('should fail on no eater email', () =>
            logic.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('eater email is not a string'))
        )

        it('should fail on empty eater email', () =>
            logic.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on blank eater email', () =>
            logic.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on no eater password', () =>
            logic.authenticateUser(eaterData.email)
                .catch(({ message }) => expect(message).to.equal('eater password is not a string'))
        )

        it('should fail on empty eater password', () =>
            logic.authenticateUser(eaterData.email, '')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )

        it('should fail on blank eater password', () =>
            logic.authenticateUser(eaterData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )
    })

    describe('retrieve eater', () => {
        it('should succeed on correct data', () =>
            Eater.create(eaterData)
                .then(({ id }) => {
                    return logic.retrieveEater(id)
                })
                .then(eater => {
                    expect(eater).to.exist

                    const { name, lastName, email, _id, password, orders } = eater

                    expect(name).to.equal('John')
                    expect(lastName).to.equal('Doe')
                    expect(email).to.equal('jd@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(orders).to.be.undefined
                })
        )

        it('should fail on no eater id', () =>
            logic.retrieveEater()
                .catch(({ message }) => expect(message).to.equal('eater id is not a string'))
        )

        it('should fail on empty eater id', () =>
            logic.retrieveEater('')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )

        it('should fail on blank eater id', () =>
            logic.retrieveEater('     ')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )
    })

    describe('udpate eater', () => {
        it('should succeed on correct data', () =>
            Eater.create(eaterData)
                .then(({ id }) => {
                    return logic.updateEater(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return Eater.findById(id)
                        })
                        .then(eater => {
                            expect(eater).to.exist

                            const { name, lastName, email, password } = eater

                            expect(eater.id).to.equal(id)
                            expect(name).to.equal('Jack')
                            expect(lastName).to.equal('Wayne')
                            expect(email).to.equal('jw@mail.com')
                            expect(password).to.equal('456')
                        })
                })
        )

        it('should fail on changing email to an already existing eater\'s email', () =>
            Promise.all([
                Eater.create(eaterData),
                Eater.create(otherEaterData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const { name, lastName, email, password } = eaterData

                    return logic.updateEater(id1, name, lastName, email, password, otherEaterData.email)
                })
                .catch(({ message }) => expect(message).to.equal(`eater with email ${otherEaterData.email} already exists`))
        )

        it('should fail on no eater id', () =>
            logic.updateEater()
                .catch(({ message }) => expect(message).to.equal('eater id is not a string'))
        )

        it('should fail on empty eater id', () =>
            logic.updateEater('')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )

        it('should fail on blank eater id', () =>
            logic.updateEater('     ')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )

        it('should fail on no eater name', () =>
            logic.updateEater(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('eater name is not a string'))
        )

        it('should fail on empty eater name', () =>
            logic.updateEater(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('eater name is empty or blank'))
        )

        it('should fail on blank eater name', () =>
            logic.updateEater(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('eater name is empty or blank'))
        )

        it('should fail on no eater lastName', () =>
            logic.updateEater(dummyUserId, eaterData.name)
                .catch(({ message }) => expect(message).to.equal('eater lastName is not a string'))
        )

        it('should fail on empty eater lastName', () =>
            logic.updateEater(dummyUserId, eaterData.name, '')
                .catch(({ message }) => expect(message).to.equal('eater lastName is empty or blank'))
        )

        it('should fail on blank eater lastName', () =>
            logic.updateEater(dummyUserId, eaterData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('eater lastName is empty or blank'))
        )

        it('should fail on no eater email', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName)
                .catch(({ message }) => expect(message).to.equal('eater email is not a string'))
        )

        it('should fail on empty eater email', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName, '')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on blank eater email', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName, '     ')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on no eater password', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName, eaterData.email)
                .catch(({ message }) => expect(message).to.equal('eater password is not a string'))
        )

        it('should fail on empty eater password', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName, eaterData.email, '')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )

        it('should fail on blank eater password', () =>
            logic.updateEater(dummyUserId, eaterData.name, eaterData.lastName, eaterData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )
    })

    describe('unregister eater', () => {
        it('should succeed on correct data', () =>
            Eater.create(eaterData)
                .then(({ id }) => {
                    return logic.unregisterEater(id, 'jd@mail.com', '123')
                        .then(res => {
                            expect(res).to.be.true

                            return Eater.findById(id)
                        })
                        .then(eater => {
                            expect(eater).to.be.null
                        })
                })
        )

        it('should fail on no eater id', () =>
            logic.unregisterEater()
                .catch(({ message }) => expect(message).to.equal('eater id is not a string'))
        )

        it('should fail on empty eater id', () =>
            logic.unregisterEater('')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )

        it('should fail on blank eater id', () =>
            logic.unregisterEater('     ')
                .catch(({ message }) => expect(message).to.equal('eater id is empty or blank'))
        )

        it('should fail on no eater email', () =>
            logic.unregisterEater(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('eater email is not a string'))
        )

        it('should fail on empty eater email', () =>
            logic.unregisterEater(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on blank eater email', () =>
            logic.unregisterEater(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('eater email is empty or blank'))
        )

        it('should fail on no eater password', () =>
            logic.unregisterEater(dummyUserId, eaterData.email)
                .catch(({ message }) => expect(message).to.equal('eater password is not a string'))
        )

        it('should fail on empty eater password', () =>
            logic.unregisterEater(dummyUserId, eaterData.email, '')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )

        it('should fail on blank eater password', () =>
            logic.unregisterEater(dummyUserId, eaterData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('eater password is empty or blank'))
        )
    })

    describe('list all courses', () => {
        it('should succeed on correct data', () => {

            Promise.all([
                Course.create(firstCourse1), Course.create(secondCourse1), Course.create(firstCourse2), Course.create(secondCourse2), Course.create(firstCourse3), Course.create(secondCourse3), Course.create(firstCourse4), Course.create(secondCourse4), Course.create(firstCourse5), Course.create(secondCourse5)])
                .then(res => {
                    expect(res.length).to.equal(10)

                    for (let i in res) {
                        expect(res[i]._id).to.exist
                        expect(res[i]._image).not.to.equal(res[i+1]._image)
                        expect(res[i].category['firstCourse']).to.equal('firstCourse')
                        
                    }
                })
        })
    })


    describe('list course by current day', () => {
        it('list course', () => {

            logic.listCoursesByDay()
                .then(course => {
                    
        
                    return course
                })
                        
            })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))

})
