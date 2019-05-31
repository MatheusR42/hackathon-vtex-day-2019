import React from "react";
import { graphql, withApollo } from "react-apollo";
import { ModalDialog } from "vtex.styleguide";
import { AuthService } from "vtex.react-vtexid";
import mutationUpdateItems from "../../graphql/mutations/mutationUpdateItems.gql";
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

  removeOthersItemsFromCart = (logout) => {
    const { orderForm } = this.props.queryOrderForm;
    
    var items = orderForm.items.map((item, index) => {
        return {
          id: item.id,
          quantity: 0,
          index: index,
          seller: 1
        }
    });

    if (!items.length) {
      logout();
      return;
    }
    
    this.props.client.mutate({
      mutation: mutationUpdateItems,
      variables: {
        "orderFormId": orderForm.orderFormId,
        "items": items
      }
    }).then((resp) => {
      logout();
    }).catch(e => {
        console.error("error", e);
    });
  }

  render() {
    let cartQuantity = 0;

    if (!this.props.queryOrderForm.loading) {
      const { orderForm } = this.props.queryOrderForm;
      if (orderForm.items.length) {
        cartQuantity = orderForm.items.reduce(
          (a, b) => {
            return a.quantity + b.quantity;
          },
          {
            quantity: 0
          }
        );
      }
    }

    return (
      <div className="header">
        <AuthService.RedirectLogout returnUrl="/">
        {({ action: logout }) => (
            <ModalDialog
              centered
              confirmation={{
                onClick: () => this.removeOthersItemsFromCart(logout),
                label: "Sim"
              }}
              cancelation={{
                onClick: () => this.setState({ isModalOpen: false }),
                label: "Não"
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
})(withApollo(Header));
