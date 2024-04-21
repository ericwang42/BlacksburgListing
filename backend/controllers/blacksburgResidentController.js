const db = require('../database')
const bcrypt = require('bcrypt')
const saltRounds = 10

async function usernameExists(username, db) {
    const queries = [
        `SELECT 1 FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Admin WHERE username = ? LIMIT 1`,
    ]

    for (let query of queries) {
        const [results] = await db.promise().query(query, [username])

        if (results.length > 0) {
            return true
        }
    }

    return false
}

exports.registerResident = (req, res) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        school_year,
        username,
        password_hash,
    } = req.body

    usernameExists(username, db)
        .then((exists) => {
            if (exists) {
                return res.status(409).send('Username already in use')
            }

            bcrypt.hash(password_hash, saltRounds, (err, hashed_password) => {
                if (err) {
                    return res.status(500).send('Error hashing password')
                }

                const sql = `INSERT INTO Blacksburg_Resident (first_name, last_name, date_of_birth, school_year, username, password_hash) VALUES (?, ?, ?, ?, ?, ?)`

                db.query(
                    sql,
                    [
                        first_name,
                        last_name,
                        date_of_birth,
                        school_year,
                        username,
                        hashed_password,
                    ],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send(err)
                        }

                        return res
                            .status(201)
                            .send(
                                `Resident registered successfully with ID: ${result.insertId}`
                            )
                    }
                )
            })
        })
        .catch((err) => {
            return res.status(500).send(`Server error: ${err}`)
        })
}

exports.readResident = (req, res) => {
    const sql = `SELECT * FROM Blacksburg_Resident`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res.status(404).send('No residents found')
        }

        // res.status(200).send('Residents retrieved successfully')
        return res.status(200).json(results)
    })
}

exports.readResidentById = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM Blacksburg_Resident WHERE resident_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.length == 0) {
            return res.status(404).send('No resident found with this id')
        }

        // res.status(200).send('Resident retrieved successfully')
        return res.status(200).json(result)
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
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows == 0) {
                return res.status(404).send('Resident not found')
            }

            return res.status(200).send('Resident updated successfully')
        }
    )
}

exports.deleteResident = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Blacksburg_Resident WHERE resident_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send('Resident not found')
        }

        return res.status(200).send('Resident deleted successfully')
    })
}

exports.changeResidentPassword = (req, res) => {
    const { username, oldPassword, newPassword } = req.body

    const sql = `SELECT password_hash FROM Blacksburg_Resident WHERE username = ?`

    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Server error')
        }

        if (results.length === 0) {
            return res.status(404).send('User not found')
        }

        bcrypt.compare(
            oldPassword,
            results[0].password_hash,
            (err, isMatch) => {
                if (err) {
                    return res.status(500).send('Error verifying passwordn')
                }

                if (!isMatch) {
                    return res.status(401).send('Incorrect old password')
                }

                bcrypt.hash(
                    newPassword,
                    saltRounds,
                    (err, hashedNewPassword) => {
                        if (err) {
                            return res
                                .status(500)
                                .send('Error hashing new password')
                        }

                        const updateSql = `UPDATE Blacksburg_Resident SET password_hash = ? WHERE username = ?`

                        db.query(
                            updateSql,
                            [hashedNewPassword, username],
                            (err, result) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .send('Server error updating password')
                                }

                                if (result.affectedRows === 0) {
                                    return res
                                        .status(404)
                                        .send('User not found during update')
                                }

                                return res
                                    .status(200)
                                    .send('Password changed successfully')
                            }
                        )
                    }
                )
            }
        )
    })
}
