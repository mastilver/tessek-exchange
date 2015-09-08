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
            getOpenOrders: sinon.stub().returns(Promise.resolve([]))
        };

        exchangeHandler(exchange)('sell')
        .then(done);
    });

    it('should sell', function(){



        exchange.sell.called.should.be.ok();
    });
});
