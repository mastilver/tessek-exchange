require('should');
var sinon = require('sinon');

var exchangeHandler = require('../index');

describe('when sending buy', function(){

    it('should buy', function(){

        var exchange = {
            buy: sinon.spy()
        };

        exchangeHandler(exchange)('buy');

        exchange.buy.called.should.be.ok();
    });
});
