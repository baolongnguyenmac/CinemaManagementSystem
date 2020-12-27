# express-async-error

Expressjs handles error on try/catch basis, which is very helpful, but doesn't take care of asynchronous errors (errors in callbacks). This middleware handles those with usage of domains.

    npm install express-async-error

## Installation

All you need to do is add handler like this:

    var express = require('express');
    var errorHandler = require('express-async-error').Handler

    var app = new express()

    app.use(errorHandler([options]))

    ...

    app.listen(...)

### Arguments

- `options`:
    - ``domainPropertyName``: name of property to assign created domain (default: _domain)


See tests for complete usage example.


### TODO
 - subdomain support