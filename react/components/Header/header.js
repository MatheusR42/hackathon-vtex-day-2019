import React from "react";
import { graphql } from "react-apollo";
import { ModalDialog } from "vtex.styleguide";
import { AuthService } from "vtex.react-vtexid";
import queryOrderForm from "../../graphql/queries/queryOrderForm.gql";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  modalUser = () => {
    this.setState({ isModalOpen: true });
  };

  render() {
    let cartQuantity = 0;

    if (!this.props.queryOrderForm.loading) {
      const { orderForm } = this.props.queryOrderForm;
      cartQuantity = orderForm.items.reduce(
        (a, b) => {
          return a.quantity + b.quantity;
        },
        {
          quantity: 0
        }
      );
    }

    return (
      <div className="header">
        <AuthService.RedirectLogout returnUrl="/">
        {({ action: logout }) => (
          <ModalDialog
            centered
            confirmation={{
              onClick: logout,
              label: "Ok"
            }}
            cancelation={{
              onClick: () => this.setState({ isModalOpen: false }),
              label: "Canelar"
            }}
            isOpen={this.state.isModalOpen}
            onClose={() => this.setState({ isModalOpen: false })}
          >
            <p>Deseja sair?</p>
          </ModalDialog>
          )}
        </AuthService.RedirectLogout>
        <div className="shop-name">
          <img src={"/arquivos/Caminho 1.png"} />
        </div>
        <div className="shop-nav">
          <div className="image-user">
            <img src={this.props.user} onClick={this.modalUser} />
          </div>
          <div className="image-cart">
            <a href="/checkout#/cart">
              <img src={this.props.avatar} />
              <span className="quantity">{cartQuantity}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(queryOrderForm, {
  options: () => {
    ssr: false;
  },
  name: "queryOrderForm"
})(Header);
