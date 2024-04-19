const db = require('../database')

exports.createReview = (req, res) => {
    const {
        rating,
        review_description,
        reviewer_id,
        apartment_review_id,
        dorm_review_id,
    } = req.body

    const sql = `INSERT INTO Review (rating, review_description, reviewer_id, apartment_review_id, dorm_review_id) VALUES (?, ?, ?, ?, ?)`

    db.query(
        sql,
        [
            rating,
            review_description,
            reviewer_id,
            apartment_review_id,
            dorm_review_id,
        ],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            return res
                .status(201)
                .send(`Review created successfully with ID: ${result.insertId}`)
        }
    )
}

exports.readReview = (req, res) => {
    const sql = `SELECT * FROM Review`

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send('Reviews retrieved successfully')
        return res.json(results)
    })
}

exports.readReviewById = (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM Review WHERE review_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send('Review retrieved successfully')
        return res.json(result)
    })
}

exports.updateReview = (req, res) => {
    const {
        rating,
        review_description,
        reviewer_id,
        apartment_review_id,
        dorm_review_id,
    } = req.body
    const { id } = req.params

    const sql = `UPDATE Review SET rating = ?, review_description = ?, reviewer_id = ?, apartment_review_id = ?, dorm_review_id = ? WHERE review_id = ?`

    db.query(
        sql,
        [
            rating,
            review_description,
            reviewer_id,
            apartment_review_id,
            dorm_review_id,
            id,
        ],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows == 0) {
                return res.status(404).send('Review not found')
            }

            return res.status(200).send('Review updated successfully')
        }
    )
}

exports.deleteReview = (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM Review WHERE review_id = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows == 0) {
            return res.status(404).send('Review not found')
        }

        return res.status(200).send('Review deleted successfully')
    })
}
