const chai = require('chai');
const {expect, assert} = require('chai');
const chaiHttp = require('chai-http');
const mongoose  = require('mongoose');
const { faker } = require('@faker-js/faker');

const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('/user ', () => {

    it('/signup - should crete new user if email not found', (done) => {
        let user = {
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "name":faker.internet.userName()
        }
        chai.request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200)
            expect(body).to.contain.property('message');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/signup - should return 403 if email was found', () => {
        let user = {
            "email": 'harshgoti@goti.com',
            "password": 'harshgoti',
            "name":'harshgoti'
        }
        chai.request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            expect(res.error.status).to.equal(403);
            expect(res.error.response.text).to.equal('{"error":"Mail exists"}');
            done();
        })
        .catch((err) => {
            done(err)
        });
        
      });

    it('/signup - check requires fields', (done) => {
        const user = {
            "email": '',
            "password": "test",
            "name":"test user"
        }
        chai.request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(400)
            expect(body).to.contain.property('error');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/signin - check authentication', (done) => {
        const user = {
            "email": "harshgoti@goti.com",
            "password":"harshgoti"
        }
        chai.request(app).post('/user/signin')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200)
            expect(body).to.contain.property('message');
            expect(body).to.contain.property('token');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/signin - check requires fields', (done) => {
        const user = {
            "email": "harshgoti@goti.com",
            "password":""
        }
        chai.request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(400)
            expect(body).to.contain.property('error');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });
    
});