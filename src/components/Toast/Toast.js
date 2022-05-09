import React, {Component} from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastComponent';

class Toast extends Component {
  static add() {
    this.toastRef = React.createRef();
    const toast = new RootSiblings(<ToastContainer ref={this.toastRef} />);
    this.toast = toast;
    return toast;
  }

  static show(message, options = {}) {
    if (this.toastRef && this.toastRef.current) {
      this.toastRef.current.show(message);
    } else {
      this.toastRef = React.createRef();
      const toast = new RootSiblings(
        <ToastContainer ref={this.toastRef} message={message} />,
      );
      this.toast = toast;
    }
    return this.toast;
  }

  static hide(toast) {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else if (this.toast instanceof RootSiblings) {
      this.toast.destroy();
    }
  }

  componentWillUnmount() {
    this.toast.destroy();
  }

  render() {
    return null;
  }
}

export {RootSiblings as Manager};
export default Toast;
