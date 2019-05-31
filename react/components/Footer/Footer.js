import React from "react";
import '../QrCode/global.css'

class Footer extends React.Component {
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
            <div className="footer">
                <img src={ '/arquivos/footer-icons.png'} />
            </div>
        );
    }
}

export default Footer;
