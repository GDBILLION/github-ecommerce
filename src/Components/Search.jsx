import { useContext } from "react"
import { DropDown } from "../context/dropDownContext"
import {PRODUCTS} from '../Pages/Shop/Product'
import ProductContainer from "./ProductContainer";

export default function Search() {
    const {input, setInput, generatedData, setGeneratedData,generateData } = useContext(DropDown);
    const {selected, handleOptionChange} = useContext(DropDown);
    
    

    
        
    return (
        <>
        
                    <div className="search2">
                        <label>
                            <p>Search Phone:</p>
                        </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={input}
                                    onChange={(e)=>setInput(e.target.value)}/>
                        
                    </div>
        
        </>
    )
}