import React, { useState, useEffect } from 'react'
import './Product.css'
import { Link } from 'react-router-dom'
import { priceFormat } from './ProductFunctions'

function Product(props) {
  const { data } = props
  const [title, setTitle] = useState({t1:'', t2:''})

  useEffect(
    () => {
      if (data.title.length < 22) {
        setTitle({t1:data.title, t2:'...'})
      } else {
        const str1 = data.title.substring(0, 22).lastIndexOf(" ")
        
        if (data.title.length < (parseInt(str1) + 21)) {
          setTitle({
                    t1:data.title.substring(0, str1), 
                    t2:data.title.substring(str1 + 1, str1 + 22)
                  })
        } else {
          setTitle({
                    t1:data.title.substring(0, str1), 
                    t2:data.title.substring(str1 + 1, str1 + 19) + '...'
                  })
        }

      }
    },
    [data.title]
  )

  return (
    <div className='prodProduct'>
      <Link to={'/product/' + data.id} className='prodLink'>
        <center>
          <img className="prodImage" src={data.thumbnail} alt="displayPicture"></img>
        </center>
        <div className="prodDivName">
          <p className="prodName">{title.t1}</p>
          <p className="prodName">{title.t2}</p>
        </div>
        <p className="prodPrice">{priceFormat(data.currency_id, data.price)}</p>
      </Link>
    </div>
  )
}
export default Product