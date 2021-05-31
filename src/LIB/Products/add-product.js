import React, { Component } from "react";
import { Button, FormGroup, Input, Modal, Row, Col, Alert } from "reactstrap";

class AddProduct extends Component {
  state = {
    exampleModal: false,
    error: false,
    errorText: "",
    tremister:1
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  checkValidation = () => {};

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        productName: this.state.productName,
        description: this.state.description,
        url: this.state.url,
        tremister: parseInt(this.state.tremister)
    };
   fetch("https://lit-caverns-52628.herokuapp.com/api/admin/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        if (response.status !== 200) {
          throw response;
        }
        console.log(response);
      })
      .then((data) => {
        console.log("Success:", data);

        this.setState({ exampleModal: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ error: true, errorText: error.statusText });
        // alert(error.statusText);
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
          Add product
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          {this.state.error && (
            <Alert color="danger">
              <strong>Error!</strong> {this.state.errorText}
            </Alert>
          )}

          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
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
              <p className="h4">Product Name:</p>
              <FormGroup>
                <Input
                  id="brandName"
                  placeholder="Enter Product Name"
                  type="text"
                  required="true"
                  onChange={(e) => this.setState({ productName: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Description</p>
              <FormGroup>
                <Input
                  id="description"
                  placeholder="Enter Description"
                  type="textarea"
                  required="true"
                  onChange={(e) => this.setState({ description: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Image URL</p>
              <FormGroup>
                <Input
                  id="description"
                  placeholder="Enter Description"
                  type="textarea"
                  required="true"
                  onChange={(e) => this.setState({ url: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Tremister</p>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  onChange={(e) => this.setState({ tremister: e.target.value })}
                </Input>
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

export default AddProduct;
