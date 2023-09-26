import React, { ReactNode } from 'react'
import { Alert } from 'react-bootstrap'

type MessageProps = {
  variant?: string
  children: ReactNode
}

const Message: React.FC<MessageProps> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message
