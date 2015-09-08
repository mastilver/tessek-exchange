'use strict';

var Promise = require('promise');


module.exports = function (exchange) {


    return function(action){

        return exchange.getOpenOrders()
        .then(function(openOrders){

            var promises = openOrders.map(function(openOrder){
                return exchange.cancelOrder(openOrder);
            });

            return Promise.all(promises);
        })
        .then(function(){

            if(action === 'buy'){
                exchange.buy();
            }
            else if(action === 'sell'){
                exchange.sell();
            }
        });
    };
};
