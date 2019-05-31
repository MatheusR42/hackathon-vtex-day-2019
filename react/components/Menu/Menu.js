import React from "react";
import { Link } from "vtex.render-runtime";
import '../QrCode/global.css'
import Header from '../Header/header'
import Footer from '../Footer/Footer'

class Menu extends React.Component {
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
            <div className="menu">
                <Header
                    user={'/arquivos/user.png'}
                    avatar={'/arquivos/cart.png'}
                />
                <div className="menu-btn">
                    <div className="menu-pointer">
                        <img src={'/arquivos/pointer.png'} />
                        Onde você está?
                    </div>
                    <div className="btn-shop">
                        <Link 
                            page='store.qrcode'
                        >
                        <img src={ '/arquivos/shop.png' } />
                        </Link>
                    </div>
                    <div className="btn-noshop">
                       <Link page="store.qrcode">
                         <img src={ '/arquivos/noshop.png' }  />
                       </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Menu;
