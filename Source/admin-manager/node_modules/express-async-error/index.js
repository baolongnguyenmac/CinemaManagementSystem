var domain = require('domain');

module.exports.Handler = function(options){
    options = options || {};
    return function(req,res,next){
        var d = domain.create();

        req[options.domainPropertyName || '_domain'] = d;

        d.on('error',function(err){
            next(err)
        })

        d.run(function(){
            next();
        })
    }
}