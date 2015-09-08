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
            getOpenOrders: sinon.stub().returns(Promise.resolve([]))
        };

        exchangeHandler(exchange)('buy')
        .then(done);
    });

    it('should buy', function(){
        exchange.buy.called.should.be.ok();
    });
});
