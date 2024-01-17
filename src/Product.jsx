export default function Product (props) {
    const {id, title, price, img} = props.data
    return(
        <>
        <div className="product">
               <div className="img"> 
                    <img src={img}  />
                 </div>            
                 <div className="description">
                    <p> {title} </p>
                    <p> <b>${price}</b> </p>
                </div>
        </div>
        </>
    )
}