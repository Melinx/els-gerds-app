const eatersApi = require('api')

eatersApi.url = 'https://thawing-ocean-95909.herokuapp.com/api'

const logic = {
    userId: 'NO-ID',

    eaterId(eaterId) {
        if (eaterId) {
            this._eaterId = this.eaterId
            return
        }
        return this._eaterId
    },
    
    isLogged(){
        return eatersApi.token() ? true : false
    },

    registerEater(name, surname, email, password) {
        return eatersApi.registerEater(name, surname, email, password)
            .then(() => {
                return true
            })
    },

    login(email, password) {
        return eatersApi.authenticateEater(email, password)
            .then(id => {
                this.eaterId(id)

                return id
            })
    },

    logout(){
        sessionStorage.clear();
        this.userId = 'NO-ID'
     
        return true
    },

    retrieveCourses(first, second){
        return eatersApi.retrieveCourses(first, second)
        .then(res => {
            return res
        })    
    },

    getTicket(){
        return eatersApi.countOrdersByDay()
        .then(res => {
            const ticket = new Date().getDate() + '-00' + res
            return ticket
        })
    },

  
 
}

module.exports = logic