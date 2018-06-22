'use strict'

const axios = require('axios')

const eatersApi = {
    url: 'NO-URL',

    token(token) {
        if (token) {
            this._token = this.token
            return
        }
        return this._token
    },

    /**
     * 
     * @description - registers a user. Users are called 'eaters' in this app.
     * 
     * @param {String} name
     * @param {String} lastName
     * @param {String} gmail
     * @param {String} password
     * @param {(String)} age
     * @param {(String)} yearOfBirth
     *
     * @returns {Promise<Boolean>}
     */

    registerEater(name, lastName, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('eater name is not a string')

                if (!(name = name.trim()).length) throw Error('eater name is empty or blank')

                if (typeof lastName !== 'string') throw Error('eater lastName is not a string')

                if ((lastName = lastName.trim()).length === 0) throw Error('eater lastName is empty or blank')

                if (typeof email !== 'string') throw Error('eater email is not a string')

                if (!(email = email.trim()).length) throw Error('eater email is empty or blank')

                if (typeof password !== 'string') throw Error('eater password is not a string')

                if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank')


                return axios.post(`${this.url}/eaters`, { name, lastName, email, password })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },


    /**
     * 
     * @description - authentication will return a user id and their token.
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Promise<String>}
     */

    authenticateEater(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('eater email is not a string')

                if (!(email = email.trim()).length) throw Error('eater email is empty or blank')

                if (typeof password !== 'string') throw Error('eater password is not a string')

                if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        const { data: { id, token } } = data

                        this.token(token)

                        return id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @description - retrieves an eater.
     * 
     * @param {String} id
     * 
     * @returns {Promise<Object>} 
     */

    retrieveEater(eaterId) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('eater id is not a string')

                if (!(id = id.trim()).length) throw Error('eater id is empty or blank')

                return axios.get(`${this.url}/eaters/${id}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @description - updates existing eater info and/or adds new optional fields.
     * 
     * @param {String} id 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} password 
     * @param {String} newEmail 
     * @param {String} newPassword 
     * 
     * @returns {Promise<Boolean>}
     */

    updateEater(id, name, lastName, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('eater id is not a string')

                if (!(id = id.trim()).length) throw Error('eater id is empty or blank')

                if (typeof name !== 'string') throw Error('eater name is not a string')

                if (!(name = name.trim()).length) throw Error('eater name is empty or blank')

                if (typeof lastName !== 'string') throw Error('eater lastName is not a string')

                if ((lastName = lastName.trim()).length === 0) throw Error('eater lastName is empty or blank')

                if (typeof email !== 'string') throw Error('eater email is not a string')

                if (!(email = email.trim()).length) throw Error('eater email is empty or blank')

                if (typeof password !== 'string') throw Error('eater password is not a string')

                if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank')

                return axios.patch(`${this.url}/eaters/${id}`, { name, lastName, email, password, newEmail, newPassword }, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @description -  unregisters eater.
     * 
     * @param {String} id 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Promise<Boolean>}
     */

    unregisterEater(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('eater id is not a string')

                if (!(id = id.trim()).length) throw Error('eater id is empty or blank')

                if (typeof email !== 'string') throw Error('eater email is not a string')

                if (!(email = email.trim()).length) throw Error('eater email is empty or blank')

                if (typeof password !== 'string') throw Error('eater password is not a string')

                if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank')

                return axios.delete(`${this.url}/eaters/${id}`, { headers: { authorization: `Bearer ${this.token()}` }, data: { email, password } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * @description - lists FIRST and SECOND courses (dishes) separately for each day, according to "first" condition being true or false.
     * 
     * @param {boolean} first
     *
     * @returns {Promise<Array>} - returns Object array with all Courses that belong to selected category for dayAvail (current) day.
     */

    listCoursesByDay(first = false) {
        return Promise.resolve()
            .then(() => {
                const today = new Date()
                let currentDay = today.getDay()

                return axios.get(`${this.url}/courses/${first}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @description - updates the amount of courses left. The default amount of every dish per day is 10, and each order confirmation will subtract 1 from the counter.
     * 
     * @returns {Promise<string>}
     * 
     * @param {id<String>} - id of the course contained by the order.
     * 
     * @returns {Promise<Number>} 
     * 
     */

    getCourseAmountLeftByDay(id) {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/courses/amount/${id}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        
                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err
                            return message
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @description - creates an order containing ONLY 1 first course and ONLY 1 second course. 
     * 
     * @param {<String>} eaterId 
     * @param {<String>} date - it works as a timestamp to know if order was placed on time (by 11am). DEMO modified to a later time to show functionality.
     * @param {<String>} firstCourse 
     * @param {<String>} secondCourse 
     * @param {<String>} pickupTime - will tell the business which time eater will go pick up their food.
     *  
     * @returns {Promise<Object>}
     */

    createOrder(eaterId, firstCourse, secondCourse, pickupTime, statusPaid) {
        return Promise.resolve()
            .then(() => {
                // TODO Validations
                return axios.post(`${this.url}/eaters/order/${eaterId}`, { firstCourse, secondCourse, pickupTime, statusPaid }, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error } } } = err

                            throw Error(error)
                        } else throw err
                    })
            })
    },

    /**
     * @description - retrieves course id to pass it to create Order
     * 
     * @param { <String> } - firstCourseId
     * @param { <String> } - secondCourseId
     * @returns {Promise<Courses>} - two course objects, one for first course and the other for second course.
     * 
     */

    retrieveCourses(firstCourseId, secondCourseId) {
        return Promise.resolve()
            .then(() => {
                // TODO validations

                return axios.get(`${this.url}/courses/ids?first=${firstCourseId}&second=${secondCourseId}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err
                            return message
                        } else throw err
                    })
            })
    },

     /**
     * @description - it returns the amount of orders submitted on the current day, allowing a TICKETING system, so the customer can have an easy order confirmation.
     * 
     * @param {id<String>} 
     * 
     * @returns {Promise<Number>}    
     */

    countOrdersByDay() {
        return Promise.resolve()
            .then(() => {
                return axios.get(`${this.url}/todayorders`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        
                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err
                            return message
                        } else throw err
                    })
            })
    }

}


module.exports = eatersApi
