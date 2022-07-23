import React from 'react'
import { Modal } from 'react-bootstrap'
import ButtonCustom from './ButtonCustom'

function AlertCustom(props) {
  const { show, onHide, title, children, button1, button2 } = props

  const style = {
    title: {
      fontFamily: '"Segoe IU", sans-serif',
      color: '#4f4f79',
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '0.3px',
      textAlign: 'left'
    }
  }

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title style={style.title}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <ButtonCustom onClick={button1.func} label={button1.label} name="okBtn1" type="submit" reqStyle="uxButtonWide" />
        {button2 &&
          <ButtonCustom onClick={button2.func} label={button2.label} name="okBtn2" type="submit" reqStyle="uxButtonWide" />
        }
      </Modal.Footer>
    </Modal>
  )
}
export default AlertCustom