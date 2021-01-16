var express = require('express');
var request = require('request');
var assert = require('assert');
var domain = require('domain');

var middleware = require('../')

var port = 60000;
var url = 'http://localhost:' + port;

describe('express testing',function(){
    var server;
    before(function(done){
        var app = new express();

        app.get('/',function(req,res,next){
            res.send('works!');
        })

        app.get('/error/sync',function(req,res,next){
            throw new Error('sync error');
        })

        app.get('/error/async',middleware.Handler(),function(req,res,next){
            setTimeout(function(){
                throw new Error('async error');
            },500)
        })


        app.get('/error/catched',middleware.Handler(),function(req,res,next){
            setTimeout(function(){
                try{
                    throw new Error('catched error');
                }catch (error){
                    next(new Error('catched: ' + error.message))
                }
            },500)
        })


        app.use(function(err,req,res,next){
            res.status(400).send(err.message);
        })

        server = app.listen(port,done)
    })
    after(function(){
        server.close()
    })

    it('should receive response from app',function(done){
        request.get(url,function(error,response,data){
            assert.equal(response.statusCode,200);
            assert.equal(data,'works!');
            done();
        })
    })

    it('should catch sync error without middleware',function(done){
        request.get(url + '/error/sync',function(error,response,data){
            assert.equal(response.statusCode,400);
            assert.equal(data,'sync error');
            done();
        })
    })

    it('should catch async error with middleware as well',function(done){
        request.get(url + '/error/async',function(error,response,data){
            assert.equal(response.statusCode,400);
            assert.equal(data,'async error');
            done();
        })
    })


    it('should support normal error catching',function(done){
        request.get(url + '/error/catched',function(error,response,data){
            assert.equal(response.statusCode,400);
            assert.equal(data,'catched: catched error');
            done();
        })
    })

})