import React, { useEffect, useState } from 'react'
import ProductsList from '../Components/Products/ProductsList'
import { useParams } from 'react-router-dom'

function HomePage() {
  const { search } = useParams()
  const [manualSearch, setManualSearch] = useState('')
  const [manualNewSearch, setManualNewSearch] = useState(true)

  useEffect(
    () => {
      if (search) {
        if (manualSearch !== '') {
          setManualNewSearch(false)
          setTimeout(function () {
            setManualSearch(search)
            setManualNewSearch(true)
          }, 200)
        } else {
          setManualSearch(search)
          setManualNewSearch(true)
        }
      }
    },
    // eslint-disable-next-line
    [search]
  )

  return (
    <div className="App">
      <div className="App-header">
        {manualSearch &&
          <>
            {manualNewSearch &&
              <ProductsList title="" numOfProds="All" endPoint={"sites/MLA/search?q=" + manualSearch} />
            }
          </>
        }
        {!manualSearch &&
          <>
            <ProductsList title="Ofertas destacadas!" numOfProds="4" endPoint="sites/MLA/search?q=ofertas" />
            <ProductsList title="Smartphones destacados!" numOfProds="4" endPoint="sites/MLA/search?q=smartphone" />
            {/* <ProductsList title="Laptops destacadas!" numOfProds="4" endPoint="sites/MLA/search?q=laptop"/>
            <ProductsList title="iPods destacados!" numOfProds="4" endPoint="sites/MLA/search?q=ipod"/> */}
          </>
        }
      </div>
    </div>
  )
}
export default HomePage