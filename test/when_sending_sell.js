require('should');
var sinon = require('sinon');

var exchangeHandler = require('../index');

describe('when sending sell', function(){

    it('should sell', function(){

        var exchange = {
            sell: sinon.spy()
        };

        exchangeHandler(exchange)('sell');

        exchange.sell.called.should.be.ok();
    });
});
