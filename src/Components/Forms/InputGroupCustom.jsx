import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

function InputGroupCustom(props) {
  const { label, placeholder, name, register, regError } = props

  const style = {
    error: {
      color: 'red'
    }
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id={"formBasic" + name}>{label}</InputGroup.Text>
        <FormControl
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon1" 
          {...register}
        />
      </InputGroup>
      <span style={style.error}>{regError}</span>
    </div>
  )
}
export default InputGroupCustom