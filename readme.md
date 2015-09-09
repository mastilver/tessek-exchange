# tessek-exchange [![Build Status](https://travis-ci.org/mastilver/tessek-exchange.svg?branch=master)](https://travis-ci.org/mastilver/tessek-exchange)[![Coverage Status](https://coveralls.io/repos/mastilver/tessek-exchange/badge.svg?branch=master&service=github)](https://coveralls.io/github/mastilver/tessek-exchange?branch=master)

> exchange/forex manager


## Install

```
$ npm install --save tessek-exchange
```


## Usage

```js
var tessekExchange = require('tessek-exchange');

var exchangeHandler = tessekExchange(exchangeObject);

exchangeHandler('buy')
.then(function(){
    // buy order made
});

```


## API

### tessekExchange(exchangeObject)(action, price)

#### exchangeObject

*Required*  
Type: `Object`

// TODO: define exchangeObject

#### action

Type: `string`  
Possible Values: `buy`, `sell`, `hold`

Which action we should perform

#### price

Type: 'float'

At which price we should buy/sell


## License

MIT © [Thomas Sileghem](https://github.com/mastilver)
