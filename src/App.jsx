import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductContainer from './Components/ProductContainer'
import Product from './Product'
import DropDownContextProvider from './context/dropDownContext'
import SecondProductPage from './Pages/Shop/SecondProductPage'
import { PRODUCTS } from './Pages/Shop/Product'
import Cart from './Pages/Cart/Cart'





function App() {


  return (
    <>
    <DropDownContextProvider>
        <Router>
          <Navbar />
            <Routes>
              <Route path="/*" element={ <ProductContainer/> }/>  
              <Route path="/product/:id" element={ < SecondProductPage />}></Route>
              <Route path="/cart" element={ <Cart />} ></Route>
            </Routes>
          
         {/**  <Search /> */}
         {/**  <ProductContainer /> */}
        </Router>
    </DropDownContextProvider>
    </>
  )
}

export default App
