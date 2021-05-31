import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class UsersHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            // minHeight: "600px",
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
              <Col lg="15" md="10">
                <h1 className="display-2 text-white">Users Page !</h1>
                <p className="text-white mt-0 mb-5">
                  This Table Shows The Registered Users IN Database
                </p>
                {/* <AddQuestions /> */}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default UsersHeader;
