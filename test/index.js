const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API', () => {

    it('Check Status - GET /', (done) => {

        chai.request(app).get('/')
        .end((err, res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.ok).to.be.an('boolean');
            expect(res.body.ok).to.be.equal(true);
            done();
            
        });

    });

    it('Check Response - POST /', (done) => {

        chai.request(app).post('/')
        .send({ text: "teste" })
        .end((err, res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.ok).to.be.an("string");
            expect(res.body.ok).to.be.equal("teste");
            done();

        });

    });

});