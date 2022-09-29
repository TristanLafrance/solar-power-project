import styled from "styled-components";

const InputContact = ({name, type, placeholder, required}) => {
    return (
        <StyledInputInformation
            name={name}
            type={type} 
            placeholder={placeholder} 
            required={required} 
        />
    )
};


export default InputContact;    

// Styled components // 

const StyledInputInformation = styled.input`
    padding: 10px;
    width: 200px;

    &:focus::-webkit-input-placeholder{
    transition: text-indent 2s 0.5s ease; 
    text-indent: -100%;
    opacity: 1;
}
` 
