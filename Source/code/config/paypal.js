const paypal = require('paypal-rest-sdk');

module.exports = function(paypal) {
    paypal.configure({
        'mode': 'sandbox', 
        'client_id': 'AUrTH1AFEzqjDEEadlnWkhn6F1Qowxx2ISHaLZUmt_TyDFoQGwvvPSLmgaItLC8jzwVNe5tbUIYz7Eim',
        'client_secret': 'ECZrHp0G1CwSolQQV0YzQYiAUhA10EL6cBaRdZksl8b0EbGPucOweyn-2PKQ_IPGeK4PG5kjX27ZIoZe'
    });
}
