import './Item.css';
import { connect } from 'react-redux';

const Item = (props) => {

    return (
        <div className="item">
            <img src={props.item.image} alt={props.item.name} width={80} />
            <div className="item-description">
                <h4>{props.item.name}</h4>
                <p>₱{props.item.price}</p>
                <button onClick={() => props.addToCart(props.item)} id="order-btn">order</button>
                <button onClick={() => props.deleteFromMenu(props.item)} id="delete-btn">delete</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: item => dispatch({ type: 'ADD_TO_CART', payload: item }),
        deleteFromMenu: item => dispatch({ type: 'DELETE_FROM_MENU', payload: item })
    }
}

export default connect(null, mapDispatchToProps)(Item);