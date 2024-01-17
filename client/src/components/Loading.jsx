import React from 'react'
import styled from 'styled-components'

function Loading() {
  return (
    <LoadingComponent>
        Loading...
    </LoadingComponent>
  )
}

export default Loading

const LoadingComponent = styled.h2`
    color: var(--IMP);
`