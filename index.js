'use strict';

var Promise = require('promise');


module.exports = function (exchange) {


    return function(action, price){
        return Promise.resolve({
            action: action,
            price: price,
        })
        .then(handleOpenOrders)
        .then(getPorfolio)
        .then(getAssetAmount)
        .then(processAction);
    };

    function handleOpenOrders(data) {
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
    }

    function getPorfolio(data){
        return exchange.getPorfolio()
            .then(function(portfolio){
                data.portfolio = portfolio;
                return data;
            });
    }

    function getAssetAmount(data){

        var assetAmount;

        if(data.action === 'buy'){
            assetAmount = data.portfolio[exchange.getCurrencyName()] / data.price;
        }
        else if(data.action === 'sell'){
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
    }

    function processAction(data) {

        if(data.action !== 'buy' && data.action !== 'sell'){
            return data;
        }

        return exchange[data.action](data.assetAmount, data.price)
            .then(function(){
                return data;
            });
    }
};
