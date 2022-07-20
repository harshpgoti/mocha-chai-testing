twitter - Ready to use API

After Clone repository:
1. Install Node.js dependencies $ npm install
2. run $ nodemon

URL:  http://localhost:3000/
APIs:
1. User registration using unique username and a password:
http://localhost:3000/user/signup

2. User login (Including session maintenance using any means you’re comfortable with)
http://localhost:3000/user/signin

In this API send login credential in body

3. Create tweet:
http://localhost:3000/twitterOps/addtweet

In this API send token in header, also send content in body

4. read tweet:
http://localhost:3000/twitterOps/alltweet

In this API send token in header

5. read user's tweet:
http://localhost:3000/twitterOps/allUsertweet

6. update tweet:
http://localhost:3000/twitterOps/updateTweet/:tweetid

In this API send token in header, also send updating content in body

7. delete tweet:
http://localhost:3000/twitterOps/deletetweet/:tweetid

In this API send token in header


Unit tests command:
npm run test