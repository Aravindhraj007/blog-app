import React from 'react'
import styled from 'styled-components'

function Email() {
  return (
    <InputComponent>
        <label >Email</label> <br />
        <div className="center-inp">
            <input 
                type='email'
                name='email'
                placeholder='Enter email here'
                onChange={(e)=>handleChange(e)}
                required
            />
        </div>
    </InputComponent>
  )
}

export default Email

const InputComponent = styled.div`
    margin-bottom: 20px;
    label{
        text-transform: uppercase;
        letter-spacing: 1.7px;
        font-weight: 900;
        color: var(--COLOR-D);
    }
    .center-inp{
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        input{
            padding: 5px 10px;
            width: 80%;
            color: var(--IMP);
            border: 2px solid var(--IMP);
            outline: none;

            &:hover,
            &:focus,
            &:active{
                outline: none;
            }

        }
    }
`