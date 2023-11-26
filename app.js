const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;
const Razorpay = require('razorpay');

dotenv.config()

app.use(express.json());

app.use(cors({
    origin: ['https://techstax-frontend.vercel.app'],
    credentials: true
}));

app.post('/placeOrder', (req, res, next) => {
    try {
        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.API_SECRET,
        });

        var options = {
            amount: req.body.amount, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {

            return res.status(200).json({
                message: 'Order placed successfully!',
                success: true,
                status: 'success',
                data: {
                    order
                }
            })
        });
    } catch (error) {
        console.log("Failed to place order");
        return res.status(500), json({
            message: 'Failed to place order, server error',
            success: false,
            status: 'fail',
            error: error
        })
    }
})

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
})

// {
//     id: 'order_N5582nQ9EOh8Ek',
//     entity: 'order',
//     amount: 5000,
//     amount_paid: 0,
//     amount_due: 5000,
//     currency: 'INR',
//     receipt: 'order_rcptid_11',
//     offer_id: null,
//     status: 'created',
//     attempts: 0,
//     notes: [],
//     created_at: 1700997156
//   }