'use strict';

require('should');
var sinon = require('sinon');

var Promise = require('promise');

var exchangeHandler = require('../index');

describe('when sending hold', function(){

    var exchange;

    before(function(done){
        exchange = {
            buy: sinon.spy(),
            sell: sinon.spy(),
            getOpenOrders: sinon.stub().returns(Promise.resolve([]))
        };

        exchangeHandler(exchange)('hold')
        .then(done);
    });

    it('should not buy', function(){
        exchange.buy.called.should.not.be.ok();
    });

    it('should not sell', function(){
        exchange.sell.called.should.not.be.ok();
    });
});
