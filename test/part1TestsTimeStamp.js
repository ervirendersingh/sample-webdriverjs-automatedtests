var assert = require('assert');
import customjsonvalidator from './../src/validatejson/customjsonvalidator'

describe('Part1 Tests2 - submitTimestamp verification ', function() {

  let validator
  beforeEach(function () {
    validator = new customjsonvalidator()
    validator.readJsonFile()
  })


    it('The date value in submitTimestamp should be no ealier than one year ago', function(){
      let verfRes = validator.verifyDateisnotEarlierthanyear(1)
      assert.equal(true, verfRes);
    })
});
