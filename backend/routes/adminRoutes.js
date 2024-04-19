const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.post('/register', adminController.registerAdmin)
router.get('/', adminController.readAdmin)
router.get('/:id', adminController.readAdminById)
router.put('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)
router.post('/login', adminController.loginAdmin)

module.exports = router
