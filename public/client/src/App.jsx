import React, {Component} from 'react';
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/';
import cookie from 'react-cookie';
import Task from './Task.jsx';
import Tables from './Tables.jsx'
import {AppBar, Tabs, Tab} from 'material-ui'
import $ from 'jquery'

const App = React.createClass({

	getInitialState: function(){

		return {

			login_info: {
				email: "",
				password: "",
				user_id: ""
			},

			signup_info: {
				first_name: "",
				email: "",
				password: "",
				user_id: "",
				tasks: []
			},
			currentUser: {},
			currentTasks: [],
			users: []
		}

	},

	getCookie: function(){
		return document.cookie.substring(document.cookie.length - 24, document.cookie.length);
	},



	getUsers: function(users){

		var all_users = this.state.users;
		all_users.push(users)

		this.setState({
			users: all_users[0]
		})

		console.log(this.state)
	},

	

	getAllUsers: function(){

		var allUsers;

		$(() => {
		      $.ajax({
		        method: "GET",
		        url: "http://localhost:8080/users"
		      }).done((results) => {
		      	console.log(results)
		      	this.getUsers(results)

		      });
		  })
	},

	getUser: function(user){
		this.setState({
			signup_info: {
				first_name: user.first_name,
				user_id: user._id,
				email: user.email,
				password: user.password,
				tasks: []
			},
			currentUser: {
				user_id: user._id
			}
		})

	},

	getUserInfo: function(id){

		var user;

		if(document.cookie){

		    $(() => {
		      $.ajax({
		        method: "GET",
		        url: "http://localhost:8080/users/" + id
		      }).done((result) => {

		      	
		       	user = result;

		       	this.getUser(user)
		       	
		      });
		    })

		} else {
			return null;
		}


	},

	componentDidMount: function(){
		this.getUserInfo(this.getCookie());
		this.getAllUsers()
	},

	user_tasks: function(tasks){

		this.state.users.forEach((user, index) => {
			if(user._id == this.state.currentUser.user_id){
				user.tasks = tasks;

				if(this.state.currentUser.user_id == user._id){
					this.state.currentTasks = tasks
				}
				
			}
		})

		this.forceUpdate();
	},

	user_info: function(info){
		
		var newUser = {
			first_name: info.first_name,
				user_id: info.user_id,
				email: info.email,
				password: info.password,
				tasks: []
		};

		var users = this.state.users

		for(var user in users){
			if(users[user]._id !== info.user_id){
				users.push(newUser)
			}
		}

		this.setState({
			signup_info: {
				first_name: info.first_name,
				user_id: info.user_id,
				email: info.email,
				password: info.password,
				tasks: [] }	
			
		})

		
	},

	onUserClicked: function(id){

		this.state.users.forEach((user, index) => {
			if(user._id == id){

				this.setState({currentTasks: user.tasks,
							   currentTasks_user: user._id})
			}
		})
		
	},
	
	
	render: function() {

		
		console.log("in render tables",this.state)
		return (
			<div className="main-body">
				<div className="nav">
						
				</div>
					{!document.cookie &&
						
						<div className='registration'>
							<div className="signup-info">
								<Signup signup_info={this.state.signup_info} user_info={this.user_info} />
							</div>
							<div className="login-info">
								<Login login_info={this.state.login_info} user_info={this.user_info} />
							</div>
						</div>
					}
					
					{document.cookie &&
						<div>
							<div className="task-input">
								<Task user_tasks={this.user_tasks} user={this.state.signup_info} />
							</div>
							<div className="tables">
								<Tables users={this.state.users} tasks={this.state.currentTasks} onUserClicked={this.onUserClicked}/>
							</div>
							
						</div>
					}


			</div>
		)

	}
})

export default App;
	