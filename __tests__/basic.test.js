'use strict';

const basic = require('../src/auth/middleware/basic.js');
let res = {};
let next = jest.fn();
let consoleSpy;

describe('basic auth ', () => {
    
    
  beforeEach(()=>{
    consoleSpy = jest.spyOn(console,'log');

  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    basic(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
  it('should respond properly', () => {
    let req = { headers: { authorization: 'Basic sdkjdsljd=' } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});