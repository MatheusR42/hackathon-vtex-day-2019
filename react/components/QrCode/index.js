import React from "react";
import QrReader from "react-qr-reader";
import FloatForm from "./FloatForm";
import { ToastProvider } from "vtex.styleguide";

import "./global.css";

class QrCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: null,
      slug: null,
      utm: null
    };
  }

  handleScan = data => {
    // if (data) {
    //   this.setState({
    //     result: data
    //   });
    // }
  };

  handleError = err => {
    console.error(err);
  };

  getParams(name, href) {
    if (!name || !window.location) return;

    href = href || window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regexS = "[\\?&]" + name + "=([^&#]*)";
    let regex = new RegExp(regexS);
    let results = regex.exec(href);

    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  closeFloatForm = () => {
    this.setState({
      sku: null,
      slug: null,
      utm: null
    });
  };

  fakeScan = () => {
    const data =
      "https://hackathonvtex22.vtexcommercestable.com.br/amendoim-japones-yoki/p?sku=57&utm_source=saopaulo";

    if (data && ~data.indexOf("/p")) {
      const urlComponents = new URL(data);
      const slug = urlComponents.pathname.split("/")[1];
      const utm = this.getParams("utm_source", data);
      const sku = this.getParams("sku", data);

      this.setState({
        sku,
        slug,
        utm
      });
    }
  };

  render() {
    const { sku, slug, utm } = this.state;

    return (
      <div>
        <ToastProvider positioning="window">
          <button onClick={this.fakeScan}>faq scan</button>

          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />

          {sku && slug && (
            <FloatForm
              sku={sku}
              slug={slug}
              utm={utm}
              onClose={this.closeFloatForm}
            />
          )}
        </ToastProvider>
      </div>
    );
  }
}

export default QrCode;
