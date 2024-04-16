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
    } = req.body
    const sql =
        'INSERT INTO Apartment_Listing (street_address, apt_number, city, state, zip_code, leaser_name, leaser_no) VALUES (?, ?, ?, ?, ?, ?, ?)'
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
        ],
        (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(201).send(
                `Apartment listing added successfully with ID: ${result.insertId}`
            )
        }
    )
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

exports.readApartmentListing = (req, res) => {
    const sql = 'SELECT * FROM Apartment_Listing'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results)
    })
}
