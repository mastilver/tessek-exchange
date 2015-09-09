'use strict';

require('should');
var sinon = require('sinon');

var Promise = require('promise');

var exchangeHandler = require('../index');

describe('when sending buy', function(){

    var exchange;

    before(function(done){
        exchange = {
            buy: sinon.spy(),
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 55,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        exchangeHandler(exchange)('buy', 100)
        .then(done);
    });

    it('should buy once', function(){
        sinon.assert.calledOnce(exchange.buy);
    });

    it('should buy with the correct value', function(){
        sinon.assert.calledWith(exchange.buy, 55 / 100, 100);
    });
});
