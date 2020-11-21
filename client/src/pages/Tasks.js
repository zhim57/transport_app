import React, { useEffect, useState } from "react";
// import ProductItem from '../components/ProductItem';
// import { Col, Row, Container } from "../components/Grid";
// import { ProductConsumer } from '../context';
import { List, ListItem } from "../components/List";
import API from '../utils/API';


function Tasks(props) {
    // Setting our component's initial state
    const [tasks, setTasks] = useState([]);

    // Load all products and store them with setProducts
    useEffect(() => {
        loadTasks()
    }, []);

    // Loads all products and sets them to products
    function loadTasks() {
        API.getTasks()
            .then(res =>
                setTasks(res.data)
            )
            .catch(err => console.log(err));
    };


    return (
        <div>
            {tasks.length ? (
                <List>
                    {tasks.map(task => {
                        return (
                            <ListItem key={task._id}>
                                <a href={"/task/" + task._id}>
                                    <h1>{task.taskStartPoint}</h1>
                                </a>
                                    <h1>{task.taskEndPoint}</h1>
                                <img src={task.clientImage} alt="clients Face"></img>
                                <h2>time created: {task.timeCreated}</h2>
                                <h2>target Time for the Job : {task.timeTargetTime}</h2>
                                <h2>Actual Time pick up: {task.timeActual}</h2>
                                <h2>time completed: {task.timeCompleted}</h2>
                                <h2>Client Last Name : {task.clientNameLast}</h2>
                                <h2>clients first Name : {task.clientNameFirst}</h2>
                                <h2>driver : {task.driverName}</h2>
                                <img src={task.driverImage} alt="Driver Face"></img>
                                <h2>people: {task.peopleCount}</h2>
                                <h2>vessel Name: {task.vesselName}</h2>
                                <h2>terminal name: {task.terminalName}</h2>

                                <p>{task.description}</p>
                                <p>Job Number: {task.taskNumber}</p>
                                {/* <p>{task.clientImage}</p> */}
                                <img src={task.vehicleImage} alt="transport van"></img>
                            </ListItem>
                        );
                    })}
                </List>
            ) : (<h3>No Results to Display</h3>)}
        </div>
    );
}


export default Tasks;
