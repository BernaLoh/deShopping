import React, { useState, useEffect, useReducer } from "react"
import './ProductsList.css'
import rightArrow from "../../Public/arrow_right.png"
import leftArrow from "../../Public/arrow_left.png"
import Product from "./Product"
import { getAllProducts } from '../../Services/productosServices'
import Loading from '../../Components/Loading/Loading'

function updProdList(state, action) {
  switch (action.type) {
    case "decrement":
      if (state.first > 0) {
        return { first: state.first - parseInt(action.move), last: state.last - parseInt(action.move) }
      }
      break
    case "increment":
      if (action.maxSize > state.last) {
        return { first: state.first + parseInt(action.move), last: state.last + parseInt(action.move) }
      }
      break
    case "setLast":
      return { first: 0, last: parseInt(action.move) }
    default:
      return { first: state.first, last: state.last }
  }
}

function ProductsList(props) {
  const { title, numOfProds, endPoint } = props
  const [loading, setLoading] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [state, dispatch] = useReducer( updProdList, { first: 0, last: parseInt(numOfProds) })
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [emptyList, setEmptyList] = useState(false)
  const [length, setLength] = useState(0)
  const [moveArrow, setMoveArrow] = useState(parseInt(numOfProds))

  useEffect(
    () => {
      const request = async () => {
        try {
          const response = await getAllProducts(endPoint)
          setAllProducts(response.data.results)
          const maxLength = response.data.results.length
          setLength(maxLength)

          if (maxLength > 0) {
            const displayProd = await productsToBeDisplayed()
            setEmptyList(false)
            if (numOfProds === 'All') {
              setMoveArrow(maxLength)
              dispatch({ type: "setLast", move: maxLength, maxSize: maxLength })
              setShowRight(false)
            } else if (maxLength < numOfProds) {
              if (displayProd < maxLength) {
                setMoveArrow(displayProd)
                dispatch({ type: "setLast", move: displayProd, maxSize: maxLength })
              } else {
                setMoveArrow(maxLength)
                dispatch({ type: "setLast", move: maxLength, maxSize: maxLength })
              }
            } else {
              setMoveArrow(displayProd)
              dispatch({ type: "setLast", move: displayProd, maxSize: maxLength })
            }
          } else {
            setEmptyList(true)
          }

          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      request()
    },
    // eslint-disable-next-line
    []
  )

  useEffect(
    () => {
      setProducts(allProducts.slice(state.first, state.last))

      if (state.first === 0) {
        setShowLeft(false)
      } else {
        setShowLeft(true)
      }

      if (((state.first + parseInt(moveArrow)) > (length - 1)) || (numOfProds === 'All')) {
        setShowRight(false)
      } else {
        setShowRight(true)
      }
    },
    [state.first, state.last, allProducts, numOfProds, length, moveArrow]
  )

  const productsToBeDisplayed = async () => {
    const currentWidth = window.innerWidth
    if (currentWidth < 584) {
      return 1
    } else if (currentWidth < 812) {
      return 2
    } else if (currentWidth < 1042) {
      return 3
    } else {
      return 4
    }
  }

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <div className="pListProductsTop">
          <div className="pListDivArrowButton">
            {showLeft &&
              <button className="pListButtonLeft" onClick={() => dispatch({ type: "decrement", move: moveArrow, maxSize: length })}><img className="pListArrowImg" src={leftArrow} alt="leftArrow"></img></button>
            }
          </div>
          <div className='pListProducts'>
            <p className="pListProdTitle">{title}</p>
            {products.map(productData => <Product data={productData} key={productData.id} />)}
            {emptyList &&
              <div className="emptyList">
                <p >Lo sentimos, no encontramos contenido para su busqueda.</p>
                <p >Por favor, realice una nueva busqueda.</p>
              </div>
            }
          </div>
          <div className="pListDivArrowButton">
            {showRight &&
              <button className="pListButtonRight" onClick={() => dispatch({ type: "increment", move: moveArrow, maxSize: length })}><img className="pListArrowImg" src={rightArrow} alt="rightArrow"></img></button>
            }
          </div>
        </div>
      }
    </>
  )
}
export default ProductsList