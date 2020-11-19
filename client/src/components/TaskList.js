import React from "react";
import TaskItem from "./TaskItem";
import Title from "./Title";
import '../App.css';
// import CustomCarousel from './CustomCarousel/CustomCarousel'

function TaskList(props) {
  return (
    <div className="py-5">
      <div className="container-tasks">
        <Title name="Current" title="transport jobs" />
        {/* <div className="row-tasks"> */}
          {/* <ProductConsumer> */}
          {/* {value => {
                                return value.products.map(product => {
                                    return <ProductItem key={product.id} product={product} />
                                })
                            }} */}
          <TaskItem />
          {/* </ProductConsumer> */}
        </div>
      </div>
    // </div>
  );
}

export default TaskList;
