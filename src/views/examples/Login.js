
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginSuccess, setloginSuccess] = useState();

  
 function handleLogin(){

    if(!email || email==="" || !password || password===""){
      alert("Please enter email or password !");
      return;
    }


    const data = {
      email: email,
      password: password,
    };

    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if(!data.accessToken) throw new Error("Invalid email or password")
        console.log("Success:", data);
        if(data==='wrong Password')alert("Invalid Email or Password ");
        else{
        console.log("accesstoken=>",data.accessToken)
        localStorage.setItem("accessToken", data.accessToken);
        setloginSuccess(true);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Invalid Email or Password ");
      });
      
  };
  if (loginSuccess) {
    return <Redirect to="/admin/index" />;
  }
  return (
    <>
      <Col lg="5" md="7">
      
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div> */}
            <div className="btn-wrapper text-center">
              <img
                alt="..."
                src={require("../../assets/img/app/LIBlogo.png").default}
                style={{width:"100%"}}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;
