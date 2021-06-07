import React, {Fragment, useContext, useState, useEffect} from 'react'
import UserContext from '../utils/UserContext';
import {Redirect} from 'react-router-dom';
import API from '../utils/API';
import TaskListDispatcher from '../components/TaskListDispatcher';

// import { useHistory } from "react-router-dom";

var value1 ={test:"test"};
function ClientScreen() {
    const {nameFirst} = useContext(UserContext);  //email, loggedIn, 
    const [tasks, setTasks] = useState([]);
    const consumerInfo = (value) => {
        value1 = value
      };

useEffect(() => {
    if (value1.email){
  loadTasks();
    }
},[] );

function loadTasks(email) {
  API.getTasks()
    .then((res) => {
        let allTasks = res.data;
        setTimeout(() => setTasks(allTasks), 100);
    
    })
    .catch((err) => console.log(err));
}
const refreshTasks = (email) => {
    loadTasks(email);
  };

  const passAbort =(id)=> {
    const date = new Date(Date.now());
    const dateLocale=date.toLocaleString();
    const taskData = { aborted: true, timeAborted: dateLocale };
    API.abortTasks(id, taskData);
    // console.log("task Aborted");
    // setTimeout(() => refreshTasks(), 1);
    refreshTasks(value1.email);
  }
  const passComplete =(id)=> {
    const date = new Date(Date.now());
    const dateLocale=date.toLocaleString();
    const taskData = { completed: true, timeCompleted: dateLocale };

    API.completeTasks(id, taskData);
    // console.log("task marked as completed");
    refreshTasks(value1.email);
    // setTimeout(() => refreshTasks(value1.email), 1);
  }

 
return (
    <Fragment> 
        <UserContext.Consumer>
        {(value) => consumerInfo(value)}
      </UserContext.Consumer>
         {(() => {
        if (value1.email) {
            return(
<div>
            <h1> Greetings {nameFirst}</h1>
                <TaskListDispatcher tasks={tasks} role={value1.role} refreshTasks={refreshTasks} passAbort={((id) => passAbort(id))} passComplete={((id) => passComplete(id))}/>
        </div>
            )
            }
            else{
                return(
                    <div>
              <Redirect to="/" />
            </div>
                )
            }
        })()}
  </Fragment>
        )
       
        // <Redirect to={redirect_path}/>
}
export default ClientScreen;
