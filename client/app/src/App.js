import React, { Component } from 'react';
import { Login, Landing, Header, Register, Order, Todaymenu } from '../src/components'
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()
    this.state = {
      firstCourse: '',
      secondCourse: ''
    }
  }

  addCourse = (category, courseId) => {
    if (category === 'firstCourse') {
      this.setState({ firstCourse: courseId })
    }
    if (category === 'secondCourse') {
      this.setState({ secondCourse: courseId })
    }
  }

  resetState = () => {
    this.setState({
      firstCourse: '',
      secondCourse: ''
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/todaymenu" render={(props) => (
              <Todaymenu
                resetState={this.resetState}
                history={props.history}
                addCourse={this.addCourse}
                firstCourse={this.state.firstCourse}
                secondCourse={this.state.secondCourse}
                onClick={this.onClick}
              />
            )} />
            <Route path="/order" render={() => (
              <Order
                firstCourse={this.state.firstCourse}
                secondCourse={this.state.secondCourse}
              />
            )} />

          </Switch>
        </div>
      </div>

    );
  }
}

export default App;