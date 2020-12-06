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
      <div className="container-tasks">
        <Title name="Your" title="Pick ups" />

        <div>
          {/* <h4>
        | Pick up Location | destination | Pick up time | Plate # | People # | Driver's Avatar | Van's Image
      </h4> */}
          {tasks.map((task) => (
            <div key={task._id} className="row-tasks">
              <h5>
                From: {task.taskStartPoint} {"  "}
                To: {task.taskEndPoint} {"  "}
                At: {task.timeTargetTime} hrs {"  "}
                Driver:{" "}
                <img
                  src={task.driverImage}
                  alt={task.driverImage}
                  className="row-image"
                />{" "}
                {/* {task.driverNameFirst}{" "} */}
                {/* Veh Plate: {task.vehiclePlate} {" "} */}
                Veh Pic:{" "}
                <img
                  src={task.vehicleImage}
                  alt={task.vehicleImage}
                  className="row-image"
                />{" "}
                {"  "}
                People: {task.peopleCount}
                {"  "}
                {task.remarks}
                <button
                  className="button ui danger"
                  data-id={task._id}
                  onClick={handleAbort}
                >
                  Abort Task
                </button>
                {/* <button
                  className="button ui primary"
                  data-id={task._id}
                  onClick={handleComplete}
                >
                  done
                </button>
              */}
                {task.completed === true ? (
                  <p className="task-row" disabled data-task={task._id}>
                    placeholder text:{task.timeCompleted}
                  </p>
                ) : (
                  <p></p>
                )}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default TaskListClient;
