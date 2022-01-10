import React from 'react';
import "react-responsive-modal/styles.css";
import Modal from 'react-responsive-modal';

class ResponsiveModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }

  onCloseModal = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <button className={this.props.buttonClass} onClick={this.onOpenModal}>{this.props.buttonText}</button>
        <Modal open={open} onClose={this.onCloseModal} classNames={{
          modal: this.props.modalClass
        }}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ResponsiveModal