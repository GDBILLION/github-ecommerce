import { useContext, useState } from "react";
import { PRODUCTS } from "../Pages/Shop/Product";
import Product from "../Product";
import { DropDown } from "../context/dropDownContext";
import Search from "./Search";
import { Link, Route } from "react-router-dom";
import SecondProductPage from "../Pages/Shop/SecondProductPage";


export default function ProductContainer (){
    const {input, setInput, currentPage, setCurrentPage} = useContext(DropDown);
    const [sortBy, setSortBy] =useState('');
    

    const productsPerPage = 8;

    const handlePageChange = (pageNumber) => {
        console.log('changing page to:', pageNumber);
        setCurrentPage(pageNumber);
        console.log('UpdatedCurrentPage:', currentPage)
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
        console.log('UpdatedCurrentPage:', currentPage)
    };

    const filteredProducts = PRODUCTS.filter((product)=>{
        if (input===''){
            return product;
        } else if (product.title.toLowerCase().includes(input.toLowerCase())){
            return product;
        }
        return null
    });

    const sortedProducts = sortBy === 'highest' ? 
        filteredProducts.sort((a, b) =>b.price - a.price):
        sortBy==='lowest' ?
        filteredProducts.sort((a, b) =>a.price - b.price):
        filteredProducts;

        //Calculate pagination indexes
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = sortedProducts.slice(
            indexOfFirstProduct,
            indexOfLastProduct
        )
    return(
        <>
            <div className="shop">
                    <Search />
                    <div className="ourProducts">
                        <h2> Our Products</h2>
                    </div>
                    <form>
                        <label>
                            Sort by:
                            <select value={sortBy} onChange={handleSortChange}>
                                <option value="">Select</option>
                                <option value="highest">Highest</option>
                                <option value="lowest">Lowest</option>
                            </select>
                        </label>
                    </form>
                    <div className="products">
                        {currentProducts.map((product)=>(
                          <Link key={product.id} to= {`/product/${product.id}`}> 
                          <Product data={product}/>
                          </Link>
                        ))}
                    </div>
                   {/** <Route path= "/product/:id" component= {SecondProductPage} />  */}
            </div>
            
            <div className="pagenation">
                    <button className="btn1" onClick={()=> handlePageChange(1)}>First</button>
                    <button 
                        className="btn2" 
                        onClick={()=> handlePageChange(currentPage - 1)}
                        disabled={currentPage===1}
                        >Previous</button>
                    {[...Array(Math.ceil(sortedProducts.length / productsPerPage)).keys()].
                        map((pageNumber)=>(
                            <li
                                key={pageNumber}
                                className={`link ${currentPage === pageNumber + 1 ? 'active': '' }`}
                                value={pageNumber + 1}
                                onClick={() => handlePageChange(pageNumber + 1)}>
                                    {pageNumber + 1}
                                </li>
                        )
                    )}
                    <button 
                        className="btn3"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage===Math.ceil(sortedProducts.length / productsPerPage)}>Next</button>
                    <button 
                        className="btn4"
                        onClick={()=>handlePageChange(Math.ceil(sortedProducts.length / productsPerPage))}>Last</button>
            </div>           
        </>
    )
}