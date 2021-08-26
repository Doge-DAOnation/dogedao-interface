import React, { Component } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Options from "../../assets/option.svg";
import ETH from "../../assets/eth.svg";
import Doge from "../../assets/doge.svg";

export default class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: false,
      show: false,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 991.98 });
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  handleClose = () =>
    this.setState({
      show: false,
    });
  handleShow = () =>
    this.setState({
      show: true,
    });

  render() {
    const { isDesktop, show } = this.state;

    const data = [
      {
        icon: ETH,
        name: "Item Name",
      },
      {
        icon: Doge,
        name: "Item Name",
      },
      {
        icon: ETH,
        name: "Item Name",
      },
      {
        icon: Doge,
        name: "Item Name",
      },
    ];

    return (
      <>
        <Row>
          <Col lg={12} className="py-3 d-flex justify-content-between">
            <div className="d-flex">
              <div className="py-2 px-3 d-flex align-items-center mr-2 header_badge">
                <h6 className="mb-0 mr-2">CIRCULATING SUPPLY: </h6>
                <h5 className="mb-0">9.557T</h5>
              </div>

              <div className="py-2 px-3 d-flex align-items-center mr-2 header_badge">
                <h6 className="mb-0 mr-2">MARKET CAP: </h6>
                <h5 className="mb-0">$112M</h5>
              </div>

              <div className="py-2 px-3 d-flex align-items-center mr-2 header_badge">
                <h6 className="mb-0 mr-2">MARKET PRICE: </h6>
                <h5 className="mb-0">$0.000013</h5>
              </div>
            </div>
            <div>
              <Button
                variant="warning"
                className="orange_button mr-2"
                onClick={this.handleShow}
              >
                Connect Wallet
              </Button>
              <Button
                variant="outline-secondary"
                className="px-2 border_radius"
              >
                <img src={Options} alt="" />
              </Button>
            </div>
          </Col>
        </Row>

        <Modal show={show} onHide={this.handleClose} centered>
          <Modal.Header closeButton className="border-0 text_app_color">
            <Modal.Title>
              <h5 className="mb-0">Connect wallet</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data.map((e) => (
              <div className="d-flex align-items-center app_light_grey_bg border_radius text_app_color px-3 py-2 mb-2">
                <img src={e.icon} alt="" height="35px" className="mr-2" />
                <h6 className="mb-0">{e.name}</h6>
              </div>
            ))}

            <Button
              variant="warning"
              className="mr-2 w-100 border_radius orange_button py-2"
              onClick={this.handleClose}
            >
              Confirm purchase
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
