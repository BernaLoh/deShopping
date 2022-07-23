import React from 'react'
import Form from 'react-bootstrap/Form'

function FormGroupCustom(props) {
  const { label, name, type, register, regError } = props

  const style = {
    error: {
      color: 'red'
    }
  }

  return (
    <Form.Group className="mb-3" controlId={"formBasic" + name}>
      <Form.Control type={type || "text"} placeholder={label} {...register} />
      <span style={style.error}>{regError}</span>
    </Form.Group>
  )
}
export default FormGroupCustom