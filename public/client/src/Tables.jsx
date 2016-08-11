import React, {Component}  from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'
import cookie from 'react-cookie';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();



const Tables = React.createClass({


    _onRowSelection: function(key){
      
      this.props.onUserClicked(this.props.users[key[0]]._id);
      
    },

    

  	render: function(){
    

    const style = {
      marginLeft: 20,
    };

  
    return (
        <div>
          

             

              <MuiThemeProvider muiTheme={getMuiTheme()}> 
              <div>
                 <Table selectable={true} onRowSelection={this._onRowSelection}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn >Users</TableHeaderColumn>
                      
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                    {this.props.users.map((user, index) => {
                        return(
                        <TableRow >
                          <TableRowColumn key={user._id}>{user.first_name}</TableRowColumn>                     
                        </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Tasks</TableHeaderColumn>
                      
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                    {this.props.tasks.map((task, index) => {
                      return(
                      <TableRow >
                        <TableRowColumn >{task.name}                        <RaisedButton label="Delete" onClick={this.handleClick} secondary={true} style={style} /></TableRowColumn>

                      </TableRow>
                      );
                    })
                  }
                  </TableBody>
                </Table>

                
              
                </div>
              </MuiThemeProvider>
              

          
        </div>
    )

  },

})

export default Tables;