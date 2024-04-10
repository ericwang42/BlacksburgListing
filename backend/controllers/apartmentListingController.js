var ApartmentListing = require('../models/apartmentListing');

exports.listAll = function(req, res) {
    ApartmentListing.getAllListings(function(err, rows) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(rows);
        }
    });
};

exports.create = function(req, res) {
    ApartmentListing.addListing(req.body, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ apartment_id: result.insertId, ...req.body });
        }
    });
};

exports.update = function(req, res) {
    ApartmentListing.updateListing(req.params.id, req.body, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: 'Listing updated successfully', ...req.body });
        }
    });
};

exports.delete = function(req, res) {
    ApartmentListing.deleteListing(req.params.id, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: 'Listing deleted successfully' });
        }
    });
};
