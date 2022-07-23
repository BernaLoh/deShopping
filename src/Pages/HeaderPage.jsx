import React from 'react'
import Menu from '../Components/Menu/Menu'
import header from '../Public/header.png'

function HeaderPage() {
  const style = {
    macro: {
      backgroundImage: `url(${header})`,
      backgroundSize: 'cover',
      padding: '0px 0px',
      textAlign: 'right'
    }
  }

  return (
    <div style={style.macro}>
        <Menu />
    </div>
  )
}
export default HeaderPage