const bcrypt = require('bcrypt');
const db = require('../database');
const saltRounds = 10;

exports.registerAdmin = (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        const sql = 'INSERT INTO Admin (username, password_hash) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send(`Admin created successfully with ID: ${result.insertId}`);
        });
    });
};

exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT password_hash FROM Admin WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Admin not found');
        }
        bcrypt.compare(password, results[0].password_hash, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error verifying password');
            }
            if (!isMatch) {
                return res.status(401).send('Incorrect password');
            }
            res.send('Login successful');
        });
    });
};

exports.getAllAdmins = (req, res) => {
    const sql = 'SELECT * FROM Admin';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getAdminById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Admin WHERE admin_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.updateAdmin = (req, res) => {
    const { username } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Admin SET username = ? WHERE admin_id = ?';
    db.query(sql, [username, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Admin updated successfully');
    });
};

exports.deleteAdmin = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Admin WHERE admin_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Admin deleted successfully');
    });
};
