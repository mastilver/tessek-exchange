require('should');
var sinon = require('sinon');

var Promise = require('promise');

var exchangeHandler = require('../index');

describe('when there is open order', function(){

    var exchange;

    before(function(done){
        exchange = {
            buy: sinon.spy(),
            sell: sinon.spy(),
            getOpenOrders: sinon.stub().returns(Promise.resolve(['orderId1', 'orderId2'])),
            cancelOrder: sinon.spy(),
        };

        exchangeHandler(exchange)('buy')
        .then(done);
    });

    it('should get open orders', function(){
        exchange.getOpenOrders.called.should.be.true(1);
    });

    it('should cancel the first order', function(){
        exchange.cancelOrder.calledWith('orderId1').should.be.true();
    });

    it('should cancel the second order', function(){
        exchange.cancelOrder.calledWith('orderId2').should.be.true();
    });
});
