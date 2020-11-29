import React, { useState, useEffect } from "react"; // useContext, ,useCallback
// import { Link } from "react-router-dom";  // , useHistory
import API from "../utils/API";

// import "./style.css";
// import CartContext from "../utils/CartContext";
// import Details from '../components/Details'

function TaskItem(props) {
  const [tasks, setTasks] = useState([]);

  // Load all tasks and store them with settasks
  useEffect(() => {
    loadTasks();
  }, [tasks]);
  //   console.log(tasks);

  // Loads all tasks and sets them to tasks
  function loadTasks() {
    API.getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <h4>
        | Pick up Location | destination | Time pick up | Client Avatar | Client
        Name | Plate # | description | People # | Driver's Avatar | Van's Image
      </h4>
      {tasks.map((task) => (
        <div key={task.taskStartPoint} className="row-tasks">
          {console.log(task)}
          <h4>
            | {task.taskStartPoint}| {task.taskEndPoint}| {task.timeTargetTime}
            |{" "}
            <img
              src={task.clientImage}
              alt={task.clientImage}
              className="row-image"
            />
            | {task.clientNameFirst}| {task.driverNameFirst}|{" "}
            {task.vehiclePlate}| {task.description}| People: {task.peopleCount}
            {/* <div onClick={() => { value.handleDetail(id); }} className="img-container p-5"> */}
            |{" "}
            <img
              src={task.driverImage}
              alt={task.driverImage}
              className="row-image"
              // onClick={handleItemDetails}

              // data-name={task.description}
              // data-image={task.driverImage}
              // // data-available={task.isAvailable}
              // data-id={task._id}
              // data-shipping={task.shippingCost}
              // data-price={task.price}
              // data-description={task.description}
              // data-incart={task.inCart}
              // data-itemNumber={task.vehiclePlate}
            /> | 
            <img
              src={task.vehicleImage}
              alt={task.vehicleImage}
              className="row-image"
              />
            {/* </Link> */}
            {/* <button
                className="cart-btn"
                disabled={task.inCart ? true : false}
                // onClick={handleAddToCart}
              > */}
            {task.completed === true ? (
              <p
                className="task-row"
                disabled
                data-task={task._id}
                data-price={task.price.toString()}
              >
                placeholder text
              </p>
            ) : (
              <p
              // className="text-capitalize mb-0"
              // data-name={task.taskName}
              // data-image={task.image}
              // data-available={task.isAvailable}
              // data-id={task._id}
              // data-shipping={task.shippingCost}
              // data-price={task.price}
              // data-description={task.description}
              >
                {/* Add to Cart <i className="fa fa-cart-plus" /> */}
              </p>
            )}
            {/* </button> */}
            {/* </div> */}
            {/* </Products> */}
            {/* </taskConsumer> */}
            {/* <div className="card-footer d-flex justify-content-between"> */}
            {/* <h5 className="text-blue font-italic mb-0"> */}
            {/* </h5> */}
            {/* </div> */}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default TaskItem;

// export  {itemDetail1} ;
