'use strict';

var axios = require('axios');

var eatersApi = {
    url: 'NO-URL',

    // token: 'NO-TOKEN',

    token: function token(_token) {
        if (_token) {
            this._token = this.token;
            return;
        }
        return this._token;
    },


    /**
     * @param {string} name
     * @param {string} lastName
     * @param {string} gmail
     * @param {string} password
     *
     * @returns {Promise<boolean>}
     */

    registerEater: function registerEater(name, lastName, email, password) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string') throw Error('eater name is not a string');

            if (!(name = name.trim()).length) throw Error('eater name is empty or blank');

            if (typeof lastName !== 'string') throw Error('eater lastName is not a string');

            if ((lastName = lastName.trim()).length === 0) throw Error('eater lastName is empty or blank');

            if (typeof email !== 'string') throw Error('eater email is not a string');

            if (!(email = email.trim()).length) throw Error('eater email is empty or blank');

            if (typeof password !== 'string') throw Error('eater password is not a string');

            if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank');

            return axios.post(_this.url + '/eaters', { name: name, lastName: lastName, email: email, password: password }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */

    authenticateEater: function authenticateEater(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('eater email is not a string');

            if (!(email = email.trim()).length) throw Error('eater email is empty or blank');

            if (typeof password !== 'string') throw Error('eater password is not a string');

            if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token(token);

                return id;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<Eater>} 
     */

    retrieveEater: function retrieveEater(eaterId) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('eater id is not a string');

            if (!(id = id.trim()).length) throw Error('eater id is empty or blank');

            //     return Eater.findById(id).select({ _id: 0, name: 1, lastName: 1, email: 1 })
            // 
            return axios.get(_this3.url + '/eaters/' + id, { headers: { authorization: 'Bearer ' + _this3.token() } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} lastName 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */

    updateEater: function updateEater(id, name, lastName, email, password, newEmail, newPassword) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('eater id is not a string');

            if (!(id = id.trim()).length) throw Error('eater id is empty or blank');

            if (typeof name !== 'string') throw Error('eater name is not a string');

            if (!(name = name.trim()).length) throw Error('eater name is empty or blank');

            if (typeof lastName !== 'string') throw Error('eater lastName is not a string');

            if ((lastName = lastName.trim()).length === 0) throw Error('eater lastName is empty or blank');

            if (typeof email !== 'string') throw Error('eater email is not a string');

            if (!(email = email.trim()).length) throw Error('eater email is empty or blank');

            if (typeof password !== 'string') throw Error('eater password is not a string');

            if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank');

            return axios.patch(_this4.url + '/eaters/' + id, { name: name, lastName: lastName, email: email, password: password, newEmail: newEmail, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this4.token() } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */

    unregisterEater: function unregisterEater(id, email, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('eater id is not a string');

            if (!(id = id.trim()).length) throw Error('eater id is empty or blank');

            if (typeof email !== 'string') throw Error('eater email is not a string');

            if (!(email = email.trim()).length) throw Error('eater email is empty or blank');

            if (typeof password !== 'string') throw Error('eater password is not a string');

            if ((password = password.trim()).length === 0) throw Error('eater password is empty or blank');

            return axios.delete(_this5.url + '/eaters/' + id, { headers: { authorization: 'Bearer ' + _this5.token() }, data: { email: email, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * DOCUM:
     * 
     * Should list courses each day of the week. 
     * 
     * @returns {Promise<string>}
     */

    listCoursesByDay: function listCoursesByDay() {
        var _this6 = this;

        var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return Promise.resolve().then(function () {
            var today = new Date();
            var currentDay = today.getDay();

            return axios.get(_this6.url + '/courses/' + first).then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    createOrder: function createOrder(eaterId, firstCourse, secondCourse, pickupTime, statusPaid) {
        var _this7 = this;

        return Promise.resolve().then(function () {
            // TODO Validations
            return axios.post(_this7.url + '/eaters/order/' + eaterId, { firstCourse: firstCourse, secondCourse: secondCourse, pickupTime: pickupTime, statusPaid: statusPaid }, { headers: { authorization: 'Bearer ' + _this7.token() } }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var error = err.response.data.error;


                    throw Error(error);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @params { array } - ids
     * @returns {Promise<Courses>} - two course objects, one for first course and the other for second course.
     * 
     * Will pass the ids to createOrder.
     */

    retrieveCourses: function retrieveCourses(firstCourseId, secondCourseId) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            // TODO validations

            return axios.get(_this8.url + '/courses/ids?first=' + firstCourseId + '&second=' + secondCourseId, { headers: { authorization: 'Bearer ' + _this8.token() } }).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;

                    return message;
                } else throw err;
            });
        });
    },
    countOrdersByDay: function countOrdersByDay() {
        var _this9 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this9.url + '/todayorders').then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;

                    return message;
                } else throw err;
            });
        });
    },
    getCourseAmountLeftByDay: function getCourseAmountLeftByDay(id) {
        var _this10 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this10.url + '/courses/amount/' + id).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;

                    return message;
                } else throw err;
            });
        });
    }
};

module.exports = eatersApi;
