import axios from 'axios';

export default {
    // Gets all tasks
    getTasks: function() {
      return axios.get("/api/tasks");
    },
    // Gets the tasks with the given id
    getTask: function(id) {
      return axios.get("/api/tasks/" + id);
    },
    // Deletes the tasks with the given id
    deleteTasks: function(id) {
      return axios.delete("/api/tasks/" + id);
    },
    completeTasks: function(id , taskData) {
      return axios.put("/api/tasks/update/" + id , taskData);
    },
    abortTasks: function(id , taskData) {
      return axios.put("/api/tasks/updatea/" + id , taskData);
    },
    // Saves a tasks to the database
    saveTasks: function(tasksData) {
      return axios.post("/api/tasks", tasksData);
    },
    testUserRouter: function(){
      return axios.get("/api/user/test");
    },
    login: function(userData){
      return axios.post("/api/user/login", userData);
    },
    update: function(id, userData){
  
      return axios.put("/api/user/update/"+ id, userData);
    },
    update1: function(id, userData){
  
      return axios.put("/api/user/update1/"+ id, userData);
    },
    logout: function(){
      return axios.get("/api/user/logout");
    },
    signup: function(userData){
      return axios.post("/api/user/signup", userData);
    },
    getUser: function(){
      return axios.get("/api/user/data");
    },
    getUserData: function() {
        return axios.get("/api/user/data1");
      }
  };