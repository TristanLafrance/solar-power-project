import styled from "styled-components"

const InputCalc = ({type, placeholder, name, required, handleChange}) => {
    return (
        <StyledInput 
            type={type}
            step=".01" 
            placeholder={placeholder} 
            required={required} 
            onChange={(e) => handleChange(name, e.target.value)}
        />
    )
}

// Styled Component // 

const StyledInput = styled.input`
    padding: 10px;
    width: 400px;

    &:focus::-webkit-input-placeholder{
    transition: text-indent 2s 0.5s ease; 
    text-indent: -100%;
    opacity: 1;
    }
` 

export default InputCalc;