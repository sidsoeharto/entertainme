import React from 'react'
import { Loader, Container } from 'rsuite'

function CustomLoader () {
  return (
    <Container style={{margin: '15rem'}}>
      <Loader center size="md" content="Loading.." />
    </Container>
  )
}

export default CustomLoader