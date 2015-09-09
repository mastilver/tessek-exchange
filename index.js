'use strict';

var Promise = require('promise');


module.exports = function (exchange) {


    return function(action, price){

        return exchange.getOpenOrders()
        .then(function(openOrders){

            var promises = openOrders.map(function(openOrder){
                return exchange.cancelOrder(openOrder);
            });

            return Promise.all(promises);
        })
        .then(function(){
            return exchange.getPorfolio();
        })
        .then(function(portfolio){
            return portfolio[exchange.getCurrencyName()] / price;
        })
        .then(function(amount){

            if(action === 'buy'){
                exchange.buy(amount, price);
            }
            else if(action === 'sell'){
                exchange.sell();
            }
        });
    };
};
