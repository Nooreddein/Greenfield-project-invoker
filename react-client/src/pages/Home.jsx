//to work react
import React from 'react';
//to work in ajax
import $ from 'jquery';
//the style for the main header
const header1={
  color:'black',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'50px',
  fontFamily: 'Lobster',
  marginTop:'2px',
};

//the style for retrieve one patient
const header3={
  color:'black',
  fontWeight:'bold',
  textAlign:'centezr',
  fontSize:'25px',
  fontFamily: 'Lobster',
  marginTop:'5px',
  marginLeft: '200px',
};
//style for input retrieve one patient
const input3={
  padding: '10px 10px 10px 10px',
  marginRight: '-80px',
  marginLeft: '-30px',
  color:'black',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};
//the style for the button retrieve one patient
const button3={
  padding:'6px',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid black',
  fontSize:'20px',
  borderRadius: '15px',
  fontFamily: 'Lobster',
};
//style for th / the const thing
const table={
    border: '3px solid black',
    borderCollapse: 'collapse',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    fontWeight:'bold',
    color:'black',
    backgroundColor: 'white',
}
//style for td / the changed thing
const table2={
    border: '3px solid black',
    borderCollapse: 'collapse',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    //fontWeight:'bold',
    color:'white',
    backgroundColor: 'gray',

}
//the style for the button logout
const button1={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#bb280e',
  color: 'white',
  border: '2px solid #bb280e',
  marginTop:'10px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
//the style for the button create new patient
const button2={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid #123456',
  marginTop:'0px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
//the page home what inside render
class Home extends React.Component {
  constructor(){
    super();
    //all the data save before sent in state
    this.state={
      loggedIn:true,
      patientName:'',
      //the data get from retrieve
      data:{},
      id:0,
      date:'',
      patientName:'',
      situation:'',
      gender:''
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //when change  ... change the
  //patient number
  onWrite1 (e) {
    this.setState({
      patientName: e.target.value,
    });
  };
  //for logout button
  logout(){
    console.log('you try to logoutDR');
    const that=this
    //ajax request to logout
    $.ajax({
      type: 'GET',
      url: '/logout',
      //when success do this
      success: function (res) {
        alert(res);
        that.setState({loggedIn:false});
        window.location.href= window.location.origin+'/login'
      },
      //when error do this
      error: function (){
        alert('Failed logout please try again DR');
        console.log('Failed logout please try again DR');
      },
    }); 
  };
  //for button create new patient
  newPatient(){
    console.log('you try to go to create new patient:');
    window.location.href=window.location.origin+'/newpatient';
  };
  //for retrieve one patient
  retrieveOne(){
    console.log('you try to retrieve one patient', typeof this.state.patientName);
    const that=this
    //ajax request to logout
    $.ajax({
      type: 'GET',
      url: '/patient',
      data:{number:`${that.state.patientName}`},
      //when success do this
      success: function (res) {
        console.log('Sucess retrieve patient have number: ',res[0].number);
        alert('Sucess retrieve patient have number: '+res[0].number);
        that.setState({data:res});
        //console.log(that.state.data);
        that.renderData()
      },
      //when error do this
      error: function (){
        alert('Failed retrieve one patient please try again DR');
        console.log('Failed retrieve one patient please try again DR');
      },
    }); 
  };
  //to save data to can use and render
  renderData(){
    //console.log('HERE: ',this.state.data[0]);
    //i get the data now i neeed to render it
    var data=this.state.data[0]
    console.log('HERE: ',this.state.data[0]);
    $('.number').html(data.number);
    $('.firstName').html(data.firstName);
    $('.lastName').html(data.lastName);
    $('.gender').html(data.gender);
    $('.age').html(data.age);
    $('.phone').html(data.phone);
    $('.conditions').html(data.conditions);
    $('.pastDiseases').html(data.past_Diseases);
    $('.currMedications').html(data.currentlly_Medications);
    $('.geneticDisease').html(data.genetic_Diseases);
    $('.allergies').html(data.allergies);
    $('.description').html(data.description);    
  };
  toggle(){
     $("#hidden").on('click',function(){
        $("#hi").toggle();

    });
   
  } 

  handleChanges(event){
      var name = event.target.name
      var value = event.target.value
      var obj = {}
      obj[name] = value
      this.setState(obj)
      console.log(this.state[name])
  }

  handleSubmit(event) {
    $.ajax({
      type : 'POST',
      url: '/appointments',
      data: {
        userName: this.props.user,
        id: this.state.id,
        date: this.state.date,
        patientName:this.state.patientName,
        situation: this.state.situation,
        gender:this.state.gender
      }, 
      success: (data) => {
        console.log(data.appointments)
        this.props.setAppointments(data.appointments)

      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  } 

  render () {
    return (
        <div1>
          <h2 style={header1}>Retrieve data for patient  by his Name</h2>
          <div2 className='row' style={{marginLeft:'auto',marginRight: 'auto'}}>
            <h3 className='col-xs-4 col-xs-offset-1' style={header3}>Get all info for this patient:</h3>
            <input className='col-xs-1 col-xs-offset-1' value={this.state.patientName} type='text' onChange={this.onWrite1.bind(this)} placeholder="Patient Name" style={input3}></input>
            <button className='col-xs-2 col-xs-offset-1' onClick={this.retrieveOne.bind(this)} style={button3}>Show the data now</button>
          </div2>
          <div3>
            <table style={{width:'80%',marginLeft:'auto',marginRight: 'auto',marginTop:'20px'}}>
              <tr>
                <th style={table}>Number</th>
                <th style={table}>First name</th> 
                <th style={table}>Last name</th>
                <th style={table}>Gender</th>
              </tr>
              <tr>
                <td className='number' value='tttttt' style={table2}></td>
                <td className='firstName' style={table2}></td>
                <td className='lastName' style={table2}></td>
                <td className='gender' style={table2}></td>
              </tr>
              <tr>
                <th style={table}>Age</th>
                <th style={table}>Phone</th> 
                <th style={table}>Conditions</th>
                <th style={table}>Past Diseases</th>
              </tr>
              <tr>
                <td className='age' style={table2}></td>
                <td className='phone' style={table2}></td>
                <td className='conditions' style={table2}></td>
                <td className='pastDiseases' style={table2}></td>
              </tr>
              <tr>
                <th style={table}>Curr. Medications</th>
                <th style={table}>Genetic Diseases</th>
                <th style={table}>Allergies</th> 
                <th style={table}>Description</th>
              </tr>
              <tr>
                <td className='currMedications' style={table2}></td>
                <td className='geneticDisease' style={table2}></td>
                <td className='allergies' style={table2}></td>
                <td className='description' style={table2}></td>
              </tr> 
            </table>
          </div3>
          <div4 className='row'> 
             <div  style = {{marginRight: 'auto', marginLeft: 'auto', marginTop: '10px', width:" 600px"}}className="container">
          <div className = 'center'>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button  style={button2} className="btn btn-secondary"onClick={this.newPatient.bind(this)} >Create New Patient</button>
            <button  style={button2} className="btn btn-secondary" style={button2}>Update Patient Info</button>
            <button  style={button2} className="btn btn-secondary" style={button2}>Delete Patient Info</button>
            </div> 
          </div>
          </div>
             </div4>
             <div>
             <div>
              <button id="hidden" onClick={this.toggle.bind(this)} style={button2}>Add appointments</button> 
             <center>
             <div style={{margin:'auto',display:"none"}} id="hi">
             <form onSubmit={this.handleSubmit}>  
            <div >
            <label >Id:</label>
            <input type="Number" placeholder="Enter id" name="id" value={this.state.id} onChange={this.handleChanges}/>
          </div>
          <div>
            <label >Date:</label>
            <input type="Date" placeholder="Enter service" name="date" value={this.state.date} onChange={this.handleChanges}/>
          </div>
          <div>
            <label >PatientName</label>
            <input type="text" placeholder="Enter Patient Name" name="patientName" value={this.state.patientName} onChange={this.handleChanges}/>
          </div>
          <div>
            <label >Situation</label>
            <input type="text" placeholder="Enter Situation" name="situation" value={this.state.situation} onChange={this.handleChanges}/>
          </div>
          <div>
            <label >Gender:</label>
            <input type="text" placeholder="Enter Gender" name="gender" value={this.state.gender} onChange={this.handleChanges}/>
          </div>
        <input  type="submit" value="Submit" style={button2}/>
            </form>
             </div>
            
             </center>
              </div>
                <div>
                 <table style={{width:'80%',marginLeft:'auto',marginRight: 'auto',marginTop:'20px'}}>
              <tr>
                <th style={table}>Date</th>
                <th style={table}>Patient Name</th> 
                <th style={table}>Situation</th>
                <th style={table}>Gender</th>
              </tr>
              <tr>
                <td className='number' value='tttttt' style={table2}>2012</td>
                <td className='firstName' style={table2}>asdasd</td>
                <td className='lastName' style={table2}>asdas</td>
                <td className='gender' style={table2}>asdasd</td>
              </tr>  <tr>
                <td className='number' value='tttttt' style={table2}>2012</td>
                <td className='firstName' style={table2}>asdasd</td>
                <td className='lastName' style={table2}>asdas</td>
                <td className='gender' style={table2}>asdasd</td>
              </tr>
              </table>
                </div>
                
             </div>
             <button onClick={this.logout.bind(this)} style={button1}>Logout</button>
        
        </div1>
    )
  }
}
//export this component to can use
export default Home;


