//for appearing message when cart is clicked

export default function CartModal ( {product, closeModal} ) {
    const {img, title, price, company } = product;
    console.log(product);
    return (
        <>
            <div className="modal">
                <div id="topHead">
                    <h4>Item Added To The Cart</h4>
                </div>
                <div id="modal-content">
                    <h2> {title} </h2>
                    <img src={img} alt={title}/>
                    <p> {company} </p>
                    <p> Price: ${price} </p>
                    <div className="modalButton">
                        <button onClick={closeModal}> Continue Shopping</button>
                        <button>Go To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}