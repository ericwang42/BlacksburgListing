const db = require('../database')

exports.createApartmentListing = (req, res) => {
    const {
        street_address,
        apt_number,
        city,
        state,
        zip_code,
        leaser_name,
        leaser_no,
        price,
        description
    } = req.body
    const sql =
        'INSERT INTO Apartment_Listing (street_address, apt_number, city, state, zip_code, leaser_name, leaser_no, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(
        sql,
        [
            street_address,
            apt_number,
            city,
            state,
            zip_code,
            leaser_name,
            leaser_no,
            price,
            description
        ],
        (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(201).send(
                `Apartment listing added successfully with ID: ${result.insertId}`
            )
        }
    )
}

exports.readApartmentListing = (req, res) => {
    const sql = 'SELECT * FROM Apartment_Listing'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results)
    })
}

exports.readApartmentListingById = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM Apartment_Listing WHERE apartment_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        res.status(200).send('Apartment listing retrieved successfully')
        res.json(result)
    })
}

exports.updateApartmentListing = (req, res) => {
    const {
        street_address,
        apt_number,
        city,
        state,
        zip_code,
        leaser_name,
        leaser_no,
        price,
        description
    } = req.body
    const { id } = req.params
    const sql =
        'UPDATE Apartment_Listing SET street_address = ?, apt_number = ?, city = ?, state = ?, zip_code = ?, leaser_name = ?, leaser_no = ? WHERE apartment_id = ?'
    db.query(
        sql,
        [
            street_address,
            apt_number,
            city,
            state,
            zip_code,
            leaser_name,
            leaser_no,
            price,
            description,
            id,
        ],
        (err, result) => {
            if (err) return res.status(500).send(err)
            if (result.affectedRows == 0)
                return res.status(404).send('Apartment listing not found')
            res.send('Apartment listing updated successfully')
        }
    )
}

exports.deleteApartmentListing = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM Apartment_Listing WHERE apartment_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        if (result.affectedRows == 0)
            return res.status(404).send('Apartment listing not found')
        res.send('Apartment listing deleted successfully')
    })
}
