'use strict'

require('dotenv').config()

const { mongoose, models: { Eater, Course, Order, Payment } } = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('models (myApp)', () => {

    const firstCourse = { category: 'firstCourse', image: 'img1', dishName: 'macarrones', temp: 'cold', baseFood: 'green', dayAvail: '1' }

    const secondCourse = { category: 'secondCourse', image: 'img2', dishName: 'pollo', temp: 'hot', baseFood: 'meat', dayAvail: '1' }

    const john = { name: 'John', lastName: 'Doe', email: 'johndoe@mail.com', password: '123', yearOfBirth: 1988, gender: 'M' }

    const dummyUserId = '123456781234567812345678'
    const dummyOrderId = '123456781234567812345678'
    const dummyFirstCourseId = '123456781234657812345678'
    const dummySecondCourseId = '123456781234567812345678'

    const pepeOrder = { eaterId: '123456781234567812345678', date: '18-06-2018', firstCourse: dummySecondCourseId, secondCourse: dummySecondCourseId, pickupTime: '12:15'}

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all([Eater.remove(), Order.deleteMany(), Course.deleteMany(), Eater.create(john), Course.create(firstCourse)]))

    describe('create course', () => {
        it('should succeed on correct data', () => {
            const course1 = new Course(firstCourse)
            const course2 = new Course(secondCourse)

            return Promise.all([course1.save(), course2.save()])
                .then(courses => {
                    expect(courses.length).to.equal(2)
                    expect(courses.length).not.to.equal(3)

                    const [course1, course2] = courses

                    expect(course1._id).to.exist
                    expect(course1.category).to.equal(firstCourse.category)
                    expect(course1.image).to.equal(firstCourse.image)
                    expect(course1.dishName).to.equal(firstCourse.dishName)
                    expect(course1.temp).to.equal(firstCourse.temp)
                    expect(course1.baseFood).to.equal(firstCourse.baseFood)
                    expect(course1.dayAvail).to.equal(firstCourse.dayAvail)

                    expect(course2._id).to.exist
                    expect(course2.category).to.equal(secondCourse.category)
                    expect(course2.dishName).to.equal(secondCourse.dishName)
                    expect(course2.temp).to.equal(secondCourse.temp)
                    expect(course2.baseFood).to.equal(secondCourse.baseFood)
                    expect(course2.dayAvail).to.equal(secondCourse.dayAvail)
                })
        })
    })

    describe('create order', () => {
        it('should succeed on correct data', () => {
            const course1 = new Course(firstCourse)
            const course2 = new Course(secondCourse)

            return Promise.all([course1.save(), course2.save()])
                .then(courses => {

                    const order1 = new Order(pepeOrder)

                   
                    return Promise.all([Order.create(pepeOrder)])
                        .then(orders => {

                            expect(order1._id).to.exist
                            expect(order1.date).to.exist
                            
                            expect(order1.pickupTime.toString()).to.equal(pepeOrder.pickupTime.toString())

                            expect(order1._id).to.exist
                            expect(order1.date).to.exist
                        })
                })
        })
    })

    describe('create eater', () => {

        it('should succeed on correct data', () => {

            const eater = new Eater(john)

            return eater.save()
                .then(eater => {
                    expect(eater._id).to.exist
                    expect(eater.name).to.equal(john.name) // TODO
                    expect(eater.lastName).to.equal('Doe')
                    expect(eater.email).to.equal('johndoe@mail.com')
                    expect(eater.password).to.equal('123')
                    expect(eater.yearOfBirth).to.equal(1988)
                    expect(eater.gender).to.equal('M')
                })
        })
    })

    describe('create payment', () => {
        it('should succeed on correct payment data', () => {
            const payment = new Payment({ cardHolderName: 'Jane', cardHolderLastName: 'Doe', cardNumber: '1111333344445555', expirationDate: '12/2020' })
            return payment.save()
                .then(payment => {
                    expect(payment._id).to.exist
                    expect(payment.cardHolderName).to.equal('Jane')
                    expect(payment.cardHolderLastName).to.equal('Doe')
                    expect(payment.cardNumber).to.equal('1111333344445555')
                    expect(payment.expirationDate).to.equal('12/2020')
                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))

})