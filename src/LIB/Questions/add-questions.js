import React, { Component } from "react";
import { Button, FormGroup, Input, Modal, Row, Col, Alert } from "reactstrap";

class AddQuestions extends Component {
  state = {
    exampleModal: false,
    level1: "1",
    wrongAnswer: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  checkValidation = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.answer !== this.state.option1 &&
      this.state.answer !== this.state.option2 &&
      this.state.answer !== this.state.option3 &&
      this.state.answer !== this.state.option4
    ) {
      this.setState({ wrongAnswer: true });
      return;
    } else this.setState({ wrongAnswer: false });
    const data = {
      description: this.state.description,
      options: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
      rightAnswer: this.state.answer,
      level: parseInt(this.state.level1),
    };
  
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/addquestion", {
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
        console.log("=====>", error);
        alert(error);
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
          Add Question
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          {this.state.wrongAnswer && (
            <Alert color="danger">
              <strong>Error!</strong> Right Answer does not match with any of
              the options !
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
              <p className="h4">Question:</p>
              <FormGroup>
                <Input
                  id="description"
                  placeholder="Enter Question Text"
                  type="textarea"
                  required="true"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </FormGroup>
              <p className="h4">Options</p>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="option1"
                      placeholder="Enter option a"
                      type="text"
                      required="true"
                      onChange={(e) =>
                        this.setState({ option1: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="option2"
                      placeholder="Enter option b"
                      type="text"
                      required="true"
                      onChange={(e) =>
                        this.setState({ option2: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="option3"
                      placeholder="Enter option c"
                      type="text"
                      required="true"
                      onChange={(e) =>
                        this.setState({ option3: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="option4"
                      placeholder="Enter option d"
                      type="text"
                      required={true}
                      onChange={(e) =>
                        this.setState({ option4: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <p className="h4">Correct Answer</p>
              <FormGroup>
                <Input
                  id="answer"
                  placeholder="Enter correct answer"
                  type="text"
                  required="true"
                  onChange={(e) => this.setState({ answer: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Game Level</p>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="level"
                  required="true"
                  onChange={(e) => this.setState({ level1: e.target.value })}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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

export default AddQuestions;
