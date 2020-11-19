import React, { useState, useEffect } from "react"; // useContext, ,useCallback
// import { Link } from "react-router-dom";  // , useHistory
import API from "../utils/API";
// import "./style.css";
// import CartContext from "../utils/CartContext";
// import Details from '../components/Details'

function TaskItem(props) {
  // const {
  //  addtaskDetails,
  //   addtaskToCart,
  //   // refreshCart,
  // } = useContext(CartContext);

  const [tasks, setTasks] = useState([]);
  // const [itemDetail, setItemDetail] = useState({});

  // function handleItemDetail(task) {
  //   setItemDetail({
  //     name: task.taskName,
  //     description: task.description,
  //   });
  // }

  // console.log(itemDetail);

  // Load all tasks and store them with settasks
  useEffect(() => {
    loadTasks();
  }, []);
  //   console.log(tasks);

  // Loads all tasks and sets them to tasks
  function loadTasks() {
    API.getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }
  // working function===============
  // const handleItemDetails =(event) =>{
  //   event.preventDefault();
  //   const thisElement = event.target;
  //   const price = parseFloat(thisElement.getAttribute("data-price"));
  //   const _id = thisElement.getAttribute("data-id");
  //   const name = thisElement.getAttribute("data-name");
  //   const availability = thisElement.getAttribute("data-available");
  //   const image = thisElement.getAttribute("data-image");
  //   const shipping = parseFloat(thisElement.getAttribute("data-shipping"));
  //   const description = thisElement.getAttribute("data-description");
  //   const inCart = thisElement.getAttribute("data-incart");
  //   const itemNumber = thisElement.getAttribute("data-itemnumber");
  //   console.log(price);
  //   console.log(_id);
  //   console.log(name);
  //   console.log(availability);
  //   console.log(shipping);
  //   console.log(availability);
  //   console.log(description);
  //   addtaskDetails(name, availability, 1, price, shipping, image, _id,description,inCart, itemNumber);
  //   handleOnClick();
  // }

  // working function #2
  // const handleAddToCart = (event) => {
  //   // if the user hits the button to add to cart, this function will fire
  //   event.preventDefault();
  //   const thisElement = event.target;

  //   const price = parseFloat(thisElement.getAttribute("data-price"));

  //   const _id = thisElement.getAttribute("data-id");
  //   const name = thisElement.getAttribute("data-name");
  //   const availability = thisElement.getAttribute("data-available");
  //   const image = thisElement.getAttribute("data-image");
  //   const shipping = parseFloat(thisElement.getAttribute("data-shipping"));

  //   // helpJA(name, available,quantity ,price1, image1, _id);
  //   console.log(price);
  //   console.log(_id);
  //   console.log(name);
  //   console.log(availability);
  //   console.log(shipping);
  //   console.log(availability);

  //   //addtaskToCart = (taskName, isAvailable, quantity, price, shippingCost, image, _id)

  //   addtaskToCart(name, availability, 1, price, shipping, image, _id);

  //   // setEmail(data.data.email);

  //   // value.addToCart(id)
  //   // value.openModal(id);
  // };

  // working creation of another page==========details
  // const history = useHistory();
  // const handleOnClick = useCallback(() => history.push('/details'), [history]);

  // const { title, img, price, inCart, id } = props.task

  return (
    <div >
      {tasks.map((task) => (
        <div key={task.taskStartPoint} className="row-tasks">
          {console.log(task)}
         
            {task.taskStartPoint}
            {task.taskEndPoint}
            {task.timeTargetTime}
            {task.clientNameFirst}
            {task.clientNameFirst}
            {task.driverNameFirst}
            {task.vehiclePlate}
          

            {/* <div onClick={() => { value.handleDetail(id); }} className="img-container p-5"> */}
       
            <img
              src={task.driverImage}
              alt={task.driverImage}
              className="row-image"
              // onClick={handleItemDetails}

              data-name={task.description}
              data-image={task.driverImage}
              // data-available={task.isAvailable}
              data-id={task._id}
              // data-shipping={task.shippingCost}
              // data-price={task.price}
              // data-description={task.description}
              // data-incart={task.inCart}
              data-itemNumber={task.vehiclePlate}
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
                In Cart
              </p>
            ) : (
              <p
                className="text-capitalize mb-0"
                // data-name={task.taskName}
                // data-image={task.image}
                // data-available={task.isAvailable}
                // data-id={task._id}
                // data-shipping={task.shippingCost}
                // data-price={task.price}
                data-description={task.description}
              >
                {/* Add to Cart <i className="fa fa-cart-plus" /> */}
              </p>
            )}
            {/* </button> */}
            {/* </div> */}

            {/* </Products> */}
            {/* </taskConsumer> */}
            {/* <div className="card-footer d-flex justify-content-between"> */}
            <p className="align-serl-center mb-0">{task.description}</p>
            {/* <h5 className="text-blue font-italic mb-0"> */}
              <span className="people-count">${task.peopleCount}</span>
            {/* </h5> */}
          {/* </div> */}
          
          
        </div>
      ))}
    </div>
  );
}

export default TaskItem;

// export  {itemDetail1} ;
