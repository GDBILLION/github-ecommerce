import { useContext } from "react";
import { PRODUCTS } from "../Shop/Product";
import { DropDown } from "../../context/dropDownContext";
import CartItem from "./CartItem";



export default function Cart () {
    const {cartItems} = useContext(DropDown);
    return  (
        <>
            <div className="cart">
                <h2>Your Cart</h2>
            </div>
            <div className="cartItems">
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !==0) {
                        //then product is in cart
                        return <CartItem key= {product.id} data={product}/>
                        
                        
                    }
                })}
            </div>
        </>
    )
}