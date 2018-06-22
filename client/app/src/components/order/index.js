import React, { Component } from 'react'
import api from 'api'
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert'

import './index.css'
import logic from '../../logic'


class Order extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ids: '',
      firstCourse: [],
      secondCourse: [],
      firstCourseImage: '',
      secondCourseImage: '',
      firstCourseName: '',
      secondCourseName: '',
      payment: false,
      pickupTime: '',
      timeOrdered: '',
      ticket: ''
    }
  }

  componentDidMount() {

    const { firstCourse, secondCourse } = this.props

    logic.retrieveCourses(firstCourse, secondCourse)
      .then(res => {
        this.setState({
          firstCourseName: res.course[0].dishName,
          firstCourseImage: res.course[0].image,
          secondCourseName: res.course[1].dishName,
          secondCourseImage: res.course[1].image,

        })
      }).catch(err => console.error(err.message))
  }


  handlePickup = (e) => {
    const pickupTime = e.target.value
    this.setState({ pickupTime })
  }

  checkTime = () => {
    let d = new Date()
    let time = d.getHours()
    if (time < 23) return true
  }

  getTicket = () => {
    this.state.pickupTime ?
      logic.getTicket()
        .then(ticket => {
          this.setState({ ticket })
        })
      :
      null
  }

  // WARNING - The order can ONLY be placed if it's BEFORE 11am. For DEMO, modify checkTime function above to appropriate time number.
  createOrder = () => {

    if (this.checkTime() === true) {
      const { firstCourse, secondCourse } = this.props
      const { pickupTime } = this.state
      const statusPaid = true
      const eaterId = logic.eaterId()
      const ticket = this.getTicket()

      if (pickupTime === '') {
        return Alert.info('Please select a pick-up time ')
      } else {
        api.createOrder(eaterId, firstCourse, secondCourse, pickupTime, statusPaid)
          .then(order => {
            return Promise.all([api.getCourseAmountLeftByDay(order.data.firstCourse), api.getCourseAmountLeftByDay(order.data.secondCourse)])
          }).then((res) => {
            return res
          })

      }
    } else {
      Alert.warning('OH, NO! You were late.')
    }

  }

  render() {

    const { firstCourse, secondCourse } = this.props

    return (
      this.state.ticket ?

        <section>
          <div className="container order">
            <div className="row">
              <div className="col s12 m12 hola">
                <div className="card-panel center">
                  <h5>Confirmation Number: <span className="conf"> {this.state.ticket}</span> </h5>
                  <hr />
                  <h5>Pick-up Time: <span className="time">{this.state.pickupTime}</span> </h5>
                </div>
                <div className="center row">

                  <Link to="/todaymenu" className=" btn-large waves-effect waves-light orange hola">get more food?</Link>
                </div>
              </div>
            </div>
            <section className="thankyou">
              <div className="animated slideInLeft ty-txt ">Thank
              <img className=' thanks-image' src="http://res.cloudinary.com/elsgerds/image/upload/o_63/v1529495503/gerd.png" alt="" />
                <div className="animated slideInRight ty-txt ">You :)</div>
              </div>
              <hr />
            </section>

          </div>
        </section>

        :

        <section>
          <section className="section section-icons grey lighten-4 center">
            <div className="container">
              <div className="row">
                <div className="col s12 m8">
                  <div className="card-panel">
                    <h5 className="center">You have selected:</h5>
                    <hr />
                    <div className="row">
                      <div className="col s12 m6">
                        <h6>{this.state.firstCourseName}</h6>
                        <img src={this.state.firstCourseImage} className="center materialboxed responsive-img" alt="" />
                      </div>
                      <div className="col s12 m6">
                        <h6>{this.state.secondCourseName}</h6>
                        <img src={this.state.secondCourseImage} className="center materialboxed responsive-img" alt="" />
                      </div>
                      <div>

                        <Link to="/todaymenu" className="waves-effect pink  waves-light btn backtomenu" >Back to Menu</Link>
                        <Alert effect='bouncyflip' offset={150} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="card-panel">
                    <h5>Pick-up time?</h5>
                    <hr />
                    <select onChange={this.handlePickup} name="Hours" id="pick-time">
                      <option value="" disabled selected>-</option>
                      <option value="12:15">12:15</option>
                      <option value="12:30">12:30</option>
                      <option value="12:45">12:45</option>
                      <option value="13:00">13:00</option>
                      <option value="13:15">13:15</option>
                      <option value="13:30">13:30</option>
                      <option value="13:45">13:45</option>
                      <option value="14:00">14:00</option>
                      <option value="14:15">14:15</option>
                      <option value="14:30">14:30</option>
                      <option value="14:45">14:45</option>
                    </select>
                  </div>
                </div>
                <div className="col s12 m4">
                  <div className="card-panel">
                    <h5>Please pay:</h5>
                    <hr />
                    <h4>5€</h4>
                    <button className="waves-effect pink  waves-light btn" onClick={this.createOrder}> Proceed </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

    );
  }
}





export default Order