import React, { useState, useEffect } from 'react'
import img404 from '../Public/404.png'
import img403 from '../Public/403.png'

function FaultPage(props) {
  const { display } = props
  const [displayImg, setDisplayImg] = useState()
  const img = {
    maxWidth: '100%',
    maxHeight: '100%'
  }

  useEffect(
    () => {
      switch (display) {
        case "404":
          setDisplayImg(img404)
          break
        case "403":
          setDisplayImg(img403)
          break
        default:
          setDisplayImg(img404)
      }
    },
    [display]
  )
  return (
    <div className="App-header">
      <center>
        <img style={img} src={displayImg} alt="displayPicture"></img>
      </center>
    </div>
  )
}
export default FaultPage