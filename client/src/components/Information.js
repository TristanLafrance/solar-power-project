import { useState } from "react";


const Information = () => {
    const [ formData, setFormData ] = useState({});

    const handleSubmit = (e, formData) => {
        e.preventDefault();

        const newFormData = {
            firstName: formData.firstName ,
            lastName: formData.lastName ,
            email: formData.email ,
            phoneNumber: formData.phoneNumber
        }

        fetch("/api/post-info", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        })
            .then(res => res.json())
            .then(data => {
                if(data.message === "success"){
                    // redirect to the result of the calculation
                } else {
                    // redirect to the form info
                }
            })
    }
    return (
        <div>
            Information form ...
        </div>
    )
};


export default Information;