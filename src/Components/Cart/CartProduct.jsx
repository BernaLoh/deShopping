import React, { useState, useEffect, useContext } from "react"
import Loading from '../Loading/Loading'
import './CartProduct.css'
import { getProductById } from '../../Services/productosServices'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AuthContext from '../../Context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { priceFormat } from '../Products/ProductFunctions'

function CartProduct(props) {
  const { id, quantity, currency, price } = props
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState()
  const [quantityBox, setQuantityBox] = useState(quantity)
  const [quantityError, setQuantityError] = useState('')
  const [wideView, setWideView] = useState(true)

  useEffect(
    () => {
      const request = async () => {
        try {
          const response = await getProductById(id)
          setProduct(response.data)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      request()
    },
    [id]
  )

  useEffect(
    () => {
      if (window.innerWidth > 550) {
        setWideView(true)
      } else {
        setWideView(false)
      }
    },
    []
  )

  const deleteProduct = () => {
    context.deleteProductFromCart(id)
    if (context.cart.length > 0) {
      navigate('/cart')
    } else {
      navigate('/')
    }
  }

  const updateProductQuantity = (newQuantity) => {
    setQuantityError('')

    if (!newQuantity) {
      setQuantityError('Ingrese cantidad')
      return
    }
    const z1 = /^[0-9]+$/
    if (!z1.test(newQuantity)) {
      setQuantityError('Ingrese cantidad valida')
      return
    }
    if (newQuantity <= 0) {
      setQuantityError('Cantidad minima 1')
      return
    }
    if (newQuantity > product.available_quantity) {
      setQuantityError('Stock disponible ' + product.available_quantity)
      return
    }
    context.updateProductQuantityFromCart(id, newQuantity)
    navigate('/cart')

  }

  const updateBtn = (action) => {
    setQuantityError('')
    if (action === 'Increment') {
      if (parseInt(quantityBox) + 1 <= product.available_quantity) {
        setQuantityBox(parseInt(quantityBox) + 1)
        context.updateProductQuantityFromCart(id, (parseInt(quantityBox) + 1))
        navigate('/cart')
      } else {
        setQuantityError('Stock disponible ' + product.available_quantity)
      }
    } else if (action === 'Decrement') {
      if (parseInt(quantityBox) - 1 > 0) {
        setQuantityBox(parseInt(quantityBox) - 1)
        context.updateProductQuantityFromCart(id, (parseInt(quantityBox) - 1))
        navigate('/cart')
      } else {
        setQuantityError('Cantidad minima 1')
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <div className="shopCartProd-Macro">
          <div className='shopCartProd-Line'>
            <Container fluid>
              {wideView &&
                <>
                  <Row>
                    <Col xs={2}>
                      <img className="shopCartProd-Image" src={product.thumbnail} alt={product.thumbnail_id}></img>
                    </Col>
                    <Col xs={5}>
                      <Link to={'/product/' + id} className='prodLink'>
                        <div className='shopCartProd-Title'>{product.title}</div>
                      </Link>
                    </Col>
                    <Col xs={3}>
                      <div className='shopCartProd-QuantityDiv'>
                        <input className='shopCartProd-btnDec' type="submit" value="-" id="decBtn" onClick={e => { updateBtn('Decrement') }} />
                        <input className='shopCartProd-QuantityInp' type="tel" value={quantityBox} onChange={e => { setQuantityBox(e.target.value); updateProductQuantity(e.target.value) }} id="quantity" name="quantity"></input>
                        <input className='shopCartProd-btnInc' type="submit" value="+" id="incBtn" onClick={e => { updateBtn('Increment') }} />
                      </div>
                      <span className="shopCartProd-error">{quantityError}</span>
                    </Col>
                    <Col xs={2}>
                      <div className='shopCartProd-Price'>{priceFormat(currency, quantity * price)}</div>
                    </Col>
                  </Row>
                </>
              }
              {!wideView &&
                <>
                  <Row>
                    <Col xs={3}>
                      <img className="shopCartProd-Image" src={product.thumbnail} alt={product.thumbnail_id}></img>
                    </Col>
                    <Col xs={9}>
                      <Link to={'/product/' + id} className='prodLink'>
                        <div className='shopCartProd-Title'>{product.title}</div>
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={7}>
                      <div className='shopCartProd-QuantityDiv'>
                        <input className='shopCartProd-btnDec' type="submit" value="-" id="decBtn" onClick={e => { updateBtn('Decrement') }} />
                        <input className='shopCartProd-QuantityInp' type="tel" value={quantityBox} onChange={e => { setQuantityBox(e.target.value); updateProductQuantity(e.target.value) }} id="quantity" name="quantity"></input>
                        <input className='shopCartProd-btnInc' type="submit" value="+" id="incBtn" onClick={e => { updateBtn('Increment') }} />
                      </div>
                      <span className="shopCartProd-error">{quantityError}</span>
                    </Col>
                    <Col xs={5}>
                      <div className='shopCartProd-Price'>{priceFormat(currency, quantity * price)}</div>
                    </Col>
                  </Row>
                </>
              }
              <Row>
                <Col xs={2} />
                <Col xs={6}>
                  <Button id="deleteLink" variant="link" onClick={deleteProduct}>Eliminar</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      }
    </>
  )
}
export default CartProduct