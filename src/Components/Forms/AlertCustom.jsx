import React from 'react'
import  Alert from 'react-bootstrap/Alert'

function AlertCustom(props) {
  const { variant, alert } = props

  return (
    <>
      {alert &&
        <Alert key='alert' variant={variant || 'danger'}>{alert}</Alert>
      }
    </>
  )
}
export default AlertCustom