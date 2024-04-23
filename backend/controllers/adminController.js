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

exports.registerAdmin = (req, res) => {
    const { username, password } = req.body

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

            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    db.rollback(() =>
                        res.status(500).send("Error hashing password")
                    )
                    return
                }

                const sql = `INSERT INTO Admin (username, password_hash) VALUES (?, ?)`
                
                db.query(sql, [username, hashedPassword], (err, result) => {
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
                            `Admin created successfully with ID: ${result.insertId}`
                        )
                    })
                })
            })
        })
    })
}

exports.readAdmin = (req, res) => {
    const sql = `SELECT * FROM Admin`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res.status(404).send("No admins found")
        }

        return res.status(200).json(results)
    })
}

exports.readAdminById = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM Admin WHERE admin_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.length == 0) {
            return res.status(404).send("No admin found with this id")
        }

        return res.status(200).json(result)
    })
}

exports.updateAdmin = (req, res) => {
    const { username } = req.body
    const { id } = req.params

    const sql = `UPDATE Admin SET username = ? WHERE admin_id = ?`

    db.query(sql, [username, id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send("Admin not found")
        }

        return res.status(200).send("Admin updated successfully")
    })
}

exports.deleteAdmin = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Admin WHERE admin_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send("Admin not found")
        }

        return res.status(200).send("Admin deleted successfully")
    })
}
