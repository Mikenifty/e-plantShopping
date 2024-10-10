import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ onContinueShopping, onHandleNotInCart }) => {

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  
  const calculateTotalAmount = () => {
    let totalCost = 0;
        cart.map((item) => {                               // Initiate iteration
        const stripCost = item.cost.replace(/[$,]/g,"");   // Remove the dollar sign from the price information
        const itemCost = stripCost * item.quantity;        // Calculate the cost of an item by multiplying the quantity by the price
        totalCost += itemCost;                             // Calculate the total cost for the cart by adding each item cost to the total
        });   
    return totalCost;  
  };
 
  const handleContinueShopping = (e) => {  // Handle the continue shopping function
    return(onContinueShopping(e));
  };

  const handleNotInCart = (item) => {       // Handle the styling of the add to cart button in the ProductList component
    return(onHandleNotInCart(item));
  };

  const handleIncrement = (item) => {
     let newItem = structuredClone(item);   // Clone the state since it is read-only
     newItem.quantity++;
    dispatch(updateQuantity(newItem));      // Dispatch the updateQuantity action to update the quantity of items in the cart
  };

  const handleDecrement = (item) => {
    let newItem = structuredClone(item);    // Clone the state since it is read-only
    if (newItem.quantity > 1) {             // Conditionally update the cloned cart
      newItem.quantity--;
      dispatch(updateQuantity(newItem));     // Dispatch the updateQuantity action to update the quantity of items in the cart
    } else {
      dispatch(removeItem(item));            // Dispatch the removeItem action to remove the item from the cart
      handleNotInCart(item);                 // Handle the styling of the add to cart button in the ProductList component
    }  
  };

  const handleRemove = (item) => {
      dispatch(removeItem(item));             // Dispatch the removeItem action to remove the item from the cart
      handleNotInCart(item);                  // Handle the styling of the add to cart button in the ProductList component
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      const stripCost = item.cost.replace(/[$,]/g,"");  // Remove the dollar sign from the price information
      let itemCost = stripCost * item.quantity;         // Calculate the cost of an item by multiplying the quantity by the price
      return itemCost; 
  };

  const handleCheckoutShopping = (e) => {        // Handle frustrated customers
      alert('Sorry! Come again another day!');
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


