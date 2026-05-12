jest.mock("../models/investorModel");

const { findInvestor } = require("../models/investorModel");
const { getInvestor } = require("../controllers/investorController");

describe("getInvestor", () => {

  test("Returns investor if exists", () => {
    const mockInvestor = { mobile: "123", name: "ak" };

    findInvestor.mockReturnValue(mockInvestor);

    const req = {
      params: { mobile: "123" }
    };

    const res = {
      send: jest.fn()
    };

    const next = jest.fn();

    getInvestor(req, res, next);

    expect(findInvestor).toHaveBeenCalledWith("123");
    expect(res.send).toHaveBeenCalledWith(mockInvestor);
    expect(next).not.toHaveBeenCalled();
  });

});