import React, { Fragment, useContext } from "react";
import CartContext from '../utils/CartContext'
import {Link} from 'react-router-dom';
import './style.css';

function Cart(props) {

    const { total, subtotal, shipping, products, setProducts, removeProductFromCart, refreshCartHelper } = useContext(CartContext); // setShipping, setSubtotal, setTotal, addProductToCart,
    const handleChange = (event, index) => {
        // api call to ipdate quantity
        console.log(event.target);
        console.log(event.target.value);
        const changedProduct = [...products];
        changedProduct[index].quantity = event.target.value;
        setProducts(changedProduct);
        refreshCartHelper(changedProduct);
    }
    return (
        <Fragment>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Order Details</h1>
                </div>
            </section>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Products</th>
                                        <th scope="col">Available</th>
                                        <th scope="col" className="text-center" id="quantity-label">Quantity</th>
                                        <th scope="col" className="text-right">Price</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) =>
                                        <tr key={"product-" + index}>
                                            <td> <img className="img-fluid" styles={{width:"240px"}} src={product.image} alt={product.name} /></td>
                                            <td>{product.productName}</td>
                                            <td>{product.isAvailable}</td>
                                            <td><input className="form-control" aria-describedby="quantity-label" type="text" onChange={(event) => handleChange(event, index)} value={product.quantity} /></td>
                                            <td className="text-right">${product.price.toFixed(2)}</td>
                                            <td className="text-right"><button onClick={(event) => removeProductFromCart(event, product._id)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button> </td>
                                        </tr>
                                    )}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Sub-Total</td>
                                        <td className="text-right">${Number(subtotal).toFixed(2)} USD</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Shipping</td>
                                        <td className="text-right">${Number(shipping).toFixed(2)} USD</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total</strong></td>
                                        <td className="text-right"><strong>${Number(total).toFixed(2)} USD</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mb-2">
                        <div className="row">
                            <div className="col-sm-12  col-md-6">
                                <Link to ="/">
                                <button className="btn btn-block btn-light">Continue Shopping</button>
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-6 text-right">
                                {/* <button className="btn btn-lg btn-block btn-success text-uppercase">Checkout</button> */}
                                <div>{props.checkoutButton}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart;