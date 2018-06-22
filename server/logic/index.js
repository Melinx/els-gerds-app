'use strict'

const { mongoose, models: { Eater, Course, Order, Payment } } = require('data')

const logic = {
    /**
     * 
     * @description - registers a user. Users are called 'eaters' in this app.
     * 
     * @param {string} name
     * @param {string} lastName
     * @param {string} email
     * @param {string} password
     * @param {(string)} age
     * @param {(string)} yearOfBirth
     *
     * @returns {Promise<boolean>}
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

                return Eater.findOne({ email })
                    .then((res) => {
                        if (res) throw Error(`Eater with email ${email} already exists`)

                        return Eater.create({ name, lastName, email, password })
                            .then(() => true)
                    })
            })
    },


    /**
     * @description - authentication will return a user id and their token.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateEater(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('eater email is not a string')

                if (!(email = email.trim()).length) throw Error('eater email is empty or blank')

                if (typeof password !== 'string') throw Error('eater password is not a string')

                if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank')

                return Eater.findOne({ email, password })
            })
            .then(eater => {
                if (!eater) throw Error('wrong credentials')

                return eater._id
            })
    },

    /**
     * 
     * @description - retrieves an eater.
     * 
     * @param {string} id
     * 
     * @returns {Promise<Object>} 
     */
    retrieveEater(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('eater id is not a string')

                if (!(id = id.trim()).length) throw Error('eater id is empty or blank')

                return Eater.findById(id).select({ _id: 0, name: 1, lastName: 1, email: 1 })
            })
            .then(eater => {
                if (!eater) throw Error(`no eater found with id ${id}`)

                return eater
            })
    },

    /**
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

                return Eater.findOne({ email, password })
            })
            .then(eater => {
                if (!eater) throw Error('wrong credentials')

                if (eater.id !== id) throw Error(`no eater found with id ${id} for given credentials`)

                if (newEmail) {
                    return Eater.findOne({ email: newEmail })
                        .then(_user => {
                            if (_user && _user.id !== id) throw Error(`eater with email ${newEmail} already exists`)

                            return eater
                        })
                }

                return eater
            })
            .then(eater => {
                eater.name = name
                eater.lastName = lastName
                eater.email = newEmail ? newEmail : email
                eater.password = newPassword ? newPassword : password

                return eater.save()
            })
            .then(() => true)
    },

    /**
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

                return Eater.findOne({ email, password })
            })
            .then(eater => {
                if (!eater) throw Error('wrong credentials')

                if (eater.id !== id) throw Error(`no eater found with id ${id} for given credentials`)

                return eater.remove()
            })
            .then(() => true)
    },

    /**
     * 
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
                let dayAvail = today.getDay()
                let category = first !== 'true' ? 'firstCourse' : 'secondCourse';

                return Course.find({ category, dayAvail })
                    .then((courses) => {
                        if (!courses) throw Error(`no courses were found on ${currentDay}`)
                        return courses
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
                return Course.findByIdAndUpdate({ _id: id }, { $inc: { "amount": -1 } }, { new: true })
                    .then((amount) => {

                        return amount
                    })
            })
    },

    /**
     * 
     * @description - creates new course
     * 
     * @param {<String>} category - firstCourse || secondCourse
     * @param {<String>} image
     * @param {<String>} dishName
     * @param {<(String)>} temp - optional; could determine suitability of dishes according to season of the year. ie, in summer, less hot and more cold for firstCourse.
     * @param {<(String)>} baseFood - optional; could be useful to determine whether a combination of first and second course is appropriate. Suggesting menus according to customer's food priorities (vegetarian friendly, etc) 
     * @param {<Number>} amount - function getCourseAmountLeftByDay() updated this field
     * 
     * @returns {Promise<Boolean>} 
     * 
     */

    createCourse(category, image, dishName, temp, baseFood, dayAvail, amount) {
        return Promise.resolve()
            .then(() => {
                if (typeof category !== 'string') throw Error('course category is not a string')

                if (!(category = category.trim()).length) throw Error('course category is empty or blank')

                if (typeof image !== 'string') throw Error('course image is not a string')

                if (!(image = image.trim()).length) throw Error('course image is empty or blank')

                if (typeof dishName !== 'string') throw Error('course dishName is not a string')

                if (!(dishName = dishName.trim()).length) throw Error('course dishName is empty or blank')

                if (typeof temp !== 'string') throw Error('course temp is not a string')

                if (!(temp = temp.trim()).length) throw Error('course temp is empty or blank')

                if (typeof baseFood !== 'string') throw Error('course baseFood is not a string')

                if (!(baseFood = baseFood.trim()).length) throw Error('course baseFood is empty or blank')

                if (typeof dayAvail !== 'string') throw Error('course dayAvail is not a string')

                if (!(dayAvail = dayAvail.trim()).length) throw Error('course dayAvail is empty or blank')

                return Course.findOne({ dishName })
                    .then((res) => {
                        if (res) throw Error(`Course with dishName ${dishName} already exists`)

                        return Course.create({ category, image, dishName, temp, baseFood, dayAvail, amount })
                            .then(() => true)
                    })
            })
    },

    /**
     * 
     * @description - returns first and second course selection before proceeding w creating order.
     * 
     * @param {<String>} - ids (of first or second course)
     * 
     * @returns {Promise<Object>} 
     */
    
    retrieveCourses(ids) {
        return Promise.resolve()
            .then(() => {
                // if (!Array.isArray(ids)) throw Error('courses are not an array')

                if (ids.length < 2) throw Error('should be 2 courses')

                return Course.find({ _id: { $in: ids } })
            })
            .then(course => {
                if (!course) throw Error(`no eater found with id ${id}`)

                return course
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

                if (typeof eaterId !== 'string') throw Error('eater id is not a string')
                if (!(eaterId = eaterId.trim()).length) throw Error('eater id is empty or blank')
                if (typeof firstCourse !== 'string') throw Error('first course id is not a string')
                if (!(firstCourse = firstCourse.trim()).length) throw Error('first course id is empty or blank')
                if (typeof secondCourse !== 'string') throw Error('second course id is not a string')
                if (!(secondCourse = secondCourse.trim()).length) throw Error('second course id is empty or blank')

                const today = new Date();
                const date = today.toLocaleDateString()

                return Order.create({ eaterId, date, firstCourse, secondCourse, pickupTime, statusPaid })
                    .then((res) => {
                        return res
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
                const date = new Date().toLocaleDateString()
                return Order.find({ date: date })
            }).then((orders) => {
                return orders.length
            })
    }

}
module.exports = logic

