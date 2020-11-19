import React, { useEffect, useState } from "react";
// import ProductItem from '../components/ProductItem';
// import { Col, Row, Container } from "../components/Grid";
// import { ProductConsumer } from '../context';
import { List, ListItem } from "../components/List";
import API from '../utils/API';


function Tasks() {
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
                                    <h1>{task.taskEndPoint}</h1>
                                </a>
                                <h2>${task.timeCreated}</h2>
                                <h2>${task.timeTargetTime}</h2>
                                <h2>${task.timeActual}</h2>
                                <h2>${task.timeCompleted}</h2>
                                <h2>${task.clientNameLast}</h2>
                                <h2>${task.clientNameFirst}</h2>
                                <h2>${task.peopleCount}</h2>
                                <h2>${task.vesselName}</h2>
                                <h2>${task.terminalName}</h2>

                                <p>{task.description}</p>
                                <p>Job Number: {task.taskNumber}</p>
                                <p>{task.clientImage}</p>
                                <img src={task.driverImage} alt="Driver Face"></img>
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
