import React, { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

function AddListing() {
    const [formData, setFormData] = useState({
        street_address: "",
        apt_number: "",
        city: "",
        state: "",
        zip_code: "",
        price: "",
        description: "",
    })
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file) {
            alert("Please upload the image first.")
            return
        }

        const token = localStorage.getItem("jwtToken")
        if (!token) {
            alert("No authentication token found.")
            return
        }
        const decoded = jwtDecode(token)
        const { user_id } = decoded

        try {
            const userResponse = await axios.get(
                `http://localhost:3001/api/Apartment_Leaser/${user_id}`
            )

            const { first_name, last_name } = userResponse.data[0]

            const updatedFormData = {
                ...formData,
                leaser_name: `${first_name} ${last_name}`,
                leaser_no: user_id,
            }

            const data = new FormData()
            for (const key in updatedFormData) {
                data.append(key, updatedFormData[key])
            }
            data.append("image", file)
            for (let [key, value] of data.entries()) {
                console.log(key, value)
            }

            const response = await axios.post(
                "http://localhost:3001/api/Apartment_Listing",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            alert("Listing submitted successfully!")
            console.log(response.data)
        } catch (error) {
            console.error("Error submitting the listing:", error)
            alert("Failed to submit the listing.")
        }
    }

    return (
        <div className='container mt-5'>
            <h2>Add Apartment Listing</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Street Address</label>
                    <input
                        type='text'
                        className='form-control'
                        name='street_address'
                        value={formData.street_address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Apartment Number</label>
                    <input
                        type='text'
                        className='form-control'
                        name='apt_number'
                        value={formData.apt_number}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>City</label>
                    <input
                        type='text'
                        className='form-control'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>State</label>
                    <input
                        type='text'
                        className='form-control'
                        name='state'
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Zip Code</label>
                    <input
                        type='number'
                        className='form-control'
                        name='zip_code'
                        value={formData.zip_code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input
                        type='number'
                        step='0.01'
                        className='form-control'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea
                        className='form-control'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Upload Image</label>
                    <input
                        type='file'
                        className='form-control'
                        onChange={handleFileChange}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit Listing
                </button>
            </form>
        </div>
    )
}

export default AddListing
