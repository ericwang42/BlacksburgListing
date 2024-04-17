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

exports.loginLeaser = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT password_hash FROM Apartment_Leaser WHERE username = ?';
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

exports.registerLeaser = (req, res) => {
    const { first_name, last_name, date_of_birth, school_year, username, password_hash } = req.body

    bcrypt.hash(password_hash, saltRounds, (err, hashed_password) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
    const sql =
        'INSERT INTO Apartment_Leaser (first_name, last_name, date_of_birth, school_year, username, password_hash) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(
        sql,
        [first_name, last_name, date_of_birth, school_year, username, hashed_password],
        (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(201).send(
                `Leaser added successfully with ID: ${result.insertId}`
            )
        }
    );
    });
}

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.changePassword = (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    const sql = 'SELECT password_hash FROM Apartment_Leaser WHERE username = ?';
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

                const updateSql = 'UPDATE Apartment_Leaser SET password_hash = ? WHERE username = ?';
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
