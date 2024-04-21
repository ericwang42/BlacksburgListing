const db = require('../database')
const bcrypt = require('bcrypt')

exports.login = (req, res) => {
    const { username, password } = req.body

    const queries = [
        {
            query: `SELECT resident_id, password_hash FROM Blacksburg_Resident WHERE username = ? LIMIT 1`,
            type: 'Blacksburg_Resident',
            id: 'resident_id',
        },
        {
            query: `SELECT leaser_id, password_hash FROM Apartment_Leaser WHERE username = ? LIMIT 1`,
            type: 'Apartment_Leaser',
            id: 'leaser_id',
        },
        {
            query: `SELECT admin_id, password_hash FROM Admin WHERE username = ? LIMIT 1`,
            type: 'Admin',
            id: 'admin_id',
        },
    ]
    
    (async () => {
        for (let entry of queries) {
            try {
                const [results] = await db
                    .promise()
                    .query(entry.query, [username])

                if (results.length > 0) {
                    const match = await bcrypt.compare(
                        password,
                        results[0].password_hash
                    )

                    if (match) {
                        return res.status(200).json({
                            user_type: entry.type,
                            user_id: results[0][entry.id],
                        })
                    } else {
                        return res.status(401).send('Incorrect password')
                    }
                }
            } catch (err) {
                return res.status(500).send(`Server error: ${err}`)
            }
        }

        return res.status(404).send('User not found')
    })()
}
