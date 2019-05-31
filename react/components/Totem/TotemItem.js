import React from 'react';
import QRCode from 'qrcode.react';

const createQRUrl = product => {
    const sku = product.items[0].itemId;
    return 'https://hackathonvtex22.myvtex.com/' + product.linkText + '/p?sku=' + sku + '&utm_source=saopaulo';
}

const TotemItem = ({product}) => {
    return (
        <div className="totem-item">
            <img src={product.items[0].images[0].imageUrl} />

            <div className="qr-wrapper">
                <QRCode size={100} value={createQRUrl(product)} />
            </div>
        </div>
    )
}

export default TotemItem;