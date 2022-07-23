import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

function Loading() {
  return (
    <center>
      <Spinner animation="grow" variant="dark" />
    </center>
  )
}
export default Loading