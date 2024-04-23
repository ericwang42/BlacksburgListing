import React, { useState, useEffect } from "react"
import { Dropdown, Button, Table, Form, Row, Col } from "react-bootstrap"
import axios from "axios"

const AdminPanel = () => {
    const [selectedTable, setSelectedTable] = useState(null)
    const [tableData, setTableData] = useState([])

    const handleTableSelect = (tableName) => {
        setSelectedTable(tableName)
    }

    const handleCreateSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        axios
            .post(`http://localhost:3001/api/${selectedTable}`, data)
            .then((response) => {
                console.log("Create operation successful:", response.data)
                fetchTableData()
            })
            .catch((error) => {
                console.error("Error performing create operation:", error)
            })
    }

    const handleUpdateSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        const id = Object.values(data)[0]
        // delete ;
        axios
            .put(`http://localhost:3001/api/${selectedTable}/${id}`, data)
            .then((response) => {
                console.log("Update operation successful:", response.data)
                fetchTableData()
            })
            .catch((error) => {
                console.error("Error performing update operation:", error)
            })
    }

    const handleDeleteSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        const id = Object.values(data)[0]
        console.log(id)

        axios
            .delete(`http://localhost:3001/api/${selectedTable}/${id}`)
            .then((response) => {
                console.log("Delete operation successful:", response.data)
                fetchTableData()
            })
            .catch((error) => {
                console.error("Error performing delete operation:", error)
            })
    }

    const createFormFields = {
        Blacksburg_Resident: [
            { label: "resident_id", name: "resident_id", type: "number" },
            { label: "first_name", name: "first_name", type: "text" },
            { label: "last_name ", name: "last_name", type: "text" },
            { label: "date_of_birth ", name: "date_of_birth", type: "date" },
            { label: "school_year ", name: "school_year", type: "number" },
        ],
        Apartment_Leaser: [
            { label: "leaser_id", name: "leaser_id", type: "number" },
            { label: "first_name", name: "first_name", type: "text" },
            { label: "last_name", name: "last_name", type: "text" },
            { label: "date_of_birth", name: "date_of_birth", type: "date" },
            { label: "school_year", name: "school_year", type: "number" },
        ],
        Apartment_Listing: [
            { label: "apartment_id", name: "apartment_id", type: "number" },
            { label: "street_address", name: "street_address", type: "text" },
            { label: "apt_number", name: "apt_number", type: "text" },
            { label: "city", name: "city", type: "text" },
            { label: "state", name: "state", type: "text" },
            { label: "zip_code", name: "zip_code", type: "number" },
            { label: "leaser_name", name: "leaser_name", type: "text" },
            { label: "leaser_no", name: "leaser_no", type: "number" },
        ],
        Dorm_Listing: [
            { label: "dorm_id", name: "dorm_id", type: "number" },
            { label: "street_address", name: "street_address", type: "text" },
            { label: "room_number", name: "room_number", type: "text" },
            { label: "city", name: "city", type: "text" },
            { label: "state", name: "state", type: "text" },
            { label: "zip_code", name: "zip_code", type: "number" },
            { label: "dorm_name", name: "dorm_name", type: "text" },
        ],
        Review: [
            { label: "review_id", name: "review_id", type: "number" },
            { label: "rating", name: "rating", type: "number" },
            {
                label: "review_description",
                name: "review_description",
                type: "text",
            },
            { label: "reviewer_id", name: "reviewer_id", type: "number" },
            {
                label: "apartment_review_id",
                name: "apartment_review_id",
                type: "number",
            },
            { label: "dorm_review_id", name: "dorm_review_id", type: "number" },
        ],
    }

    const fetchTableData = () => {
        if (selectedTable) {
            axios
                .get(`http://localhost:3001/api/${selectedTable}`)
                .then((response) => {
                    setTableData(response.data)
                })
                .catch((error) => {
                    console.error("Error fetching table data:", error)
                    setTableData([]) // Reset table data on error
                })
        } else {
            setTableData([]) // Reset table data when no table is selected
        }
    }

    useEffect(() => {
        fetchTableData()
    }, [selectedTable])

    return (
        <div className='container mt-4'>
            <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                    Select Table
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => handleTableSelect("Blacksburg_Resident")}
                    >
                        Blacksburg Resident
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleTableSelect("Apartment_Leaser")}
                    >
                        Apartment Leaser
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleTableSelect("Apartment_Listing")}
                    >
                        Apartment Listing
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleTableSelect("Dorm_Listing")}
                    >
                        Dorm Listing
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleTableSelect("Review")}>
                        Review
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {selectedTable && (
                <>
                    <h1 className='mt-4'>Selected Table: {selectedTable}</h1>

                    <Form onSubmit={handleCreateSubmit} className='mt-4'>
                        <h3>CREATE</h3>
                        <Row>
                            {createFormFields[selectedTable]
                                .filter(
                                    (field) =>
                                        field.name !== "resident_id" &&
                                        field.name !== "leaser_id" &&
                                        field.name !== "apartment_id" &&
                                        field.name !== "dorm_id" &&
                                        field.name !== "review_id"
                                )
                                .map((field, index) => (
                                    <Col key={index}>
                                        <Form.Group
                                            controlId={`createFormField${index}`}
                                        >
                                            <label
                                                htmlFor={field.name}
                                                className='mr-2'
                                            >
                                                {field.name}
                                            </label>
                                            <Form.Control
                                                name={field.name}
                                                type={field.type}
                                                placeholder={`enter ${field.name}`}
                                                style={{ maxWidth: "250px" }}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                        </Row>
                        <Row className='mt-4'>
                            <Col>
                                <Button variant='success' type='submit'>
                                    SUBMIT
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <hr />
                    <Form onSubmit={handleUpdateSubmit}>
                        <h3>UPDATE</h3>
                        <Row>
                            {createFormFields[selectedTable].map(
                                (field, index) => (
                                    <Col key={index}>
                                        <Form.Group
                                            controlId={`updateFormField${index}`}
                                        >
                                            <label
                                                htmlFor={field.name}
                                                className='mr-2'
                                            >
                                                {field.name}
                                            </label>
                                            <Form.Control
                                                name={field.name}
                                                type={field.type}
                                                placeholder={`enter value`}
                                                style={{ maxWidth: "250px" }}
                                            />
                                        </Form.Group>
                                    </Col>
                                )
                            )}
                        </Row>
                        <Row className='mt-4'>
                            <Col>
                                <Button variant='success' type='submit'>
                                    SUBMIT
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <hr />

                    <Form onSubmit={handleDeleteSubmit}>
                        <h3>DELETE</h3>
                        <Row>
                            <Col>
                                <Form.Group controlId='deleteFormField1'>
                                    <Col>
                                        <Form.Label column sm='2'>
                                            id
                                        </Form.Label>
                                    </Col>
                                    <Col sm='10'>
                                        <Form.Control
                                            name={
                                                createFormFields[
                                                    selectedTable
                                                ][0].name
                                            }
                                            type={
                                                createFormFields[
                                                    selectedTable
                                                ][0].type
                                            }
                                            placeholder={"enter value"}
                                            style={{ maxWidth: "200px" }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col>
                                <Button variant='success' type='submit'>
                                    SUBMIT
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <hr />

                    <Table striped bordered hover className='mt-4'>
                        <thead>
                            <tr>
                                {createFormFields[selectedTable].map(
                                    (field, index) => (
                                        <th key={index}>{field.label}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((item, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {createFormFields[selectedTable].map(
                                            (field, colIndex) => (
                                                <td key={colIndex}>
                                                    {item[field.name]}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={
                                            createFormFields[selectedTable]
                                                .length
                                        }
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    )
}

export default AdminPanel
