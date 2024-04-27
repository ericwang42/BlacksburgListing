const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = 'yourSecretKey'; // You might want to move this to an environment variable for production

// Helper function to generate JWT
// Helper function to generate JWT
function generateToken(user) {
    return jwt.sign(
        {
            user_id: user.user_id,
            user_type: user.user_type,
            username: user.username // Include username in the JWT
        },
        secretKey,
        { expiresIn: '24h' } // Specifies the time in which the token will expire. Customize as needed.
    );
}


exports.login = (req, res) => {
    const { username, password } = req.body;
    const queries = [
        {
            query: `SELECT resident_id as user_id, password_hash, username FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
            type: "Blacksburg_Resident",
        },
        {
            query: `SELECT leaser_id as user_id, password_hash, username FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
            type: "Apartment_Leaser",
        },
        {
            query: `SELECT admin_id as user_id, password_hash, username FROM Admin WHERE username = ? LIMIT 1`,
            type: "Admin",
        },
    ];

    const checkUser = async (queryEntry, doneCallback) => {
        db.query(queryEntry.query, [username], (err, results) => {
            if (err) {
                return doneCallback(err);
            }

            if (results.length === 0) {
                return doneCallback();
            }

            bcrypt.compare(password, results[0].password_hash, (err, match) => {
                if (err) {
                    return doneCallback(err);
                }

                if (match) {
                    return doneCallback(null, {
                        user_type: queryEntry.type,
                        user_id: results[0].user_id,
                        username: results[0].username // Capture the username
                    });
                } else {
                    return doneCallback();
                }
            });
        });
    };

    (async function processQueries() {
        for (let entry of queries) {
            try {
                const result = await new Promise((resolve, reject) => {
                    checkUser(entry, (err, success) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(success);
                        }
                    });
                });

                if (result) {
                    const token = generateToken(result);
                    return res.json({
                        message: "Login successful",
                        token: token,
                        user_type: result.user_type,
                        user_id: result.user_id,
                        username: result.username // Include username in the response if needed elsewhere
                    });
                }
            } catch (err) {
                return res.status(500).send("Server error");
            }
        }

        res.status(401).send("Invalid credentials");
    })();
}
