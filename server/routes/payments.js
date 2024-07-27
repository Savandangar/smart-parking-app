const express = require('express')
const router = express.Router()
const { checkoutBookSlot} = require('../controllers/payments')
const auth = require('../middleware/auth')

/*Router indicates the mapping of url string with corresponding handler(controller) function*/

router.post('/checkoutBookSlot',auth,checkoutBookSlot)

module.exports = router