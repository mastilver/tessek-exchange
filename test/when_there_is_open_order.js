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
            getOpenOrders: sinon.stub().returns(Promise.resolve(['orderId'])),
            cancelOrder: sinon.spy(),
        };

        exchangeHandler(exchange)('buy')
        .then(done);
    });

    it('should call getOpenOrders', function(){
        exchange.getOpenOrders.called.should.be.true(1);
    });

    it('should call cancelOrder with the correct parameters', function(){
        exchange.cancelOrder.calledWith('orderId').should.be.true();
    });
});
