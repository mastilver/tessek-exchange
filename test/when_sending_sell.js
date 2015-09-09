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
            getOpenOrders: sinon.stub().returns(Promise.resolve([])),
            getPorfolio: sinon.stub().returns(Promise.resolve({
                usd: 55,
                btc: 1
            })),
            getCurrencyName: sinon.stub().returns('usd'),
            getAssetName: sinon.stub().returns('btc'),
        };

        exchangeHandler(exchange)('sell', 100)
        .then(done);
    });

    it('should sell', function(){
        sinon.assert.calledOnce(exchange.sell);
    });

    it('should buy with the correct value', function(){
        sinon.assert.calledWith(exchange.sell, 1, 100);
    });
});
