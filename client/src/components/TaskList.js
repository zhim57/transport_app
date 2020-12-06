import React from "react";
// import TaskItem from "./TaskItem";
import Title from "./Title";
import "../App.css";
// import API from "../utils/API";
// import CustomCarousel from './CustomCarousel/CustomCarousel'

function TaskList(props) {
  let tasks = props.tasks;
  const handleAbort = (event) => {
    event.preventDefault();
    const thisElement = event.target;
    const id = thisElement.getAttribute("data-id");
    props.passAbort(id);

  
  };
  const handleComplete = (event) => {
    event.preventDefault();
    const thisElement = event.target;
    const id = thisElement.getAttribute("data-id");
    props.passComplete(id);
    
  };
  return (
    <div className="py-5  ui">
      <div className="container-tasks">
        <Title name="Current" title="transport jobs" />
        {/* <div className="row-tasks"> */}
        {/* <ProductConsumer> */}
        {/* {value => {
                                return value.products.map(product => {
                                    return <ProductItem key={product.id} product={product} />
                                })
                            }} */}
        {/* <TaskItem /> */}
        {/* </ProductConsumer> */}
        <div>
          {/* <h4>
        | Pick up Location | destination | Time pick up | Client Avatar | Client
        Name | Plate # | description | People # | Driver's Avatar | Van's Image
      </h4> */}
          {tasks.map((task, index) => (
            <div key={task._id} className="row-tasks">
              {/* {console.log(task)} */}
              <h4>
                | {task.taskStartPoint}| {task.taskEndPoint}|{" "}
                {task.timeTargetTime}|{" "}
                <img
                  src={task.clientImage}
                  alt={task.clientImage}
                  className="row-image"
                />
                | {task.clientNameFirst}| {task.driverNameFirst}|{" "}
                {task.vehiclePlate}| {task.description}| People:{" "}
                {task.peopleCount}
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
                />{" "}
                |
                <img
                  src={task.vehicleImage}
                  alt={task.vehicleImage}
                  className="row-image"
                />
                <button
                  className="button ui danger"
                  data-id={task._id}
                  onClick={handleAbort}
                >
                  Abort Task
                </button>
                <button
                  className="button ui primary"
                  data-id={task._id}
                  onClick={handleComplete}
                >
                  done
                </button>
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
                    // data-price={task.price.toString()}
                  >
                    placeholder text:{task.timeCompleted}
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
      </div>
    </div>
    // </div>
  );
}

export default TaskList;
