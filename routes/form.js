/* ==== Post Routes ==== */
const router = require("express").Router();
const { form } = require("../controllers");

router.post("/", form.create);

module.exports = router;