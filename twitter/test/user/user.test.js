const chai = require('chai');
const {expect, assert} = require('chai');
const chaiHttp = require('chai-http');
const mongoose  = require('mongoose');
const request = require('supertest');


const app = require('../../app');
const { JWT_SECRET,bcrypt_hash,mongoose_url } = require('../../config/secret.json');

chai.should();
chai.use(chaiHttp);

describe('/user ', () => {

    it('/signup - should crete new user', (done) => {
        const user = {
            "email": 'test@test.com',
            "password": "test",
            "name":"test user"
        }
        request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(201)
            expect(body).to.contain.property('message');
            done();
        })
        .catch((err) => {
            done()
        });
    });

    it('/signup - check requires fields', (done) => {
        const user = {
            "email": '',
            "password": "test",
            "name":"test user"
        }
        request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(400)
            expect(body).to.contain.property('error');
            done();
        })
        .catch((err) => {
            done()
        });
    });

    it('/signin - check authentication', (done) => {
        const user = {
            "email": "harshgoti@goti.com",
            "password":"harshgoti"
        }
        request(app).post('/user/signin')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200)
            expect(body).to.contain.property('message');
            expect(body).to.contain.property('token');
            done();
        })
        .catch((err) => {
            done()
        });
    });

    it('/signin - check requires fields', (done) => {
        const user = {
            "email": "harshgoti@goti.com",
            "password":""
        }
        request(app).post('/user/signup')
        .send(user)
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(400)
            expect(body).to.contain.property('error');
            done();
        })
        .catch((err) => {
            done()
        });
    });
    
});