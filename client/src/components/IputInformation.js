import styled from "styled-components"


const InputInformation = ({type, placeholder, name, required}) => {
        
        return (
            <StyledInputInformation
                name={name}
                type={type} 
                placeholder={placeholder} 
                required={required} 
            />
        )
    };
    

    export default InputInformation;    

const StyledInputInformation = styled.input`
    padding: 10px;
    width: 400px;

    &:focus::-webkit-input-placeholder{
    transition: text-indent 2s 0.5s ease; 
    text-indent: -100%;
    opacity: 1;
    }
    ` 