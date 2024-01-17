import { Link, useParams, useNavigate } from "react-router-dom"
import { PRODUCTS } from "./Product";
import { useContext } from "react";
import { DropDown } from "../../context/dropDownContext";
import CartModel from "../../Components/CartModal";
import CartModal from "../../Components/CartModal";
import CartItem from "../Cart/CartItem";




export default function SecondProductPage () {
    const { showComments, toggleComment, newComment,
         handleInputChange, comments, handleSubmit, 
         selectedProduct, isModalOpen, openModal, closeModal, cartItems, addToCart } = useContext(DropDown);
    //const navigate = useNavigate();
    
         
    const {id} = useParams();
    const productId = parseInt(id, 10);
    console.log('ProductId:', productId);

    const product = PRODUCTS.find((product)=>product.id===productId);
    console.log('PRODUCTS:', PRODUCTS);

    if (!product) {
        return <div>Product not found</div>;
    }

    const {title, img, price, info, inCart, company} = product;

    //to handle add to cart
    const cartIndex = cartItems.findIndex(item => item.id ===productId);
    console.log('cart index:', cartIndex)
    const handleAddToCart = () => {
        
        console.log('current cart items:', cartItems)
        openModal(productId);
       // navigate('/cart');
        
        if (cartIndex !== -1){
            //product is already in cart, increment
            const updatedCartItems = [...cartItems];
            updatedCartItems[cartIndex].quantity +=1;
            addToCart(productId);
        } else {
            //Product is not in cart. add it with quantiy 1
            addToCart(productId, [...cartItems, {...product, quantity:1}]);
        }
        console.log(`Product ${title} added to the cart!`);
        console.log('Current cart items:', cartItems);
    }

   {/*} const product = PRODUCTS.find((product)=>product.id===productId);
    console.log('PRODUCTS:', PRODUCTS);

    if (!product) {
        return <div>Product not found</div>;
    }

const {title, img, price, info, inCart, company} = product;*/}

    return(
        <>
            <h1> {title} </h1>
                    <div className="secTotal">
                    <img src={img} alt="title" />
                        <div className="sec">
                            <h2>Model: {title} </h2>
                                <h4>Made By: {company} </h4>
                                    <p id="p">Price: ${price} </p>
                                        <h4>Some Info Product</h4>
                                    <p>{info} </p>
                                {inCart ? (<p>In Cart</p>) : 
                            (<div className="add">
                                <Link to="/"> <button>Back To Products</button></Link>
                                <button onClick={handleAddToCart}> Add to Cart </button>  
                            </div>
                            )} {isModalOpen && selectedProduct && (
                                <CartModal product={selectedProduct} closeModal={closeModal} />
                            )}
                        </div>
                    </div>
                        <div className="commentBox">
                            <h2>What's your thought?</h2>
                                <form className="comment-form" onSubmit={handleSubmit}>
                                    <div className="comment-form-fields">
                                        <input 
                                            placeholder="Name" 
                                            required 
                                            type="text" 
                                            name="name" 
                                            value={newComment.name}
                                            onChange={handleInputChange}/>
                                        <br/>
                                        <textarea 
                                            placeholder="comment"
                                            name="content"
                                            value={newComment.content} 
                                            onChange={handleInputChange} 
                                            ></textarea>
                                    </div>
                                    <div className="comment-form-action">
                                        <button type="submit">Post Comment</button>
                                    </div>
                                </form>
                                <button id="comment-reveal" onClick={toggleComment}>
                                    {showComments ? 'Hide comments' : 'Show comments'}
                                </button>
                                
                                    <h4 className="comment-count">{comments.length} comments</h4><br/><br/>
                                {
                                    showComments && (
                                        <div id="comments-container">
                                            {
                                                comments.map((comment, index)=> (
                                                    <div key={index} className="comment">
                                                        <div className="comment-author">
                                                            <strong> {comment.name}: </strong>
                                                        </div>
                                                        <p> {comment.content} </p>
                                                    </div>
                                                ))}
                                            </div>
                                            )}
                                        </div>
                                        <CartItem id={id} img={img} title={title} price={price} company={company} />
                                     </>
                                    )
                                }