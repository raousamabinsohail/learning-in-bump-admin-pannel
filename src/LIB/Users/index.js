import React, { Component } from "react";
import UserHeader from "./users-header";
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      curretpage: 1,
      startIndex: 0,
      endIndex: 5,
    };
  }

  changePage = (i) => {
    let ofset = i * 5;
    this.setState({
      curretpage: i,
      startIndex: ofset - 5,
      endIndex: ofset,
    });
  };
  makePagination = () => {
    let pages = Math.ceil(this.state.data.length / 5);

    return (
      <React.Fragment>
        {" "}
        {Array.from(Array(pages), (e, i) => {
          return (
            <PaginationItem
              className={this.state.curretpage === i + 1 ? "active" : ""}
              key={i}
            >
              <PaginationLink
                href="#pablo"
                onClick={() => this.changePage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </React.Fragment>
    );
  };
  componentDidMount = () => {
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/viewallusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      // body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error("Error:", error);

        alert(error);
      });
  };

  HandleDelete = (id, index) => {
    const data = {
      _id: id,
    };
    fetch("https://lit-caverns-52628.herokuapp.com/api/admin/deleteuser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success:", res);
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error("Error:", error);

        alert(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">TimeStamp</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data
                      .slice(this.state.startIndex, this.state.endIndex)
                      .map((value, index) => (
                        <tr key={index}>
                          <th scope="row">{value.firstName}</th>
                          <td>{value.lastName}</td>

                          <td>{value.email}</td>
                          <td>{value.phone}</td>
                          <td>{value.createdDate}</td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light "
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() =>
                                    this.HandleDelete(value._id, index)
                                  }
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={
                          this.state.curretpage === 1 ? "disabled" : ""
                        }
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={() =>
                            this.changePage(this.state.curretpage - 1)
                          }
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {this.makePagination()}

                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={() =>
                            this.changePage(this.state.curretpage + 1)
                          }
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default index;
