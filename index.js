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

            var assetAmount;

            if(action === 'buy'){
                assetAmount = portfolio[exchange.getCurrencyName()] / price;
                exchange.buy(assetAmount, price);
            }
            else if(action === 'sell'){
                assetAmount = portfolio[exchange.getAssetName()];
                exchange.sell(assetAmount, price);
            }
        });
    };
};
