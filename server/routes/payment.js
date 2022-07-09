const router = require('express').Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", null);

router.post('/buy', async (req, res) => {
    const { token = {} } = req.body; 

    if (!Object.keys(token).length) {
        res.status(400).json({ success: false });
    }

    const { id:customerId } = await stripe.customers.create({
        email: token.email,
        source: token.id,
    }).catch(e => {
        console.log(e);
        return null; 
    })

    if (!customerId) {
        res.status(500).json({ success: false });
        return; 
    }

    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
    const charge = await stripe.charges.create({
        amount: 100 * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Card payment",
    }, { idempotencyKey: invoiceId }).catch(e => {
        console.log(e);
        return null; 
    });

    if (!charge) {
        res.status(500).json({ success: false });
        return;
    };

    res.status(201).json({ success: true });
});

module.exports = router; 