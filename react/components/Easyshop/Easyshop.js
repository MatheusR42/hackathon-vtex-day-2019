import React from "react";
import './global.css'
import LoginContent from 'vtex.login/LoginContent';

class Easyshop extends React.Component {
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
      <div className="easyshop">
        
        <div className="logo">
          <img src={'/arquivos/Caminho 1.png'} />
        </div>
        <div className="home-banner">
          <img src={'/arquivos/banner-home.png'} />
        </div>
        <div className="label-login">
          <div>
            Faça o login para continuar:
          </div>
        </div>
        <LoginContent />
      </div>
    );
  }
}

export default Easyshop;
