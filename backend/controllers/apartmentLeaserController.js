const db = require('../database')

exports.createLeaser = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year } = req.body
    const sql =
        'INSERT INTO Apartment_Leaser (first_name, last_name, date_of_birth, school_year) VALUES (?, ?, ?, ?)'
    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year],
        (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(201).send(
                `Leaser added successfully with ID: ${result.insertId}`
            )
        }
    )
}

exports.readLeaser = (req, res) => {
    const sql = 'SELECT * FROM Apartment_Leaser'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results)
    })
}

exports.readLeaserById = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM Apartment_Leaser WHERE leaser_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        res.status(200).send('Leaser retrieved successfully')
        res.json(result)
    })
}

exports.updateLeaser = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year } = req.body
    const { id } = req.params
    const sql =
        'UPDATE Apartment_Leaser SET first_name = ?, last_name = ?, date_of_birth = ?, school_year = ? WHERE leaser_id = ?'
    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year, id],
        (err, result) => {
            if (err) return res.status(500).send(err)
            if (result.affectedRows == 0)
                return res.status(404).send('Leaser not found')
            res.send('Leaser updated successfully')
        }
    )
}

exports.deleteLeaser = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM Apartment_Leaser WHERE leaser_id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err)
        if (result.affectedRows == 0)
            return res.status(404).send('Leaser not found')
        res.send('Leaser deleted successfully')
    })
}
