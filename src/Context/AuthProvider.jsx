import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router-dom'

function AuthProvider(props) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false)
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || {})
  const cart = JSON.parse(localStorage.getItem('cart')) || []

  const loginUser = (user) => {
    setIsLogin(true)
    localStorage.setItem('isLogin', true)
    localStorage.setItem('userInfo', JSON.stringify(user))
    setUserInfo(user)
  }

  const logoutUser = () => {
    setIsLogin(false)
    localStorage.removeItem('isLogin')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cart')
    setUserInfo({})
    navigate('/')
  }

  const addProductToCart = (product) => {
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const deleteProductFromCart = (productId) => {
    let index = cart.findIndex(function(prod){
      return prod.productId === productId
    })
    
    if (index !== -1) {
      cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  const updateProductQuantityFromCart = (productId, newQuantity) => {
    let index = cart.findIndex(function(prod){
      return prod.productId === productId
    })
    
    if (index !== -1) {
      cart[index].quantity = newQuantity
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        loginUser,
        logoutUser,
        userInfo,
        cart,
        addProductToCart,
        deleteProductFromCart,
        updateProductQuantityFromCart
      }}
    >
      {props.children}

    </AuthContext.Provider>
  )
}
export default AuthProvider