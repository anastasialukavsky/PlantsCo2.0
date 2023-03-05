// process.env.NODE_ENV = 'dev';

const sequelize = require('sequelize');
const { User, Order, Order_Detail, Promo_Code } = require('../server/DB');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server/server');

chai.use(chaiHttp);

let testUser = {
  firstName: 'Joellyn',
  lastName: 'Moreno',
  email: 'jmoreno2@baidu.com',
  password: 'LVuVthfVZDX',
};

let testPromoCode = {
  code: 'testcode',
  discountRate: 0.2,
};

describe('Order Routes', () => {
  let user;
  let adminToken;
  let userToken;
  let promoCode;
  let order;

  before(async () => {

    //creating testAdmin and token
    await User.destroy({ where: { email: 'anyother@gmail.com' } });
    const testAdmin = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'anyother@gmail.com',
      password: 'password',
      isAdmin: true,
    });

    let res = await chai
      .request(server)
      .post('/api/auth/login')
      .send({ email: 'anyother@gmail.com', password: 'password' });
    adminToken = res.body.token;

    // //creating testUser and token
    await User.destroy({ where: { email: 'jmoreno2@baidu.com' } });
    user = await User.create(testUser);
    user.password = testUser.password;

    const resToken = await chai
      .request(server)
      .post('/api/auth/login')
      .send(testUser);
    userToken = resToken.body.token;
  });

  //test GET /api/orders
  describe('GET /api/orders', () => {
    it('should return all orders if user is admin', async () => {
      const res = await chai
        .request(server)
        .get('/api/orders')
        .set('Authorization', adminToken)
        .send();
      res.should.have.status(200);
      res.body.should.be.an('array');
      res.body[0].should.have.property('finalPrice');
    });

    it('should return a 403 if user is not an admin', async () => {
      const res = await chai
        .request(server)
        .get('/api/orders')
        .set('Authorization', userToken)
        .send();
      res.should.have.status(403);
    });

    it('should return a 403 is user is not authenticated', async () => {
      const res = await chai.request(server).get('/api/orders').send();
      res.should.have.status(403);
    });

    //test POST /api/orders
    describe('POST /api/orders', () => {
      before(async () => {
        await Promo_Code.destroy({ truncate: true, cascade: true });
      });

      it('creates a new order', async () => {
        let userId = 1;
        let promoCode = await Promo_Code.create({
          name: 'test',
          discountRate: 0.2,
          status: 'true',
        });

        let orderDetail = [
          {
            userName: 'Spenser Cactus',
            userEmail: 'scactus@gmail.com',
            address: '123 Memory Lane, NY, USA',
            productId: 1,
            paymentMethod: 'credit card',
            productName: 'Test Product',
            qty: 2,
            basePrice: '15.00',
            currencyRate: '1.0000',
          },
          {
            userName: 'Rubin Succulent',
            userEmail: 'ssucculents@gmail.com',
            address: '123 Grand st, NY, USA',
            productId: 2,
            paymentMethod: 'paypal',
            productName: 'Another Test Product',
            qty: 1,
            basePrice: '150.00',
            currencyRate: '1.0000',
          },
        ];

        const res = await chai
          .request(server)
          .post('/api/orders')
          .send({ userId, promoCodeId: promoCode.id, orderDetail });

        //test order props
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('promoRate').which.is.equal('0.20');
        res.body.should.have.property('finalPrice').which.is.equal('144.00');
        res.body.should.have.property('totalQty').which.is.a('number');
        res.body.should.have.property('userId').which.is.equal(1);

        res.body.order_details.should.be
          .an('array')
          .and.have.lengthOf(orderDetail.length);

        //test orderDetails props
        for (let i = 0; i < orderDetail.length; i++) {
          const orderDetailLine = orderDetail[i];
          const resOrderDetail = res.body.order_details[i];

          resOrderDetail.should.have
            .property('userName')
            .which.is.equal(orderDetailLine.userName);
          resOrderDetail.should.have
            .property('userEmail')
            .which.is.equal(orderDetailLine.userEmail);
          resOrderDetail.should.have
            .property('address')
            .which.is.equal(orderDetailLine.address);
          resOrderDetail.should.have
            .property('productId')
            .which.is.equal(orderDetailLine.productId);
          resOrderDetail.should.have
            .property('paymentMethod')
            .which.is.equal(orderDetailLine.paymentMethod);
          resOrderDetail.should.have
            .property('productName')
            .which.is.equal(orderDetailLine.productName);
          resOrderDetail.should.have
            .property('qty')
            .which.is.equal(orderDetailLine.qty);
          resOrderDetail.should.have
            .property('basePrice')
            .which.is.equal(orderDetailLine.basePrice);
          resOrderDetail.should.have
            .property('currencyRate')
            .which.is.equal(orderDetailLine.currencyRate);
        }
      });
    });

    // test DELETE /api/orders/:id
    describe('DELETE /api/orders/:id', () => {
      it('should delete an order by its ID', async () => {
        const order = await Order.create({
          promoRate: 0.1,
          finalPrice: 10.0,
          totalQty: 1,
          userId: 3,
        });

        const id = order.id;
        const res = await chai
          .request(server)
          .delete(`/api/orders/${id}`)
          .set('Authorization', adminToken);

        res.should.have.status(204);

        const deletedOrder = await Order.findByPk(id);

        should.not.exist(deletedOrder);
      });

      it('should return 404 if order with given ID does not exist', async () => {
        const res = await chai
          .request(server)
          .delete(`/api/orders/10000000`)
          .set('Authorization', adminToken)
          .send();

        res.should.have.status(404);
      });

      it('should return a 403 if user is not an admin', async () => {
        const order = await Order.create({
          promoRate: 0.1,
          finalPrice: 10.0,
          totalQty: 1,
          userId: 3,
        });

        const res = await chai
          .request(server)
          .get('/api/orders')
          .set('Authorization', userToken)
          .send();

        res.should.have.status(403);
      });
    });
  });
});
