import React from 'react'
import styled from 'styled-components'

function InputField({type, placeholder, name, handleChange, label}) {
  return (
    <InputComponent>
        <label htmlFor={name}>{label}</label> <br />
        <div className="center-inp">
            <input 
                autoComplete='New'
                id={name}
                type={type} 
                name={name} 
                placeholder={placeholder} 
                onChange={(e)=>handleChange(e)}
                required
            />
        </div>
    </InputComponent>
  )
}

export default InputField

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