'use strict';

require('should');
var sinon = require('sinon');

var Promise = require('pinkie-promise');

var exchangeHandler = require('../index');

describe('when sending hold', function(){

    var exchange;

    before(function(){
        exchange = {
            buy: sinon.spy(),
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

        return exchangeHandler(exchange)('hold');
    });

    it('should not buy', function(){
        exchange.buy.called.should.not.be.ok();
    });

    it('should not sell', function(){
        exchange.sell.called.should.not.be.ok();
    });
});
