import { cloneDeep } from 'lodash';

const initialState = {
    items: [
        {
            id: 1,
            name: "Burger",
            price: 50,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046784.svg"
        },
        {
            id: 2,
            name: "Pizza",
            price: 100,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046771.svg"
        },
        {
            id: 3,
            name: "Fries",
            price: 25,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046786.svg"
        },
        {
            id: 4,
            name: "Coffee",
            price: 35,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046785.svg"
        },
        {
            id: 5,
            name: "Iced Tea",
            price: 45,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046782.svg"
        },
        {
            id: 6,
            name: "Hot Tea",
            price: 45,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046792.svg"
        },
    ],
    cart: [],
    total: 0
}

const solveTotal = (cartItems) => {
    let total = 0;
    cartItems.map(cartItem => {
        cartItem.subtotal = cartItem.price * cartItem.quantity
        total += cartItem.subtotal;
    });

    return total;
}


const reducer = (state = initialState, action) => {
    let item;
    let total;
    let cartCopy;
    let itemsCopy;
    let deletedItems;

    switch (action.type) {
        case 'ADD_NEW_ITEM':
            itemsCopy = [...state.items]
            itemsCopy.push({
                name: action.payload.name,
                price: action.payload.price,
                category: action.payload.category,
                image: action.payload.image,
            })
            return {
                ...state,
                items: cloneDeep(itemsCopy),
            }
        case 'ADD_TO_CART':
            item = action.payload;
            cartCopy = cloneDeep(state.cart);

            let exists = false;
            cartCopy = cartCopy.map(cartItem => {
                if (cartItem.id === item.id) {
                    cartItem.quantity++;
                    exists = true;
                }
                return cartItem;
            });

            if (exists === false) {
                item.quantity = 1;
                cartCopy.push(item);
            };

            total = solveTotal(cartCopy);

            return {
                ...state,
                cart: cartCopy,
                total: total
            }
        case 'DELETE_FROM_MENU':
            deletedItems = [...state.items]
            console.log(action.payload)
            return {
                ...state,
                items: deletedItems.filter(item => item !== action.payload)
            }
        case 'SUBTRACT_QUANTITY':
            item = action.payload;
            cartCopy = [...state.cart]
            if (cartCopy) {
                item.quantity--;
            }
            if (item.quantity === 0) {
                cartCopy = cartCopy.filter(cartItem => {
                    return (cartItem.id !== item.id)
                })
            }

            total = solveTotal(cartCopy);
            return {
                ...state,
                cart: cloneDeep(cartCopy),
                total: total
            }
        case 'ADD_QUANTITY':
            item = action.payload;
            cartCopy = [...state.cart]
            if (cartCopy) {
                item.quantity += 1;
            }
            total = solveTotal(cartCopy);
            return {
                ...state,
                cart: cloneDeep(cartCopy),
                total: total
            }

        default:
            return state;
    }
}

export default reducer;