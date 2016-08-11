import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
//import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import cookie from 'react-cookie';


const SignupForm = React.createClass({
  
  getInitialState: function(){
    return {
      first_name: this.props.signup_info.first_name,
      email: this.props.signup_info.email,
      password: this.props.signup_info.password,
      user_id: this.props.signup_info.user_id,
      tasks: [] 
    }
  },

  handleFirstName: function(event){
    this.setState({first_name: event.target.value})
  },

  handleEmail: function(event){
    this.setState({email: event.target.value})
  },

  handlePassword: function(event){
    this.setState({password: event.target.value})
  },


  setCookie: function(id){
    this.setState({user_id: id });
    cookie.save('user_id', id, { path: 'http://localhost:8080/login' });
    this.props.user_info(this.state)    
  },

  submitUser:function(event){

    console.log(this.state)

    var id;

    $(() => {
      $.ajax({
        method: "POST",
        data: { first_name: this.state.first_name,
                email: this.state.email,
                password: this.state.password,
                tasks: [] },
        url: "http://localhost:8080/signup"
      }).done((results) => {
       
        console.log(results)
        id = results._id;
        this.setCookie(id)

      });
    })

    // this.setState({
    //   first_name: "",
    //   email: "",
    //   password: ""
    // })

  },

  render: function(){
    
    const style = {
      marginLeft: 20,
    };

    return (<div>

              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Paper zDepth={2}>
                 <TextField hintText="First name" underlineShow={false} style={style} onChange={this.handleFirstName} />
                 <Divider />
                 <TextField hintText="Email address" style={style} underlineShow={false} onChange={this.handleEmail}/>
                 <Divider />
                 <TextField hintText="Password" style={style} underlineShow={false} onChange={this.handlePassword} />
                  <Divider />
                  <RaisedButton label="Primary" primary={true} style={style} onClick={this.submitUser} />
                  <Divider />  
                </Paper> 
              </MuiThemeProvider>

      </div>)    
    
    
  }


})



export default SignupForm;
