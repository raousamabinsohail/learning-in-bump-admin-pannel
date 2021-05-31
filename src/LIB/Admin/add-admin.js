import React, { Component } from "react";
import { Button, FormGroup, Input, Modal,Alert } from "reactstrap";

class AddAdmin extends Component {
  state = {
    exampleModal: false,
    wrongAnswer: false,
    msg: "",
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  checkValidation = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.cpassword) {
      this.setState({ msg: "Password does not match" });
      this.setState({ wrongAnswer: true });
      return;
    } else this.setState({ wrongAnswer: false });

    if (this.state.phone.length !== 13) {
      this.setState({ msg: "Phone number length should be of 13" });
      this.setState({ wrongAnswer: true });
      return;
    } else this.setState({ wrongAnswer: false });
    if (this.state.password.length < 6) {
      this.setState({ msg: "Password length should be greater then 6" });
      this.setState({ wrongAnswer: true });
      return;
    } else this.setState({ wrongAnswer: false });
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
    };
    console.log("=====>", data);
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        this.setState({ exampleModal: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ wrongAnswer: true });
      });
  };

  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("exampleModal")}
        >
          Register Admin
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          {this.state.wrongAnswer && (
            <Alert color="danger">
              <strong>Error!</strong> {this.state.msg}
            </Alert>
          )}

          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Admin
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-body">
              <p className="h4">Name</p>
              <FormGroup>
                <Input
                  id="name"
                  placeholder="Enter Name "
                  type="text"
                  required="true"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>

              <p className="h4">Email</p>
              <FormGroup>
                <Input
                  id="email"
                  placeholder="Enter Email"
                  type="Email"
                  required="true"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Phone (+92)</p>
              <FormGroup>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  type="text"
                  required="true"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Password</p>
              <FormGroup>
                <Input
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  required="true"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Conform Password</p>
              <FormGroup>
                <Input
                  id="cpassword"
                  placeholder="Conform password"
                  type="password"
                  required="true"
                  onChange={(e) => this.setState({ cpassword: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

export default AddAdmin;
