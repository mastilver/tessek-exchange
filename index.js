'use strict';

var Promise = require('promise');


module.exports = function (exchange) {


    return function(action, price){

        return Promise.resolve(exchange.getOpenOrders())
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

            if(action === 'buy'){
                return portfolio[exchange.getCurrencyName()] / price;
            }
            else if(action === 'sell'){
                return portfolio[exchange.getAssetName()];
            }
        })
        .then(function(assetAmount){
            return Promise.resolve(exchange.getFee(assetAmount))
                .then(function(fee){
                    return assetAmount * (1 - (fee / 100));
                });
        })
        .then(function (assetAmount) {
            if(action === 'buy'){
                return exchange.buy(assetAmount, price);
            }
            else if(action === 'sell'){
                return exchange.sell(assetAmount, price);
            }
        });
    };
};
