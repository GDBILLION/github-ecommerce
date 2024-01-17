import { useEffect, useState } from "react";
import { createContext } from "react"
import { PRODUCTS } from "../Pages/Shop/Product";
import ProductContainer from "../Components/ProductContainer";

export const DropDown = createContext(null);

export default function DropDownContextProvider (props) {
    
    const [input, setInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState({name:'', content:''});
    const [comments, setComments] = useState([
        {name: 'Michael', content:'This is my first paragraph'},
        {name: 'Mary', content:'This is my second paragraph'},
        {name: 'Maxwell', content:'This is my third paragraph'}
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(null);
    //const [cartItems, setCartItems] = useState([]);

    const toggleComment = () => {
        setShowComments(!showComments);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewComment((prevComment)=>({...prevComment, [name]: value}))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting comment:', newComment);
        if (newComment.name && newComment.content) {
            setComments((prevComment)=>[...prevComment, {...newComment}]);
            setNewComment({name:'', content:''});
        }
    };

    //modal operations
    const openModal = (productId) => {
        console.log('Selected products:', productId);
        const product = PRODUCTS.find((product)=>product.id===productId);
        console.log('selected product:', product);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //Cart Items

    const [cartItems, setCartItems] = useState([]);

        const addToCart = (productId) => {
            //implementing logic to add products to cart
            
            const productToAdd = PRODUCTS.find((product) => product.id === productId );
            console.log('Product id:', productId);

            if(productToAdd) {
                //check if product is already in cart
                const existingCartItemIndex = cartItems.findIndex((item)=>item.id===productId);
                console.log('Product to add:', productToAdd);
                 
            
            if(existingCartItemIndex !==-1) {
                //product already  in cart, increment quantity
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingCartItemIndex].quantity +=1;
                return updatedCartItems;
                //setCartItems(updatedCartItems);
            } else {
                //Product is not in cart.Add it with quantity 1
                setCartItems([...cartItems, {...productToAdd, quantity: 1}])
            }
        }
    };
    

    
   

    
    
    const contextValue = { input, setInput, currentPage, setCurrentPage, showComments, toggleComment,
                    newComment, handleInputChange, comments, handleSubmit, 
                    selectedProduct, isModalOpen, openModal, closeModal, cartItems, addToCart  }

    return(
        <DropDown.Provider value={contextValue}> {props.children} </DropDown.Provider>
    )
}
