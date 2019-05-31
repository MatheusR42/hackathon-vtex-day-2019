import React from "react";
import { graphql } from "react-apollo";
import queryProducts from "../../graphql/queries/queryProducts.gql";
import TotemItem from './TotemItem';
import './global.css';

class Totem extends React.Component {
  constructor(props) {
    super(props);
  }

  static getSchema = () => {
    return {
      title: "Totem Banner",
      description: "Customize Totem Banner",
      type: "object",
      properties: {
        banner: {
          type: "string",
          title: "Banner",
          default:
            "https://hackathon22.myvtex.com/arquivos/banner-dia-jogo.png",
          widget: {
            "ui:widget": "image-uploader"
          }
        },
        collectionId: {
          type: "string",
          title: "Collection Id",
          default: "137"
        }
      }
    };
  };

  render() {
    let products = [];

    if (!this.props.data.loading) {
      products = this.props.data.products
    }

    return (
      <div
        className="totem-component"
        style={{
          backgroundImage:
            "url(" +
            encodeURI(this.props.banner) +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
      <div className="totem-itens">
        {products.map((product, index) => {
          if (index < 2) {
            return <TotemItem product={product} key={index}/>
          }

          return null;
        })}
      </div>
      </div>
    );
  }
}

export default graphql(queryProducts,{
  options: props => {
    return {
      variables: {
        collection: props.collectionId
      }
    }
  }
})(Totem);
