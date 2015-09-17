'use strict';

require('should');
var sinon = require('sinon');

var Promise = require('pinkie-promise');

var exchangeHandler = require('../index');

describe('when sending buy', function(){

    var exchange;

    before(function(){
        exchange = {
            buy: sinon.stub().returns(Promise.resolve()),
            getFee: sinon.stub().returns(0),
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 55,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        return exchangeHandler(exchange)('buy', 100);
    });

    it('should buy once', function(){
        sinon.assert.calledOnce(exchange.buy);
    });

    it('should buy with the correct arguments', function(){
        sinon.assert.calledWith(exchange.buy, 55 / 100, 100);
    });
});

describe('when sending buy with fee', function(){

    var exchange;

    before(function(){
        exchange = {
            buy: sinon.stub().returns(Promise.resolve()),
            getFee: sinon.stub().returns(5),
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 50,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        return exchangeHandler(exchange)('buy', 100);
    });

    it('should buy once', function(){
        sinon.assert.calledOnce(exchange.buy);
    });

    it('should buy with the correct arguments', function(){
        sinon.assert.calledWith(exchange.buy, 0.475, 100);
    });

    it('should call getFee once', function(){
        sinon.assert.calledOnce(exchange.getFee);
    });

    it('should call getFee with the correct arguments', function(){
        sinon.assert.calledWith(exchange.getFee, 0.50);
    });
});
