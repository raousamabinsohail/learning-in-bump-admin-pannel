import React, { Component } from "react";
import { Button, FormGroup, Alert, Input, Modal } from "reactstrap";

class AddExercise extends Component {
  state = {
    exampleModal: false,
    error: false,
    errorText: "",
    level1: "1",
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const description = this.state.description;
    const duration = this.state.duration;
    const tremister = parseInt(this.state.level1);
    const exerciseImage = this.state.file;
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("tremister", tremister);
    formData.append("exerciseImage", exerciseImage);

    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/addexercise", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: formData,
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
        this.setState({ exampleModal: false });
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
          Add New Exercise
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Exercise
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
              <p className="h4">Description</p>
              <FormGroup>
                <Input
                  id="description"
                  placeholder="Enter exercise description"
                  type="textarea"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </FormGroup>
              <p className="h4">Duration:</p>
              <FormGroup>
                <Input
                  id="title"
                  placeholder="Enter exercise title"
                  type="text"
                  required="true"
                  onChange={(e) => this.setState({ duration: e.target.value })}
                />
              </FormGroup>
              <p className="h4">Image</p>
              <FormGroup>
                <Input
                  id="file"
                  placeholder="Enter correct answer"
                  type="file"
                  onChange={(e) => this.setState({ file: e.target.files[0] })}
                />
              </FormGroup>
              <p className="h4">Tremister</p>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
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

export default AddExercise;
