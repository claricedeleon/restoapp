import { connect } from 'react-redux';
import { useState } from 'react';
import './InputNewItem.css';

const InputNewItem = ({ addNewItem }) => {
    const [newItemName, setNewItemName] = useState('')
    const [newItemPrice, setNewItemPrice] = useState('')
    const [newItemCategory, setNewItemCategory] = useState('')
    const [newItemImage, setNewItemImage] = useState('')
    const [, setErrorMessage] = useState('');

    const newItemNameEventHandler = (e) => {
        setNewItemName(e.target.value);
    }

    const newItemPriceEventHandler = (e) => {
        setNewItemPrice(e.target.value);
    }

    const newItemCategoryEventHandler = (e) => {
        setNewItemCategory(e.target.value);
    }

    const newItemImageEventHandler = (e) => {
        setNewItemImage(e.target.value);
    }

    const validate = () => {
        if (newItemName === '' || newItemPrice === '' || newItemImage === '') {
            setErrorMessage('Details must be complete.');
        } else if (newItemCategory === '') {
            setErrorMessage('Select a category.');
        } else {
            addNewItem(newItemName, newItemPrice, newItemCategory, newItemImage);
            setErrorMessage('');
            setNewItemName('');
            setNewItemPrice('');
            setNewItemCategory('');
            setNewItemImage('');
        }
    }

    return (
        <div className="form-container">
            <h4>Would you like to add a new item on the menu?</h4>
            <form>
                <label className="label" htmlFor="newItemName">Item Name: </label>
                <input className="input" type="text" name="newItemName" onChange={newItemNameEventHandler} value={newItemName} /> <br />

                <label className="label" htmlFor="newItemPrice">Price: </label>
                <input className="input" type="text" name="newItemPrice" onChange={newItemPriceEventHandler} value={newItemPrice} /> <br />

                <label className="label" htmlFor="newItemCategory">Category: </label>
                <select id="category" name="newItemCategory" onChange={newItemCategoryEventHandler} value={newItemCategory}>
                    <option value="">Select Category...</option>
                    <option value="All" className="options">All</option>
                    <option value="Food" className="options">Food</option>
                    <option value="Drink" className="options">Drink</option>
                    <option value="Dessert" className="options">Dessert</option>
                </select> <br />

                <label className="label" htmlFor="newItemImage">Image URL: </label>
                <input className="input" type="text" name="newItemImage" onChange={newItemImageEventHandler} value={newItemImage} /> <br />

                <button id="addBtn" type="button" onClick={() => validate()}>Add Item</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNewItem: (newItemName, newItemPrice, newItemCategory, newItemImage) => dispatch({ type: 'ADD_NEW_ITEM', payload: { name: newItemName, price: newItemPrice, category: newItemCategory, image: newItemImage } })
    }
}


export default connect(null, mapDispatchToProps)(InputNewItem);