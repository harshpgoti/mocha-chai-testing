tracking-system - Ready to use API

After Clone repository:
1. Install Node.js dependencies $ npm install
2. run $ nodemon

URL:  http://localhost:3000/

APIs:
2. User login (Including session maintenance using any means you’re comfortable with)
http://localhost:3000/user/signin

In this API send login credential in body.
It will return token.

3. add Balance:
http://localhost:3000/wallet/addBalance

In this API send token in header, also send amount in body

4. buy Stock:
http://localhost:3000/wallet/buyStock

In this API send token in header, also send stock symbol Name(apple inc. - AAPL), number Of Stock in body

5. sell Stock:
http://localhost:3000/wallet/sellStock

In this API send token in header, also send stock symbol Name(apple inc. - AAPL), number Of Stock in body

6. view Portfolio:
http://localhost:3000/userPortfolio

In this API send token in header
