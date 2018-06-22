import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import Alert from 'react-s-alert'

class Register extends Component {

    constructor() {
        super()
        this.state = {
            isLogged: false,
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleRegister = (e) => {
        e.preventDefault()

        const { name, lastName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) { Alert.error('Passwords are not matching') }

        if (password === confirmPassword) {
            if (name !== "" || lastName !== "" || email !== "" || password !== "") {

                logic.registerEater(name, lastName, email, password)
                    .then(res => {
                        if (res) {
                            this.props.history.push('/login')
                        } else {
                            console.log('Error, username and/or password wrong')
                        }
                    })
                    .catch(err => console.error(err.message))
            }
        }
    }

    handleName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleLastName = (e) => {
        this.setState({ lastName: e.target.value })
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value })
    }

    render() {
        return (
            <section className="gerds-bckg">
                <div className="container">
                    <div className="row">
                        <div className="form center col s6 offset-s3 z-depth-1">
                            <h5 id="title">Register</h5>
                            <form onSubmit={this.handleRegister}>

                                <div className="input-field" id="name">
                                    <input value={this.state.name} onChange={this.handleName} type="text" className="validate" autoFocus />
                                    <label htmlFor="username">
                                        Name</label>
                                </div>

                                <div className="input-field" id="lastName">
                                    <input value={this.state.lastName} onChange={this.handleLastName} type="text" className="validate" />
                                    <label htmlFor="lastName">
                                        Last name</label>
                                </div>

                                <div className="input-field" id="lastName">
                                    <input value={this.state.email} onChange={this.handleEmail} type="email" />
                                    <label htmlFor="lastName">
                                        Email</label>
                                </div>

                                <div className="input-field" id="password">
                                    <input value={this.state.password} onChange={this.handlePassword} type="Password" className="validate" />
                                    <label htmlFor="password">
                                        Password</label>
                                </div>

                                <div className="input-field" id="password">
                                    <input value={this.state.confirmPassword} onChange={this.handleConfirmPassword} type="password" className="validate" />
                                    <label htmlFor="password">
                                        Repeat password</label>
                                </div>

                                <br />
                                <div className="login-buttons">
                                    <button className="waves-effect pink  waves-light btn" id="loginbtn" type='submit'>Register →</button>
                                </div>
                                <br />

                                <a href="#/login" className="back-to-login"> Already with us? Sign in here</a>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Register