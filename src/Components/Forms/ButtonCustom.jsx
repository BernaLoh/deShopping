import React from 'react'
import './UxComponents.css'
import Spinner from 'react-bootstrap/Spinner'

function ButtonCustom(props) {
  const { label, name, type, reqStyle, loading, onClick } = props

  return (
    <>
      <button className={reqStyle} name={name} type={type || "submit"} disabled={loading || false} onClick={onClick}>
        {!loading &&
          <span className="text">{label}</span>
        }
        {loading &&
          <>
            <Spinner animation="grow" variant="light" size="sm"/>
            <span className="text">  {label}...</span>
          </>
        }
      </button>
    </>
  )
}
export default ButtonCustom