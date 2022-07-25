import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, InputGroup, FormControl, Col } from 'react-bootstrap'
import deShopping from '../../Public/deShopping.png'
import AuthContext from '../../Context/AuthContext'
import shoppingCart from '../../Public/shoppingCart.png'

function Menu(props) {
  const navigate = useNavigate()
  const [wideView, setWideView] = useState(true)

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

  const style = {
    title: {
      fontFamily: '"Segoe IU", sans-serif',
      fontSize: '25px',
      fontWeight: 'bolder',
      color: 'white',
      float: 'left',
      verticalAlign: 'middle',
      paddingLeft: '10px'
    },
    searchContainer: {
      minWidth: '60%',
      float: 'center'
    },
    searchBox: {
      marginTop: '20px',
      minWidth: '200px',
      maxWidth: '400px',
      float: 'center'
    },
    nav: {
      color: 'white',
      paddingRight: '10px'
    },
    cart: {
      float: 'right',
      marginLeft: '10px',
      padding: '7px'
    },
    divCart: {
      float: 'right',
      marginRight: '10px'
    },
    dropdown: {
      color: 'white',
      float: 'left'
    }
  }

  const handleChange = event => {
    if (event.charCode === 13) {
      navigate('/search/' + event.target.value)
      event.target.value = ''
    }
  }

  return (
    <AuthContext.Consumer>
      {
        context =>
          <>
            <Navbar expand="lg" >
              {!wideView &&
                <Container fluid>
                  <Col>
                    <Navbar.Brand style={style.title} as={Link} to='/' reloadDocument><img src={deShopping} width="30" height="30" alt='deShopping'></img> De Shopping</Navbar.Brand>
                  </Col>
                  <Col>
                    {context.cart.length ?
                      <div style={style.divCart}>
                        <Nav.Link style={style.cart} as={Link} to='/cart' reloadDocument><img src={shoppingCart} width="25" height="25" alt='shoppingCart'></img></Nav.Link>
                      </div>
                      : null}
                  </Col>
                </Container>
              }
              <Container fluid>
                {wideView &&
                  <Col>
                    <Navbar.Brand style={style.title} as={Link} to='/' reloadDocument><img src={deShopping} width="30" height="30" alt='deShopping'></img> De Shopping</Navbar.Brand>
                  </Col>
                }
                <Col xs={5}>
                  <center>
                    <div style={style.searchBox}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id='menuSearch'> 🔎 </InputGroup.Text>
                        <FormControl
                          placeholder='Buscar'
                          aria-label='Buscar'
                          aria-describedby="basic-addon1"
                          onKeyPress={handleChange}
                        />
                      </InputGroup>
                    </div>
                  </center>
                </Col>
                <Col>
                  <div style={style.divCart}>
                    {wideView &&
                      <>
                        {context.cart.length ?
                          <Nav.Link style={style.cart} as={Link} to='/cart' reloadDocument><img src={shoppingCart} width="25" height="25" alt='shoppingCart'></img></Nav.Link>
                          : null}
                      </>
                    }
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                      <Nav className="me-auto.justify-content-center">
                        {!context.isLogin &&
                          <Nav.Link style={style.nav} as={Link} to='/signIn' reloadDocument>Ingresar</Nav.Link>
                        }
                        {context.isLogin &&
                          <NavDropdown className='divdiv' title={<p style={style.dropdown}>{context?.userInfo?.firstName}</p>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={context.logoutUser}>Salir</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                          </NavDropdown>
                        }
                      </Nav>
                    </Navbar.Collapse>
                  </div>

                </Col>
              </Container>
            </Navbar>
          </>
      }
    </AuthContext.Consumer>
  )
}
export default Menu