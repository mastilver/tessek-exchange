require('should');
var sinon = require('sinon');

var exchangeHandler = require('../index');

describe('when sending hold', function(){

    it('should not do anything', function(){

        var exchange = {
            buy: sinon.spy(),
            sell: sinon.spy(),
            getOpenOrders: null,
            cancelOrder: null,
            getPortfolio: null,
        };

        exchangeHandler(exchange)('hold');

        exchange.buy.called.should.not.be.ok();
        exchange.sell.called.should.not.be.ok();
    });
});
