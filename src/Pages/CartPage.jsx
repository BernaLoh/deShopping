import React, { useState, useEffect, useContext} from 'react'
import CartProduct from '../Components/Cart/CartProduct'
import { Container, Row, Col } from 'react-bootstrap'
import AuthContext from '../Context/AuthContext'
import { priceFormat } from '../Components/Products/ProductFunctions'

function CartPage() {
  const context = useContext(AuthContext)
  const [total, setTotal] = useState(0)

  const style = {
    Total: {
      width: '80%',
      borderTop: '2px solid white',
      padding: '20px 0px'
    },
    Calc: {
      padding: '20px 0px',
      fontSize: '20px',
      fontWeight: 'bolder',
      color: '#A84253'
    },
    Price: {
      margin: '20px 0px',
      fontSize: '20px',
      fontWeight: 'bolder',
      color: '#A84253'
    }
  }

  useEffect(
    () => {
      let sum = 0;
      context.cart.forEach(prod => { sum += prod.quantity * prod.price })
      setTotal(sum)
    },
    [context.cart]
  )

  return (
    <div className="App">
      <div className="App-header">
        {context.cart.map(productData => <CartProduct id={productData.productId} quantity={productData.quantity} currency={productData.currency} price={productData.price} key={productData.productId}/>)}
        <div style={style.Total}>
          <Container fluid>
            <Row>
              <Col xs={7}/>
              <Col xs={2}>
                <div style={style.Calc}>Total:</div>
              </Col>
              <Col xs={3}>
                <div style={style.Price}>{priceFormat('ARS', total)}</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}
export default CartPage