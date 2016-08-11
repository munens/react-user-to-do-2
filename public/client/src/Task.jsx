import React, {Component}  from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import cookie from 'react-cookie';


const Task = React.createClass({

	getInitialState: function(){

	    return {
	    
	      task: {name: ""},
	      tasks: []

	    }
  	},

  	getCookie: function(){
		return document.cookie.substring(document.cookie.length - 24, document.cookie.length);
	},

	getTasks: function(user){

		var all_tasks = this.state.tasks;

		for(var task in user.tasks){
			all_tasks.push(user.tasks[task])
		}
		
		this.setState({
			tasks: all_tasks
		})

		console.log(this.state)
	},

  	getUserTasks: function(){

		$(() => {
		      $.ajax({
		        method: "GET",
		        url: "http://localhost:8080/users/" + this.getCookie()
		      }).done((results) => {
		      	console.log(results)
		      	this.getTasks(results)

		      });
		  })
	
	},

  	

  	handleTask: function(event){
  		this.setState({task: {name: event.target.value}})
  	},

  	submitTask: function(event){

  		var newTask = this.state.task.name;
  		var task = {name: newTask, done: false}

  		var tasks = this.state.tasks
  		tasks.push(task)

  		console.log(tasks);


  		this.setState({tasks: tasks})

  		console.log("props", this.state);
  		
  		$(() => {
		      $.ajax({
		        method: "PUT",
		        data: {tasks: this.state.tasks},
		        url: "http://localhost:8080/users/" + this.getCookie()
		      }).done((result) => {
		      	console.log("(PUT response: task)",result);
		      });
		    })

  		console.log("from task submit after (PUT response: task)", this.state)
  		this.props.user_tasks(this.state.tasks)
  	},

  	componentDidMount: function(){
		this.getUserTasks();				
	},

  	render: function(){

	    const style = {
	      marginLeft: 20,
	    };

	    return (
	        <div className="login-fields">
	          <MuiThemeProvider muiTheme={getMuiTheme()}> 
	            <Paper zDepth={2}>       
	              <TextField hintText="What would you like to do today?" style={style} onChange={this.handleTask} />
	              <br/>
	              <RaisedButton label="Go" style={style} primary={true} style={style} onClick={this.submitTask}/>
	            </Paper>
	          </MuiThemeProvider>
	        </div>
	    );
  }

})

export default Task;