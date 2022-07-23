import HomePage from '../Pages/HomePage'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'
import { Routes, Route } from 'react-router-dom'
import ProductDetailsPage from '../Pages/ProductDetailsPage'
import FaultPage from '../Pages/FaultPage'
import AuthContext from '../Context/AuthContext'
import CartPage from '../Pages/CartPage'

function PublicRoutes() {
  return (
    <AuthContext>
      {
        context =>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search/:search' element={<HomePage />} />
          {!context.isLogin &&
            <>
              <Route path='/signIn' element={<SignInPage />} />
              <Route path='/signUp' element={<SignUpPage />} />
              <Route path='/cart' element={<FaultPage display='403'/>} />
            </>
          }
          {context.isLogin &&
            <>
              <Route path='/signIn' element={<FaultPage display='403'/>} />
              <Route path='/signUp' element={<FaultPage display='403'/>} />
              {context.cart.length ?
                <Route path='/cart' element={<CartPage />} />
              : null}
              {!context.cart.length ?
                <Route path='/cart' element={<FaultPage display='403'/>} />
              : null}
            </>
          }
          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='*' element={<FaultPage display='404'/>} />
        </Routes>
      }
    </AuthContext>
    
  )
}
export default PublicRoutes