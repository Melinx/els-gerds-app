'use strict'

const { expect } = require('chai')
const logic = require('.')
const notesApi = require('api')

describe('logic (my-app)', () => {
    const eaterData = { name: 'John', lastName: 'Doe', email: 'jd@mail.com', password: '123' }

    beforeEach(done => {
        const { email, password } = eaterData

        notesApi.authenticateEater(email, password)
            .then(id => 
                eatersApi.unregisterEater(id, email, password)
            )
            .then(() => done())
            .catch(() => done())
    })

    describe('register', () => {
        it('should succeed on correct data', () => {
            const { name, lastName, email, password } = eaterData

            return logic.registerEater(name, lastName, email, password)
                .then(res => expect(res).to.be.true)
        })
    })

    describe('login', () => {
        it('should succeed on correct data', () => {
            const { name, lastName, email, password } = userData

            return notesApi.registerUser(name, lastName, email, password)
                .then(() => logic.login(email, password))
                .then(res => {
                    expect(res).to.be.true

                    expect(logic.userId).not.to.equal('NO-ID')
                })
        })
    })
})