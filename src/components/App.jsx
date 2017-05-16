import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { addReminder } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      text: ''
    }
  }

  addReminder(){
    console.log('this',this);
    this.props.addReminder(this.state.text);
  }

  renderReminder(){
    const { reminders } = this.props;
    return(
      <ul className="list-group col-sm-4">
        {
        reminders.map(reminder =>{
        return(
          <li key={reminder.id} className="list-group-item">
            <div>{ reminder.text}</div>
          </li>
        )
      })
    }
      </ul>
    )

  }
render (){
  console.log('this.props', this.props);
  return(
    <div className="App">
      <div className="title">
        Reminder Pro
      </div>
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="I have to ..."
            onChange={event => this.setState({text: event.target.value})}
            />
        </div>
        { this.renderReminder() }
        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.addReminder()}
          >
          Add Reminder
        </button>
      </div>
    </div>
  )
}
}

function mapStateToProps(state){

  return{
    reminders:state
  }
}
export default connect(mapStateToProps, { addReminder })(App);
