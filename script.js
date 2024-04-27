document.getElementById('pay-button').addEventListener('click', function(){
    var amount = document.getElementById('amount').value;

    // Kirim request ke API Midtrans
    fetch('https://api.sandbox.midtrans.com/v2/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('SB-Mid-server-YaLUWdfR5cCIVsn7W-l_2bCH' + ':')
        },
        body: JSON.stringify({
            "payment_type": "bank_transfer",
            "transaction_details": {
                "gross_amount": amount,
                "order_id": "ORDER-" + Math.round((new Date()).getTime() / 1000)
            }
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        snap.pay(responseJson.token, {
            onSuccess: function(result){
                alert('Payment successful!');
            },
            onPending: function(result){
                alert('Payment pending!');
            },
            onError: function(result){
                alert('Payment failed!');
            }
        });
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});
