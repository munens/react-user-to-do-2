import React, {Component}  from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import cookie from 'react-cookie';

const Login = React.createClass({
  getInitialState: function(){
    return {
      email: this.props.login_info.email,
      password: this.props.login_info.password,
      user_id: this.props.login_info.user_id 
    }
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

  submitLogin: function(event){

    console.log(this.state)

    var id;

    $(() => {
      $.ajax({
        method: "POST",
        data: { email: this.state.email,
                password: this.state.password },
        url: "http://localhost:8080/login"
      }).done((results) => {
        // console.log("user is logged in!")
        //   id = results[0].user_id;
        //  this.setCookie(id);

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

    return (
        <div className="login-fields">
          <MuiThemeProvider muiTheme={getMuiTheme()}> 
            <Paper zDepth={2}>       
              <TextField hintText="Email" style={style} onChange={this.handleEmail} />
              <br/>
              <TextField hintText="Password" style={style} onChange={this.handlePassword} />
              <br/>
              <RaisedButton label="Primary" style={style} primary={true} style={style} onClick={this.submitLogin}/>
            </Paper>
          </MuiThemeProvider>
        </div>
    );
  }


})


export default Login;