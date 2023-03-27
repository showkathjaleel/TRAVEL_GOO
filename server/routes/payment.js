const router = require('express').Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()

router.post('/guideregister', async (req, res) => {
  console.log('lllrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex')
    }

    // instance.orders.create(options, function (err, order) {
    //   if (err) {
    //     return res.status(500).json({ message: 'something went wrong!' })
    //   }
    //   res.status(200).json({ data: order })
    // })

    const data = await instance.orders.create(options)
    if (data) {
      res.status(200).json({ data })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'internal server Error!' })
  }
})

router.post('/verifypayment', async (req, res) => {
  console.log(req.body, '111 verify payment il keri')
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body.response

    const sign = razorpay_order_id + '|' + razorpay_payment_id
    console.log(sign, 'sign of verifypayment')
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    // console.log('sig received ', req.body.response.razorpay_signature)
    // console.log('sig generated ', expectedSignature)
    // const response = { signatureIsValid: 'false' }
    if (expectedSignature === razorpay_signature) {
      const response = { signatureIsValid: 'true' }
      res.send(response)
    } else {
      res.status(400).json({ message: 'Invalid signature' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/verify', async (req, res) => {
  console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
  console.log(req.body, '111 verify payment il keri')
  try {
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    const {
      paymentId,
      orderId,
      signature
    } = req.body

    const sign = orderId + '|' + paymentId
    console.log(sign, 'sign of verifypayment')
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (expectedSignature === signature) {
      const response = { signatureIsValid: 'true' }
      res.send(response)
    } else {
      res.status(400).json({ message: 'Invalid signature' })
    }
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
