const db = require("../database")
const bcrypt = require("bcrypt")

exports.login = (req, res) => {
    const { username, password } = req.body
    const queries = [
        {
            query: `SELECT resident_id as user_id, password_hash FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
            type: "Blacksburg_Resident",
        },
        {
            query: `SELECT leaser_id as user_id, password_hash FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
            type: "Apartment_Leaser",
        },
        {
            query: `SELECT admin_id as user_id, password_hash FROM Admin WHERE username = ? LIMIT 1`,
            type: "Admin",
        },
    ]

    const checkUser = async (queryEntry, doneCallback) => {
        db.query(queryEntry.query, [username], (err, results) => {
            if (err) {
                return doneCallback(err)
            }

            if (results.length === 0) {
                return doneCallback()
            }

            bcrypt.compare(password, results[0].password_hash, (err, match) => {
                if (err) {
                    return doneCallback(err)
                }

                if (match) {
                    return doneCallback(null, {
                        user_type: queryEntry.type,
                        user_id: results[0].user_id,
                    })
                } else {
                    return doneCallback()
                }
            })
        })
    }

    ;(async function processQueries() {
        for (let entry of queries) {
            try {
                const result = await new Promise((resolve, reject) => {
                    checkUser(entry, (err, success) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(success)
                        }
                    })
                })

                if (result) {
                    return res.json(result)
                }
            } catch (err) {
                return res.status(500).send("Server error")
            }
        }
        
        res.status(401).send("Invalid credentials")
    })()
}
