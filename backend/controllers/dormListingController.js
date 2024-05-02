const db = require("../database")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const sharp = require("sharp")

exports.createDormListing = (req, res) => {
    upload.single("image")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        try {
            const {
                street_address,
                room_number,
                city,
                state,
                zip_code,
                dorm_name,
                price,
                description,
            } = req.body

            let image
            if (req.file) {
                const buffer = await sharp(req.file.buffer)
                    .resize(1024)
                    .jpeg({ quality: 80 })
                    .toBuffer()
                image = buffer
            }

            const sql = `INSERT INTO Dorm_Listing (street_address, room_number, city, state, zip_code, dorm_name, price, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

            db.query(
                sql,
                [
                    street_address,
                    room_number,
                    city,
                    state,
                    zip_code,
                    dorm_name,
                    price,
                    description,
                    image,
                ],
                (err, result) => {
                    if (err) {
                        console.error("Database query error:", err)
                        return res.status(500).send(err)
                    }
                    return res
                        .status(201)
                        .send(
                            `Dorm listing created successfully with ID: ${result.insertId}`
                        )
                }
            )
        } catch (error) {
            console.error("Error processing image:", error)
            res.status(500).send(error.toString())
        }
    })
}

exports.readDormListing = (req, res) => {
    const sql = `SELECT dorm_id, street_address, room_number, city, state, zip_code, dorm_name, price, description, TO_BASE64(image) AS image_base64 FROM Dorm_Listing`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (results.length == 0) {
            return res.status(404).send("No dorm listings found")
        }

        const modifiedResults = results.map((result) => ({
            ...result,
            image: result.image_base64
                ? `data:image/jpeg;base64,${result.image_base64}`
                : null,
        }))

        return res.status(200).json(modifiedResults)
    })
}

exports.readDormListingById = (req, res) => {
    const { id } = req.params
    const sql = `SELECT dorm_id, street_address, room_number, city, state, zip_code, dorm_name, price, description, TO_BASE64(image) AS image_base64 FROM Dorm_Listing WHERE dorm_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (result.length === 0) {
            return res.status(404).send("No dorm listing found with this id")
        }

        const modifiedResult = {
            ...result[0],
            image: result[0].image_base64
                ? `data:image/jpeg;base64,${result[0].image_base64}`
                : null,
        }

        return res.status(200).json(modifiedResult)
    })
}

exports.readDormListing = (req, res) => {
    const sql = `SELECT dorm_id, street_address, room_number, city, state, zip_code, dorm_name, price, description, TO_BASE64(image) AS image_base64 FROM Dorm_Listing`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (results.length == 0) {
            return res.status(404).send("No dorm listings found")
        }

        const modifiedResults = results.map((result) => ({
            ...result,
            image: result.image_base64
                ? `data:image/jpeg;base64,${result.image_base64}`
                : null,
        }))

        return res.status(200).json(modifiedResults)
    })
}

exports.readDormListingById = (req, res) => {
    const { id } = req.params
    const sql = `SELECT dorm_id, street_address, room_number, city, state, zip_code, dorm_name, price, description, TO_BASE64(image) AS image_base64 FROM Dorm_Listing WHERE dorm_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (result.length === 0) {
            return res.status(404).send("No dorm listing found with this id")
        }

        const modifiedResult = {
            ...result[0],
            image: result[0].image_base64
                ? `data:image/jpeg;base64,${result[0].image_base64}`
                : null,
        }

        return res.status(200).json(modifiedResult)
    })
}

exports.getReviewsForDorm = (req, res) => {
    const { id } = req.params

    const sql = `
        SELECT r.review_id, r.reviewer_id
        FROM Review r
        WHERE r.dorm_review_id = ?
    `

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length == 0) {
            return res
                .status(404)
                .send("No reviews found for this dorm listing")
        }

        return res.status(200).json(results)
    })
}

exports.updateDormListing = (req, res) => {
    const {
        street_address,
        room_number,
        city,
        state,
        zip_code,
        dorm_name,
        price,
        description,
    } = req.body
    const { id } = req.params

    const sql = `UPDATE Dorm_Listing SET street_address = ?, room_number = ?, city = ?, state = ?, zip_code = ?, dorm_name = ?, price = ?, description = ? WHERE dorm_id = ?`

    db.query(
        sql,
        [
            street_address,
            room_number,
            city,
            state,
            zip_code,
            dorm_name,
            price,
            description,
            id,
        ],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows == 0) {
                return res.status(404).send("Dorm listing not found")
            }

            return res.status(200).send("Dorm listing updated successfully")
        }
    )
}

exports.deleteDormListing = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Dorm_Listing WHERE dorm_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send("Dorm listing not found")
        }

        return res.status(200).send("Dorm listing deleted successfully")
    })
}
