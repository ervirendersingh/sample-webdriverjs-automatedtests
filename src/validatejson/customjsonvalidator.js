
var fs = require('fs');
const axios = require('axios');
const config = require('./../../config/appConfig');

var jsonColldata;
var citiesData;
export default class customjsonvalidator {

    readJsonFile(){
        jsonColldata = JSON.parse(fs.readFileSync(config.filepathToValidate, 'utf8'));
    }

    validateProofTypeAttributeValueAs () {
          for(var ctr1 = 0; ctr1 < jsonColldata.length; ctr1++) {
              var found = false
              for (var k = 0; k < arguments.length; k++) {
                  if (arguments[k] === jsonColldata[ctr1].proofType) {
                     found = true
                  }
              }

              if (!found){
                console.log('Test Case Failure Reason: { Record Number - ' + ctr1 + ' has attribute value as - ' + jsonColldata[ctr1].proofType  + ' }')
                return false
              }

          }
          return true
    }

    verifyDateisnotEarlierthanyear(yr) {
          for(var ctr2 = 0; ctr2 < jsonColldata.length; ctr2++) {
                var dtJsonRow = jsonColldata[ctr2].submitTimestamp.$date
                var compareDate = new Date(new Date(new Date().setFullYear(new Date().getFullYear() - yr)))
                if(dtJsonRow < compareDate){
                  console.log('Test Case Failure Reason: { Record Number - ' + ctr2 + ' has TimeStamp value as - ' + jsonColldata[ctr2].submitTimestamp.$date  + ' }')
                  return false
                }
          }
          return true
    }

    async validateCitiesData() {
        for(var ctr3 = 0; ctr3 < jsonColldata.length; ctr3++) {
            try {
              const response = await axios.get('http://services.groupkt.com/country/get/iso3code/' + jsonColldata[ctr3].Country);
              let msg = response.data.RestResponse.messages[0];
              if(!(msg.indexOf("Country found matching code") > -1)){
                console.log('Test Case Failure Reason: { Record Number - ' + ctr3 + ' has Country value as - ' + jsonColldata[ctr3].Country + '  and the response message is ' + msg + '}')
                return false;
              }

            } catch (error) {
              console.error(error);
              return false
            }
        }
        return true
    }
}
