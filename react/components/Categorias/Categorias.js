import React from "react";
import '../QrCode/global.css'
import Header from '../Header/header'
import { Link } from "vtex.render-runtime";

class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "No results"
        };
    }

    teste() {
        alert()
    }

    render() {
        return (
            <div>
                <Header
                    user={'/arquivos/user.png'}
                    avatar={'/arquivos/cart.png'}
                />
                <div className="categorias">
                    <div>
                        catalogo
                    </div>
                    <div className="btn">
                        <a href="/snacks/d">
                            <img src={'/arquivos/cat-1.png'} />
                        </a>
                        <a href="/bebidas/d">
                            <img src={'/arquivos/cat-2.png'} />
                        </a>
                    </div>
                    <div className="cat">
                        <img src={'/arquivos/categorias.png'} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Categorias;
