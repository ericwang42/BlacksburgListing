const db = require('../database')

exports.createResident = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year } = req.body

    const sql = `INSERT INTO Blacksburg_Resident (first_name, last_name, date_of_birth, school_year) VALUES (?, ?, ?, ?)`
    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(201).send(
                `Resident added successfully with ID: ${result.insertId}`
            )
        }
    )
}

exports.readResident = (req, res) => {
    const sql = 'SELECT * FROM Blacksburg_Resident'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.json(results)
    })
}

exports.readResidentById = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM Blacksburg_Resident WHERE resident_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        res.status(200).send('Resident retrieved successfully')
        res.json(result)
    })
}

exports.updateResident = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year } = req.body
    const { id } = req.params

    const sql = `UPDATE Blacksburg_Resident SET first_name = ?, last_name = ?, date_of_birth = ?, school_year = ? WHERE resident_id = ?`
    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year, id],
        (err, result) => {
            if (err) return res.status(500).send(err)
            if (result.affectedRows == 0) {
                return res.status(404).send('Resident not found')
            }
            res.send('Resident updated successfully')
        }
    )
}

exports.deleteResident = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Blacksburg_Resident WHERE resident_id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        if (result.affectedRows == 0) {
            return res.status(404).send('Resident not found')
        }
        res.send('Resident deleted successfully')
    })
}
