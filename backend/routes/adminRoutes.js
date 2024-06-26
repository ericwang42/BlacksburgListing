const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.post("/", adminController.registerAdmin)
router.get("/", adminController.readAdmin)
router.get("/:id", adminController.readAdminById)
router.put("/:id", adminController.updateAdmin)
router.delete("/:id", adminController.deleteAdmin)
router.post("/:id/change-password", adminController.changeAdminPassword)

module.exports = router
