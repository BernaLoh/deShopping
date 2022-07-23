import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Table, Accordion } from 'react-bootstrap'
import './ProductDetailsPage.css'
import ButtonCustom from '../Components/Forms/ButtonCustom'
import FormGroupCustom from '../Components/Forms/FormGroupCustom'
import ProductsList from '../Components/Products/ProductsList'
import { getProductById, getProductDescriptionById, getProductQuestionsById } from '../Services/productosServices'
import { priceFormat } from '../Components/Products/ProductFunctions'
import Loading from '../Components/Loading/Loading'
import ModalCustom from '../Components/Forms/ModalCustom'
import AuthContext from '../Context/AuthContext'

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([])
  const [description, setDecrption] = useState()
  const [picture, setPicture] = useState()
  const [quantity, setQuantity] = useState(0)
  const [selectOptions, setSelectOptions] = useState(<></>)
  const [showQuantityInput, setShowQuantityInput] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showBuyModalSignIn, setShowBuyModalSignIn] = useState(false)
  const [questions, setQuestions] = useState([])
  const [sellerPoducts, setSellerPoducts] = useState({display: false, endpoint: ''})
  const [relatedProducts, setRelatedProducts] = useState({display: false, endpoint: ''})
  const [errorSelect, setErrorSelect] = useState('')

  useEffect(
    () => {
      const request = async () => {
        try {
          const response = await getProductById(id)
          setProduct(response.data)
          setPicture(response.data.pictures[0].secure_url)
          setQuantity(response.data.available_quantity)
          setSellerPoducts( {display: false, endpoint: ''} )
          setRelatedProducts( {display: false, endpoint: ''} )
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
      const requestDescription = async () => {
        try {
          setDecrption((await getProductDescriptionById(id)).data.plain_text)
          window.scrollTo(0, 0)
        } catch (error) {
          console.log(error)
        }
      }
      requestDescription()
    },
    [id]
  )

  useEffect(
    () => {
      const requestQuestions = async () => {
        try {
          const rspQeustions = await getProductQuestionsById(id)
          setQuestions(rspQeustions.data)
          window.scrollTo(0, 0)
        } catch (error) {
          console.log(error)
        }
      }
      requestQuestions()
    },
    [id]
  )

  useEffect(
    () => {
      switch (quantity) {
        case 0:
          setSelectOptions(<></>)
          break
        case 1:
          setSelectOptions(<><option value="1">1</option></>)
          break
        case 2:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option></>)
          break
        case 3:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option><option value="3">3</option></>)
          break
        case 4:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></>)
          break
        case 5:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></>)
          break
        case 6:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></>)
          break
        default:
          setSelectOptions(<><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="Mas">Mas de 6</option></>)
          break
      }
    },
    [quantity]
  )

  useEffect(
    () => {
      if (product.site_id && product.seller_id) {
        setSellerPoducts( {display: true, endpoint: 'sites/' + product.site_id + '/search?seller_id=' + product.seller_id})
      }
      if (product.site_id && product.category_id) {
        setRelatedProducts( {display: true, endpoint: 'sites/' + product.site_id + '/search?category=' + product.category_id})
      }
    },
    [product.site_id, product.seller_id, product.category_id]
  )

  const onChangeSelect = (evento) => {
    setErrorSelect('')
    if (evento === 'Mas') {
      setShowQuantityInput(true)
    } else {
      setShowQuantityInput(false)
    }
  }

  const onSubmit = data => {
    setErrorSelect('')

    // Check if user is LogedIn
    if (!context.isLogin) {
      setShowBuyModalSignIn(true)
      return
    }

    // Check if the product is into the cart
    let index = context.cart.findIndex(function(prod){
      return prod.productId === product.id
    })
    if (index !== -1) {
      setErrorSelect('El producto se encuentra en su lista. Actualice el mismo desde el carrito.')
    } else {
      if (data.qSelect !== 'Quantity') {
        let auxQuantity = 0
        if (data.qSelect === 'Mas') {
          auxQuantity = data.extraQuantity
        } else {
          auxQuantity = data.qSelect
        }
        if (auxQuantity > 0){
          context.addProductToCart({
                                    productId: product.id,
                                    quantity: auxQuantity,
                                    currency: product.currency_id,
                                    price: product.price
                                  })
          setShowBuyModal(true)
        } else {
          setErrorSelect('Verifique la cantidad')
        }
      } else {
        setErrorSelect('Seleccione cantidad a camprar')
      }
    }
  }

  const handleBuyModak = () => {
    setShowBuyModal(false)
    navigate('/')
  }

  const goCart = () => {
    setShowBuyModal(false)
    navigate('/cart')
  }

  return (
    <>
      <div className='App'>
        <div className="App-header">
          {loading && <Loading />}
          {!loading &&
            <>
              <div className='pd-container-1'>
                <div className='pd-container-2'>
                  <div className='pd-container-pictures'>
                    <center>
                      {product.pictures.map(pictureData => <img className='pd-images' key={pictureData.id} src={pictureData.secure_url} alt="displayPicture" onClick={(e) => { setPicture(pictureData.secure_url) }}></img>)}
                    </center>
                  </div>
                  <div className='pd-container-mainPicture'>
                    <center>
                      <img className='pd-img' src={picture} alt="displayMainPicture"></img>
                    </center>
                  </div>
                  <div className='pd-container-info'>
                    <p className='pd-info-name'>{product.title}</p>
                    <p className='pd-info-price'>{priceFormat(product.currency_id, product.price)}</p>
                    <p className='pd-info-text'>Stock disponible: {product.available_quantity}</p>
                    <p className='pd-info-text'>Vendidos: {product.sold_quantity}</p>
                    <p className='pd-info-text'>ID: {product.id}</p>
                    <div className='pd-info-divButton'>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='pd-info-divQuantity'>
                          <Form.Select name="qSelect" aria-label="Default select example" defaultValue={'Quantity'}
                            {...register("qSelect", {
                              required: "Seleccione cantidad",
                              onChange: (e) => { onChangeSelect(e.target.value) }
                            })} >
                            <option disabled value='Quantity'>Cantidad</option>
                            {selectOptions}
                          </Form.Select>
                          <span className='pd-error'>{errors.qSelect?.message}</span>
                          <span className='pd-error'>{errorSelect}</span>
                        </div>
                        <div className='pd-info-divQuantity'>
                          {showQuantityInput &&
                            <FormGroupCustom label="Ingrese cantidad" name="extraQuantity" type="number"
                              register={{
                                ...register("extraQuantity", {
                                  required: "El campo es obligatorio",
                                  min: { value: 1, message: `La cantidad mínima es 1` },
                                  max: { value: product.available_quantity, message: `La cantidad máxima es ${product.available_quantity}` },
                                  pattern: { value: /^[0-9]+$/, message: "Introduzca una cantidad válida" }
                                })
                              }}
                              regError={errors.extraQuantity?.message} />
                          }
                        </div>
                        <ButtonCustom label="Comprar" name="SignUn" type="submit" value="submit" reqStyle="uxButtonWide" />
                      </Form>
                    </div>
                  </div>
                </div>
                <div className='pd-description-container'>
                  <Accordion>
                    {description &&
                      <Accordion.Item eventKey="0" >
                        <Accordion.Header>Descripción</Accordion.Header>
                        <Accordion.Body className='pd-description-text'>{description}</Accordion.Body>
                      </Accordion.Item>
                    }
                    {product.attributes &&
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Características</Accordion.Header>
                        <Accordion.Body className='pd-description-text'>
                          <Table striped bordered hover variant="dark">
                            <thead>
                              <tr>
                                <th>Característica</th>
                                <th>Descripción</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.attributes.map(attribute => {
                                return (attribute.name && attribute.value_name) && (
                                  <tr key={attribute.id}>
                                    <td>{attribute.name}</td>
                                    <td>{attribute.value_name}</td>
                                  </tr>)
                              })}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    }
                    {questions &&
                      <Accordion.Item eventKey="2" >
                        <Accordion.Header>Preguntas y respuestas</Accordion.Header>
                        <Accordion.Body className='pd-description-text'>
                          {questions?.questions?.map(questionData =>
                            <div key={questionData.id}>
                              <p className='pd-questions-question'>{questionData.text}</p>
                              <p className='pd-questions-answer'>{questionData.answer?.text}</p>
                            </div>)}
                        </Accordion.Body>
                      </Accordion.Item>
                    }
                  </Accordion>
                </div>
              </div>
              {sellerPoducts.display &&
                <ProductsList title="Otros productos del vendedor" numOfProds="4" endPoint={sellerPoducts.endpoint} />
              }
              {relatedProducts.display &&
                <ProductsList title="Productos relacionados" numOfProds="4" endPoint={relatedProducts.endpoint} />
              }
            </>
          }
        </div>
      </div>

      <ModalCustom 
                  show={showBuyModal} 
                  onHide={handleBuyModak} 
                  title='Gracias por su compra!!!' 
                  button1={{label:'Continuar comprando', func: handleBuyModak}} 
                  button2={{label:'Ir al carrito', func: goCart}}
                  >
        <p>La compra fue exitosa.</p>
      </ModalCustom>

      <ModalCustom 
                  show={showBuyModalSignIn} 
                  onHide={() => {setShowBuyModalSignIn(false)}} 
                  title='Registro requerido' 
                  button1={{label:'Iniciar sesion', func: () => {navigate('/signIn')}}} 
                  >
        <p>Para realizar una compra es necesario que se encuentre registrado.</p>
        <p>Por favor inicie sesion y vualva a comprar el producto.</p>
      </ModalCustom>
    </>
  )
}
export default ProductDetailsPage