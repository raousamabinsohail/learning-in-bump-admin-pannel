import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import AddProduct from "./add-product";

class ProductHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" +
              require("../../assets/img/theme/profile-cover.jpg").default +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Product !</h1>
                <p className="text-white mt-0 mb-5">
                  This Table Shows the products Saved in database
                </p>
                <AddProduct/>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductHeader;
