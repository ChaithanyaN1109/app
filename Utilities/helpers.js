const collection = require('../Model/Schema');


exports.generateAgencyId = async () => {
  const agencyId= 'AG'+new Date().getTime().toString()
  return agencyId;
};

exports.generateClientId = async () => {
const clientId= 'CL'+new Date().getTime().toString()
return clientId;
 
  
};
