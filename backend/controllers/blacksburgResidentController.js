const db = require('../database')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

exports.loginResident = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT password_hash FROM Blacksburg_Resident WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        bcrypt.compare(password, results[0].password_hash, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Server error during password comparison');
            }
            if (isMatch) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Password is incorrect');
            }
        });
    });
}

exports.registerResident = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year, username, password_hash } = req.body;
    
    bcrypt.hash(password_hash, saltRounds, (err, hashed_password) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        const sql = `INSERT INTO Blacksburg_Resident (first_name, last_name, date_of_birth, school_year, username, password_hash) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(
            sql,
            [first_name, last_name, date_of_birth, school_year, username, hashed_password],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).send(`Resident registered successfully with ID: ${result.insertId}`);
            }
        );
    });
}


exports.changePassword = (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    const sql = 'SELECT password_hash FROM Blacksburg_Resident WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        bcrypt.compare(oldPassword, results[0].password_hash, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Server error during password comparison');
            }
            if (!isMatch) {
                return res.status(401).send('Old password is incorrect');
            }

            bcrypt.hash(newPassword, saltRounds, (err, hashedNewPassword) => {
                if (err) {
                    return res.status(500).send('Error hashing new password');
                }

                const updateSql = 'UPDATE Blacksburg_Resident SET password_hash = ? WHERE username = ?';
                db.query(updateSql, [hashedNewPassword, username], (err, result) => {
                    if (err) {
                        return res.status(500).send('Server error updating password');
                    }
                    if (result.affectedRows === 0) {
                        return res.status(404).send('User not found during update');
                    }
                    res.status(200).send('Password changed successfully');
                });
            });
        });
    });
};
