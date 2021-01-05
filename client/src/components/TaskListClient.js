import React from "react";
import Title from "./Title";
import "../App.css";

function TaskListClient(props) {
  let tasks = props.tasks;
  // console.log("tasks");
  // console.log(tasks);
  const handleAbort = (event) => {
    event.preventDefault();
    const thisElement = event.target;
    const id = thisElement.getAttribute("data-id");
    props.passAbort(id);
  };
  // const handleComplete = (event) => {
  //   event.preventDefault();
  //   const thisElement = event.target;
  //   const id = thisElement.getAttribute("data-id");
  //   props.passComplete(id);

  // };
  return (
    <div className="py-5  ui">
      <Title name="Your" title="Pick ups" />

      <center>
      <table cellSpacing="200">
      
        {/* <h4>
        | Pick up Location | destination | Pick up time | Plate # | People # | Driver's Avatar | Van's Image
      </h4> */}


        <thead>
          <tr>
            <th align="center">Pick up Location</th>
            <th align="center">Destination</th>
            <th align="center">Pick up time </th>
            <th align="center">Driver's Avatar</th>
            <th align="center">Van's image </th>
            <th align="center">People # </th>
            <th align="center">tasks remarks </th>
            <th align="center">task Abort</th>
          </tr>
        </thead>
          <tbody>
        {tasks.map((task) => (
            
            <tr key={task._id}>
              <td>
                <h5>{task.taskStartPoint}</h5>{" "}
              </td>
              <td>
                {" "}
                <h5>{task.taskEndPoint}</h5>
              </td>
              <td>
                <h5> {task.timeTargetTime}</h5>
              </td>
              <td>
                <h5>
                  <img
                    src={task.driverImage}
                    alt={task.driverImage}
                    className="row-image"
                  />
                </h5>
              </td>
              <td>
                <img
                  src={task.vehicleImage}
                  alt={task.vehicleImage}
                  className="row-image"
                />{" "}
              </td>
              <td> <h5> {task.peopleCount} </h5></td>
              <td>{task.remarks} </td>
              <td>
                  <button
                  className="button ui danger"
                  data-id={task._id}
                  onClick={handleAbort}
                >
                  Abort Task
                </button>
              </td>
              <td>
                {task.completed === true ? (
                  <p className="task-row" disabled data-task={task._id}>
                    placeholder text:{task.timeCompleted}
                  </p>
                ) : (
                  <p></p>
                )}
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      </center>
    </div>
  );
}

export default TaskListClient;
