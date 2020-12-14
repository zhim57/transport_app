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
      <table>
        {/* <h4>
        | Pick up Location | destination | Pick up time | Plate # | People # | Driver's Avatar | Van's Image
      </h4> */}


        <thead>
          <tr>
            <th>Pick Jivko up Location</th>
            <th>destination</th>
            <th>Pick up time </th>
            <th>Driver's Avatar</th>
            <th>Van's image </th>
            <th>People # </th>
            <th>tasks remarks </th>
            <th>task Abort</th>
          </tr>
        </thead>
        {tasks.map((task) => (
          <tbody>
            {/*  className="row-tasks" */}
            <tr key={task._id}>
              <td>
                <h3>{task.taskStartPoint}</h3>{" "}
              </td>
              <td>
                {" "}
                <h3>{task.taskEndPoint}</h3>
              </td>
              <td>
                <h3> {task.timeTargetTime}</h3>{" "}
              </td>
              <td>
                <h3>
                  <img
                    src={task.driverImage}
                    alt={task.driverImage}
                    className="row-image"
                  />
                </h3>
              </td>
              <td>
                <img
                  src={task.vehicleImage}
                  alt={task.vehicleImage}
                  className="row-image"
                />{" "}
              </td>
              <td> <h3> {task.peopleCount} </h3></td>
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
          </tbody>
        ))}
      </table>
      </center>
    </div>
  );
}

export default TaskListClient;
