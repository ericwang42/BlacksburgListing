const db = require('../database')

exports.createDormListing = (req, res) => {
    const { street_address, room_number, city, state, zip_code, dorm_name } =
        req.body
    const sql =
        'INSERT INTO Dorm_Listing (street_address, room_number, city, state, zip_code, dorm_name) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(
        sql,
        [street_address, room_number, city, state, zip_code, dorm_name],
        (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(201).send(
                `Dorm listing added successfully with ID: ${result.insertId}`
            )
        }
    )
}

exports.updateDormListing = (req, res) => {
    const { street_address, room_number, city, state, zip_code, dorm_name } =
        req.body
    const { id } = req.params
    const sql =
        'UPDATE Dorm_Listing SET street_address = ?, room_number = ?, city = ?, state = ?, zip_code = ?, dorm_name = ? WHERE dorm_id = ?'
    db.query(
        sql,
        [street_address, room_number, city, state, zip_code, dorm_name, id],
        (err, result) => {
            if (err) return res.status(500).send(err)
            if (result.affectedRows == 0)
                return res.status(404).send('Dorm listing not found')
            res.send('Dorm listing updated successfully')
        }
    )
}

exports.deleteDormListing = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM Dorm_Listing WHERE dorm_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        if (result.affectedRows == 0)
            return res.status(404).send('Dorm listing not found')
        res.send('Dorm listing deleted successfully')
    })
}

exports.readDormListing = (req, res) => {
    const sql = 'SELECT * FROM Dorm_Listing'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results)
    })
}
