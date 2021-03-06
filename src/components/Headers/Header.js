
import React, { useState, useEffect } from "react";


import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";


const Header = () => {
  const [questionCount, setQuestionCount, ] = useState(0);
  const [userCount, setUserCount, ] = useState(0);
  const [productCount, setProductCount, ] = useState(0);
  const [adminCount, setAdminCount, ] = useState(0);

  useEffect(() => {
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/countquestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
     
    })
      .then((response) => response.json())
      .then((questionCount) => {
        if(!questionCount) throw Error("Not found")
        console.log("Success:", questionCount);
    
        setQuestionCount(questionCount)
      })
      .catch((error) => {
        console.error("Error:", error);

        alert(error);
      });

      fetch("https://lit-caverns-52628.herokuapp.com/api/admin/countUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
     
    })
      .then((response) => response.json())
      .then((userCount) => {
        console.log("Success:", userCount);
       setUserCount(userCount)
      })
      .catch((error) => {
        console.error("Error:", error);

        alert(error);
      });

      fetch("https://lit-caverns-52628.herokuapp.com/api/admin/countproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
     
    })
      .then((response) => response.json())
      .then((productCount) => {
        console.log("Success:", productCount);
        setProductCount(productCount)
      })
      .catch((error) => {
        console.error("Error:", error);

        alert(error);
      });


      fetch("https://lit-caverns-52628.herokuapp.com/api/admin/countadmins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
       
      })
        .then((response) => response.json())
        .then((adminCount) => {
          console.log("Success:", adminCount);
          setAdminCount(adminCount)
        })
        .catch((error) => {
          console.error("Error:", error);
  
          alert(error);
        });
      

        
  },[])
if(!adminCount) return null
if(!questionCount) return null
if(!productCount) return null
if(!userCount) return null
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Questions
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {questionCount[0].description}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{userCount[0].email}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Admin
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{adminCount[0].email}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Products
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{productCount[0].productName}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
