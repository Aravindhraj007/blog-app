import React from 'react'
import styled from 'styled-components'

function ImgUpload({setFile}) {
  return (
    <ImageUploadcomponent
        type='file'
        name = 'file'
        onChange={e => setFile(e.target.files[0])}
    />
  )
}

export default ImgUpload

const ImageUploadcomponent = styled.input`
  width: 90%;
`