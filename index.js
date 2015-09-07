'use strict';
module.exports = function (exchange) {


    return function(action){

        if(action === 'buy'){
            exchange.buy();
        }
        else if(action === 'sell'){
            exchange.sell();
        }


        
    };
};
