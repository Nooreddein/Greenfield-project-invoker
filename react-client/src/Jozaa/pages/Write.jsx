//to work react
import React from 'react';
//to work in ajax
import $ from 'jquery';
//library for style
//const Fan = require('react-fontawesome');
//the style for the main header
const header={
  color:'black',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'40px',
  fontFamily: 'Lobster',
};
//the style for number
const number={
  color:'#7a00a3',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};

//the style for first name
const fName={
  color:'#7a00a3',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for last name
const lName={
  color:'#7a00a3',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};


/*
number
firstName
lastName
gender
age
phone
conditions
past_Diseases
currentlly_Medications
genetic_Diseases
allergies
description

*/


//the style for the user
const user={
  color:'#1B5494',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for the password
const password={
  color:'#bb280e',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for the user and password input
const input={
  padding: '10px 10px 10px 10px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  color:'black',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};
//the style for the button Sign Up
const button={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid #123456',
  marginTop:'20px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};

//the page login what inside render
class Write extends React.Component {
  //constructor to undestand state
  constructor(){
    super();
    //all the data save before sent in state
    this.state={
      firstName:'',
      lastName: '',
      userName: '',
      password: ''
    };
  }
  //when change  ... change the
  //first name
  onWrite1 (e) {
    this.setState({
      firstName: e.target.value,
    });
  };
  //last name
  onWrite2 (e) {
    this.setState({
      lastName: e.target.value,
    });
  };
  //username
  onWrite3 (e) {
    this.setState({
      userName: e.target.value,
    });
  };
  //password
  onWrite4 (e) {
    this.setState({
      password: e.target.value,
    });
  };
  //for sign in button
  saveUser() {
    console.log(`YOU MAKE NEW USER :  ${this.state.firstName} ${this.state.lastName} ${this.state.userName} ${this.state.password} `);
    const that=this;
    //ajax request to sent the data to server then data base
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {
        firstName: `${this.state.firstName}`,
        lastName: `${this.state.lastName}`,
        userName: `${this.state.userName}`,
        password: `${this.state.password}`
      },
      //when success do this
      success: function (res) {
        alert('SUCCESS SIGN UP GO TO LOGIN PAGE NOW D.'+`${that.state.userName}`);
        console.log('SUCCESS SIGN UP');
      },
      //when error do this
      error: function (res){
        alert('FAILED SIGN UP');
        console.log('FAILED SIGN UP')
      },
    });
  };
  //what render -----------------need change style to be nice
  render () {
    return (
      <div>
        <h2 style={header}>Welcome To Medical Record <br/> Please Insert Your Information // or signout</h2>

        <h3 style={fName}>First name:
          <input value={this.state.firstName} onChange={this.onWrite1.bind(this)} placeholder="First name" style={input}>
          </input>
        </h3>
        <h3 style={lName}>Last name:
          <input value={this.state.lastName} onChange={this.onWrite2.bind(this)} placeholder="Last name" style={input}>
          </input>
        </h3>
        <h3 style={user}>Username:
         <input value={this.state.userName} onChange={this.onWrite3.bind(this)} placeholder="Username" style={input}>
         </input>
        </h3>
        <h3 style={password}>Password:
         <input type='password' value={this.state.password} onChange={this.onWrite4.bind(this)} placeholder="Password" style={input}>
         </input>
        </h3>
        <button onClick={this.saveUser.bind(this)} style={button}>Sign Up</button>
      </div>
    )
  }
}
//export this component to can use
export default Write;