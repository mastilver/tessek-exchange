'use strict';

require('should');
var sinon = require('sinon');

var Promise = require('promise');

var exchangeHandler = require('../index');

describe('when sending sell', function(){

    var exchange;

    before(function(done){
        exchange = {
            sell: sinon.spy(),
            getFee: sinon.stub().returns(0),
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 55,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        exchangeHandler(exchange)('sell', 100)
        .nodeify(done);
    });

    it('should sell', function(){
        sinon.assert.calledOnce(exchange.sell);
    });

    it('should buy with the correct value', function(){
        sinon.assert.calledWith(exchange.sell, 1, 100);
    });
});

describe('when sending sell with fee', function(){

    var exchange;

    before(function(done){
        exchange = {
            sell: sinon.spy(),
            getFee: sinon.stub().returns(5),
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 55,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        exchangeHandler(exchange)('sell', 100)
        .nodeify(done);
    });

    it('should sell', function(){
        sinon.assert.calledOnce(exchange.sell);
    });

    it('should buy with the correct arguments', function(){
        sinon.assert.calledWith(exchange.sell, 0.95, 100);
    });

    it('should call getFee once', function(){
        sinon.assert.calledOnce(exchange.getFee);
    });

    it('should call getFee with the correct arguments', function(){
        sinon.assert.calledWith(exchange.getFee, 1);
    });
});
