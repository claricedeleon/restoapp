import './Cart.css';
import { connect } from 'react-redux';

const Cart = (props) => {

    return (
        <div className="cart-item">
            <img src={props.item.image} alt={props.item.name} className='item-image' />
            <div className="item-details">
                <h4>{props.item.name}</h4>
                <p>₱{props.item.price}</p>
                <button className="qtyBtn" onClick={() => props.subtract(props.item)}>-</button>
                <strong> Qty: {props.item.quantity} </strong>
                <button className="qtyBtn" onClick={() => props.add(props.item)}>+</button>
            </div>
            <div className="subtotal">
                <span><strong>Subtotal</strong> ₱{props.item.subtotal}</span>
            </div>
        </div>

    );

}

const mapDispatchToProps = dispatch => {
    return {
        subtract: (item) => dispatch({ type: 'SUBTRACT_QUANTITY', payload: item }),
        add: (item) => dispatch({ type: 'ADD_QUANTITY', payload: item })
    }
}

export default connect(null, mapDispatchToProps)(Cart);