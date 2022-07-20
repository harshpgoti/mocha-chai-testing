const chai = require('chai');
const {expect, assert} = require('chai');
const chaiHttp = require('chai-http');
const mongoose  = require('mongoose');

const app = require('../app');
chai.should();
chai.use(chaiHttp);

describe('/tweetOps ', () => {
    let token = null, tweetid = null;
    it('check authentication and get token', (done) => {
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
            token = body.token;
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/allTweet - get all tweets', (done) => {
        
        chai.request(app).get('/twitterOps/allTweet')
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200);
            expect(body).to.contain.property('tweet');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/allUserTweet - get particular user tweet if authentication true', (done) => {
        
        chai.request(app).get('/twitterOps/allUserTweet')
        .set({ "Authorization": `Bearer ${token}` })
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200)
            expect(body).to.contain.property('tweet');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('authentication failed check', (done) => {
        
        chai.request(app).get('/twitterOps/allUserTweet')
        .set({ "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoZ290aUBnb3RpLmNvbSIsInVzZXJJ' })
        .then((res)=>{
            const body = res.body;
            expect(res.error.status).to.equal(401)
            expect(body).to.contain.property('error');
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/addTweet - add new tweet if authentication true', (done) => {
        
        chai.request(app).post('/twitterOps/addTweet')
        .set({ "Authorization": `Bearer ${token}` })
        .send({ "content":"test tweet" })
        .then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(200)
            expect(body).to.contain.property('message');
            tweetid = body.id
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

    it('/updateTweet - update test tweet if authentication true', (done) => {
        
        chai.request(app).put(`/twitterOps/updateTweet/${tweetid}`)
        .set({ "Authorization": `Bearer ${token}` })
        .send({ "content":"updated test tweet" })
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

    it('/deleteTweet - delete test tweet if authentication true', (done) => {
        
        chai.request(app).delete(`/twitterOps/deleteTweet/${tweetid}`)
        .set({ "Authorization": `Bearer ${token}` })
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

});