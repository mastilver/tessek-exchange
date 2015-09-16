'use strict';

var Promise = require('promise');


module.exports = function (exchange) {


    return function(action, price){

        return Promise.resolve({
            action: action,
            price: price,
        })
        .then(function(data) {
            return Promise.resolve(exchange.getOpenOrders())
                .then(function(openOrders){
                    var promises = openOrders.map(function(openOrder){
                        return exchange.cancelOrder(openOrder);
                    });

                    return Promise.all(promises);
                })
                .then(function(){
                    return data;
                });
        })
        .then(function(data){
            return exchange.getPorfolio()
                .then(function(portfolio){
                    data.portfolio = portfolio;
                    return data;
                });
        })
        .then(function(data){

            var assetAmount;

            if(action === 'buy'){
                assetAmount = data.portfolio[exchange.getCurrencyName()] / data.price;
            }
            else if(action === 'sell'){
                assetAmount = data.portfolio[exchange.getAssetName()];
            }

            return Promise.resolve(exchange.getFee(assetAmount))
                .then(function(fee){
                    data.fee = fee;
                    return assetAmount * (1 - (fee / 100));
                })
                .then(function(assetAmount){
                    data.assetAmount = assetAmount;
                    return data;
                });
        })
        .then(function (data) {

            if(data.action !== 'buy' && data.action !== 'sell'){
                return data;
            }

            return exchange[data.action](data.assetAmount, data.price)
                .then(function(){
                    return data;
                });
        });
    };
};
