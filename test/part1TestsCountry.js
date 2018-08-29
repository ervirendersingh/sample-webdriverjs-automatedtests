var assert = require('assert');
import customjsonvalidator from './../src/validatejson/customjsonvalidator'

describe('Part1 Tests3 - Country verification ', function() {

  let validator
  beforeEach(function () {
    validator = new customjsonvalidator()
    validator.readJsonFile()
  })


    it('The value of the Country attribute should be a valid country code.', async function(){
      var resCountry = await validator.validateCitiesData()
      assert.equal(true, resCountry);
    })
});
