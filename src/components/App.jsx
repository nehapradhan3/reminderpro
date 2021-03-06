import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminder } from '../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    console.log('this.state.dueDate', this.state.dueDate);

    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){

    this.props.deleteReminder(id);
  }

  renderReminder(){
    const { reminders } = this.props;
    return(
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder =>{
            return(
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{ reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div className="list-item delete-button"
                  onClick={() =>
                    this.deleteReminder(reminder.id)}
                    >
                    &#x2715;
                  </div>
                </li>

              )
            })
          }
        </ul>
      )

    }
    render (){

      return(
        <div className="App">
          <div className="title">
            Reminder Pro--for--America trip
          </div>
          <div className="form-inline reminder-form">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="I have to ..."
                onChange={event => this.setState({text: event.target.value})}
                />
            </div>
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})}
              />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.addReminder()}
              >
              Add Reminder
            </button>

          </div>
          { this.renderReminder() }
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.props.clearReminder()}
              >
              Clear Reminder
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
  export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder })(App);
