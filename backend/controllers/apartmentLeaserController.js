const db = require("../database")
const bcrypt = require("bcrypt")
const saltRounds = 10

function usernameExists(username, db, callback) {
    const queries = [
        `SELECT 1 FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Admin WHERE username = ? LIMIT 1`,
    ]

    let exists = false
    let queriesProcessed = 0

    queries.forEach((query) => {
        db.query(query, [username], (err, results) => {
            if (err) {
                db.rollback(() => {
                    throw err
                })
                return
            }

            if (results.length > 0) {
                exists = true
            }

            queriesProcessed++
            if (queriesProcessed === queries.length) {
                callback(exists)
            }
        })
    })
}

exports.registerLeaser = (req, res) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        school_year = null,
        username,
        password_hash,
    } = req.body

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send("Failed to start transaction")
        }

        usernameExists(username, db, (exists) => {
            if (exists) {
                db.rollback(() =>
                    res.status(409).send("Username already in use")
                )
                return
            }

            bcrypt.hash(password_hash, saltRounds, (err, hashed_password) => {
                if (err) {
                    db.rollback(() =>
                        res.status(500).send("Error hashing password")
                    )
                    return
                }

                const sql = `INSERT INTO Apartment_Leaser (first_name, last_name, date_of_birth, school_year, username, password_hash) VALUES (?, ?, ?, ?, ?, ?)`

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
                            db.rollback(() => res.status(500).send(err))
                            return
                        }

                        db.commit((err) => {
                            if (err) {
                                db.rollback(() =>
                                    res
                                        .status(500)
                                        .send("Failed to commit transaction")
                                )
                                return
                            }

                            res.status(201).send(
                                `Leaser registered successfully with ID: ${result.insertId}`
                            )
                        })
                    }
                )
            })
        })
    })
}

function usernameExists(username, db, callback) {
    const queries = [
        `SELECT 1 FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
        `SELECT 1 FROM Admin WHERE username = ? LIMIT 1`,
    ]

    let exists = false
    let queriesProcessed = 0

    queries.forEach((query) => {
        db.query(query, [username], (err, results) => {
            if (err) {
                db.rollback(() => {
                    throw err
                })
                return
            }

            if (results.length > 0) {
                exists = true
            }

            queriesProcessed++
            if (queriesProcessed === queries.length) {
                callback(exists)
            }
        })
    })
}

exports.readLeaser = (req, res) => {
    const sql = `SELECT * FROM Apartment_Leaser`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res.status(404).send("No leasers found")
        }

        return res.status(200).json(results)
    })
}

exports.readLeaserById = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM Apartment_Leaser WHERE leaser_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.length == 0) {
            return res.status(404).send("No leaser found with this id")
        }

        return res.status(200).json(result)
    })
}

exports.updateLeaser = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year } = req.body
    const { id } = req.params

    const sql = `UPDATE Apartment_Leaser SET first_name = ?, last_name = ?, date_of_birth = ?, school_year = ? WHERE leaser_id = ?`

    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year, id],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows == 0) {
                return res.status(404).send("Leaser not found")
            }

            return res.status(200).send("Leaser updated successfully")
        }
    )
}

exports.deleteLeaser = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Apartment_Leaser WHERE leaser_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send("Leaser not found")
        }

        return res.status(200).send("Leaser deleted successfully")
    })
}

exports.changeLeaserPassword = (req, res) => {
    const { oldPassword, newPassword } = req.body
    const userId = req.params.id

    const sql = `SELECT password_hash FROM Apartment_Leaser WHERE leaser_id = ?`

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).send("Server error")
        }

        if (results.length === 0) {
            return res.status(404).send("User not found")
        }

        bcrypt.compare(
            oldPassword,
            results[0].password_hash,
            (err, isMatch) => {
                if (err) {
                    return res.status(500).send("Error verifying password")
                }
                if (!isMatch) {
                    return res.status(401).send("Incorrect old password")
                }

                bcrypt.hash(
                    newPassword,
                    saltRounds,
                    (err, hashedNewPassword) => {
                        if (err) {
                            return res
                                .status(500)
                                .send("Error hashing new password")
                        }

                        const updateSql = `UPDATE Apartment_Leaser SET password_hash = ? WHERE leaser_id = ?`

                        db.query(
                            updateSql,
                            [hashedNewPassword, userId],
                            (err, result) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .send("Server error updating password")
                                }

                                if (result.affectedRows === 0) {
                                    return res
                                        .status(404)
                                        .send("User not found during update")
                                }

                                return res
                                    .status(200)
                                    .send("Password changed successfully")
                            }
                        )
                    }
                )
            }
        )
    })
}
