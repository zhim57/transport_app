import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [product, setProduct] = useState({})

  const {productid} = useParams() // think useContext
  useEffect(() => {
    API.getProduct(productid)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [productid])
  

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {product.procuctName}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Description</h1>
              <p>
                {product.description}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Products</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default Detail;
