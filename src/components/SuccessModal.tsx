import React, { FC, memo } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface SuccessModalProps {
  show: boolean
  handleClose: () => void
}

const SuccessModal: FC<SuccessModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>E-commerce Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>Purchase was successful.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(SuccessModal)
