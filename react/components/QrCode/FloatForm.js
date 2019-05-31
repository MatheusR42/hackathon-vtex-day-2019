import React from "react";
import classNames from "classnames";
import {
  Spinner,
  NumericStepper,
  ButtonGroup,
  Button,
  ToastConsumer
} from "vtex.styleguide";
import { withApollo, graphql, compose } from "react-apollo";
import mutationAddItem from "../../graphql/mutations/mutationAddItem.gql";
import queryOrderForm from "../../graphql/queries/queryOrderForm.gql";
import queryProduct from "../../graphql/queries/queryProduct.gql";

import "./global.css";

class FloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      isAddingToCart: false,
      isOpenAnimation: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isOpenAnimation: true
      });
    }, 200);
  }

  addToCart = showToast => {
    const {
      queryOrderForm: { orderForm },
      client,
      sku
    } = this.props;

    const { quantity } = this.state;
    this.setState({
      isAddingToCart: true
    });
    client
      .mutate({
        mutation: mutationAddItem,
        variables: {
          orderFormId: orderForm.orderFormId,
          items: [
            {
              id: sku,
              // index: IntqueryOrderForm
              quantity,
              seller: 1
            }
          ]
        },
        refetchQueries: [{ query: queryOrderForm }]
      })
      .then(res => {
        this.setState({
          isAddingToCart: false
        });
        this.close();
        showToast("Produto adicionado no carrinho");
      });
  };

  close() {
    this.setState(
      {
        isOpenAnimation: false
      },
      () => {
        setTimeout(() => {
          this.props.onClose();
        }, 500);
      }
    );
  }

  formatMoney(number, decimals, dec_point, thousands_sep, symbol) {
    if (
      number === undefined ||
      !decimals ||
      !dec_point ||
      !thousands_sep ||
      !symbol
    )
      return;

    number = (number + "").replace(",", "").replace(" ", "");

    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function(n, prec) {
        let k = Math.pow(10, prec);
        return "" + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }

    return symbol + " " + s.join(dec);
  }

  render() {
    const { queryProduct, queryOrderForm } = this.props;

    const { isOpenAnimation, isAddingToCart } = this.state;

    if (queryProduct.loading || queryOrderForm.loading) {
      return (
        <form className={classNames("float-form", { isOpen: isOpenAnimation })}>
          <div className="formscroll">
            <div className="product-wrapper">
              <Spinner />
            </div>
          </div>
        </form>
      );
    }

    const { isOpen } = this.props;
    const { brand, productId, productName, items } = queryProduct.product;
    const price = this.formatMoney(items[0].sellers[0].commertialOffer.Price, 2, ',', '.', 'R$');

    return (
      <form className={classNames("float-form", { isOpen: isOpenAnimation })}>
        <div className="formscroll">
          <div className="product-wrapper">
            <header>
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.close();
                }}
              >
                &#8249;
              </Button>
              <span>Detalhes do item</span>
            </header>

            <img src={items[0].images[0].imageUrl} />
            <h1>{productName}</h1>
            <span>{brand}</span>
            <div className="float-price">
              <strong>
                {price}
              </strong>
            </div>

            <div className="float-actions">
              <ToastConsumer>
                {({ showToast }) => (
                  <ButtonGroup
                    buttons={[
                      <NumericStepper
                        label=""
                        minValue={1}
                        //   size="small"
                        value={this.state.quantity}
                        onChange={event => {
                          event.preventDefault();
                          this.setState({ quantity: event.value });
                        }}
                      />,

                      <Button
                        variation="primary"
                        isActiveOfGroup={true}
                        isLoading={isAddingToCart}
                        onClick={() => {
                          this.addToCart(showToast);
                        }}
                      >
                        Comprar
                      </Button>
                    ]}
                  />
                )}
              </ToastConsumer>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default compose(
  withApollo,
  graphql(queryProduct, {
    options: ({ slug }) => {
      return {
        variables: {
          slug
        }
      };
    },
    name: "queryProduct"
  }),
  graphql(queryOrderForm, {
    options: () => {
      ssr: false;
    },
    name: "queryOrderForm"
  })
)(FloatForm);
