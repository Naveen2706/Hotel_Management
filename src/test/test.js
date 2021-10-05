const assert = require('chai').assert;
const Utility = require('D:/Custom_Assignments/HotelManagement/src/utility/Utility.js');
const util = new Utility();

describe('Unit Test', function () {
    describe('generateKey()', function () {
        it('valid key must be returned by function', function () {
            let key = util.generateKey('Naveen','9876543210');
            assert.equal(key, 'Nave9876');
        });

        it('generateKey should return string type', function () {
            let key = util.generateKey('Naveen', '9876543210');
            assert.typeOf(key, 'string');
        });
    });

    describe('generateBill()',function () {
        it('bill of orders must be returned',function () {
            let bill = util.generateBill();
            assert.equal(bill,20);
        });

        it('bill of orders must be returned',function () {
            let bill = util.generateBill();
            assert.equal(bill,'20');
        });
    });
});




