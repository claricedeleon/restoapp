import './App.css';
import InputNewItem from './components/InputNewItem';
import Item from './components/Item';
import Cart from './components/Cart';
import { connect } from 'react-redux';


const App = (props) => {
  return (
    <div className="body">
      <h1 id="title">RESTO APP</h1>
      <div className="contents">
        <div className="input-container">
          <InputNewItem />
        </div>
        <div className="menu">
          <h2>MENU</h2>
          <div className="items-container">
            {props.items.map(item => {
              return <Item key={item.id} item={item} />
            })}
          </div>
        </div>

        <div className="cart-container">
          <h3>Your Shopping Cart</h3>
          {
            props.cart.map(item => {
              return <Cart key={item.id} item={item} />
            })
          }
          <h4 className="total">Total: ₱{props.total}</h4>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items,
    cart: state.cart,
    total: state.total
  }
}


export default connect(mapStateToProps)(App);
