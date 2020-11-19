const XMLParser = require("../src/lib//utils/XMLParser");
var assert = require("assert");

describe("Parser", function () {
  describe("Get a simple object", function () {
    it("return a nice object", function (done) {
      var xml =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        "<root>" +
        '<child foo="bar">' +
        '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
        "</child>" +
        "<sibling>with content!</sibling>" +
        "</root>";
      //Arrange
      let parsed = XMLParser.ParseXMLString(xml);

      assert.notDeepStrictEqual(parsed, undefined);
      done();
    });
  });
});
