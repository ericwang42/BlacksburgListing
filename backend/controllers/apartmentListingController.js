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
        description,
    } = req.body

    const sql = `INSERT INTO Apartment_Listing (street_address, apt_number, city, state, zip_code, leaser_name, leaser_no, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

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
        ],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            return res
                .status(201)
                .send(
                    `Apartment listing created successfully with ID: ${result.insertId}`
                )
        }
    )
}

exports.readApartmentListing = (req, res) => {
    const sql = `SELECT * FROM Apartment_Listing`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res.status(404).send('No apartment listings found')
        }

        res.status(200).send('Apartment listings retrieved successfully')
        return res.json(results)
    })
}

exports.readApartmentListingById = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM Apartment_Listing WHERE apartment_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.length == 0) {
            return res
                .status(404)
                .send('No apartment listing found with this id')
        }

        res.status(200).send('Apartment listing retrieved successfully')
        return res.json(result)
    })
}

exports.getReviewsForApartment = (req, res) => {
    const { id } = req.params

    const sql = `
        SELECT r.review_id
        FROM Review r
        WHERE r.apartment_review_id = ?
    `

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res
                .status(404)
                .send('No reviews found for this apartment listing')
        }

        res.status(200).send(
            'Reviews retrieved successfully for this apartment listing'
        )

        return res.json(results)
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
        description,
    } = req.body
    const { id } = req.params

    const sql = `UPDATE Apartment_Listing SET street_address = ?, apt_number = ?, city = ?, state = ?, zip_code = ?, leaser_name = ?, leaser_no = ? WHERE apartment_id = ?`

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
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows == 0) {
                return res.status(404).send('Apartment listing not found')
            }

            return res
                .status(200)
                .send('Apartment listing updated successfully')
        }
    )
}

exports.deleteApartmentListing = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Apartment_Listing WHERE apartment_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send('Apartment listing not found')
        }

        return res.status(200).send('Apartment listing deleted successfully')
    })
}
