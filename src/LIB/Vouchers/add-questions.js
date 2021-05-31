import React, { Component } from "react";
import { Button, FormGroup, Input, Modal, Row, Col, Alert } from "reactstrap";

class AddVouchers extends Component {
  state = {
    exampleModal: false,
    error: false,
    errorText: "",
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
      brandName: this.state.brandName,
      discountPercentage: parseInt(this.state.disper),
      minScore: parseInt(this.state.minScore),
      maxScore: parseInt(this.state.maxScore)
    };
    console.log("=====>", data);
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/addvoucher", {
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
          Add Voucher
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
              Add Questions
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
              <p className="h4">Brand Name:</p>
              <FormGroup>
                <Input
                  id="brandName"
                  placeholder="Enter Question Text"
                  type="textarea"
                  required="true"
                  onChange={(e) => this.setState({ brandName: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Range</p>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="minScore"
                      placeholder="Enter Min Score"
                      type="number"
                      required="true"
                      onChange={(e) =>
                        this.setState({ minScore: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="maxScore"
                      placeholder="Enter Max Score"
                      type="number"
                      required="true"
                      onChange={(e) =>
                        this.setState({ maxScore: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <p className="h4">Discount Percentage</p>
              <FormGroup>
                <Input
                  id="disper"
                  placeholder="Enter correct answer"
                  type="number"
                  required="true"
                  onChange={(e) => this.setState({ disper: e.target.value })}
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

export default AddVouchers;
