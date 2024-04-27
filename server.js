const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/create-payment-link', (req, res) => {
    const orderId = req.body.orderId;
    const amount = req.body.amount;

    const transactionData = {
        "transaction_details": {
            "order_id": orderId,
            "gross_amount": amount
        }
    };

    request.post({
        url: 'https://api.sandbox.midtrans.com/v2/charge',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from('SB-Mid-server-YaLUWdfR5cCIVsn7W-l_2bCH' + ':').toString('base64')
        },
        body: JSON.stringify(transactionData)
    }, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error occurred while creating payment link.' });
        } else {
            const responseBody = JSON.parse(body);
            const paymentUrl = responseBody.redirect_url;
            res.json({ paymentUrl: paymentUrl });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
