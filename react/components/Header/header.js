import React from "react";


class Header extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      result: "No results"
    };
  }
  
  teste(){
    alert()
  }

  render() {
    return (
      <div className="header">
          <div className="shop-name">
              <img src={ '/arquivos/Caminho 1.png' } />
          </div>
          <div className="shop-nav">
              <div className="image-user">
                <img 
                  src={ this.props.user }
                  onClick={ this.teste }
                 />
              </div>
              <div className="image-cart">
                <img 
                  src={ this.props.avatar } 
                  onClick={ this.teste }
                />
              </div>
          </div>
      </div>
    );
  }
}

export default Header;
