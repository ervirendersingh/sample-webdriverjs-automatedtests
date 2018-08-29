var assert = require('assert');
import customjsonvalidator from './../src/validatejson/customjsonvalidator'

describe('Part1 Tests1 - proofType attribute', function() {

  let validator
  beforeEach(function () {
    validator = new customjsonvalidator()
    validator.readJsonFile()
  })


    it('The case sensitive value of the proofType attribute should be “full” or “incremental.”', function(){
      let compRes = validator.validateProofTypeAttributeValueAs('full','incremental')
      assert.equal(true, compRes);
    })

});
