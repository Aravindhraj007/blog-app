import React from 'react'
import styled from 'styled-components'

function Title({title}) {
  return (
    <TitleCard>{title}</TitleCard>
  )
}

export default Title

const TitleCard = styled.h1`
    color: var(--TITLE);
    font-family: 'Qwitcher Grypen', cursive;
    font-size: 4rem;
`