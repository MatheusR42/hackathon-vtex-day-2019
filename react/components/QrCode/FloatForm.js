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
      this.setState({
          isOpenAnimation: false
      }, () => {
        setTimeout(() => {
            this.props.onClose();
        }, 500)
      })
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
                        Add to Cart
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
