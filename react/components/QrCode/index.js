import React from "react";
import QrReader from "react-qr-reader";
import Header from '../Header/header';
import { FormattedMessage } from "react-intl";
import './global.css';

class QrCode extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      result: "No results"
    };
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  }

  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <Header 
          user={ '/arquivos/user.png' }
          avatar={ '/arquivos/cart.png' }
        />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ 
            width: "100",

          }}
        />
      </div>
    );
  }
}

export default QrCode;
