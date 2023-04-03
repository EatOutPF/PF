const admin = require("./firebaseConfig");

  async function decode(token) {
    
    try {
      const decodeToken = await admin.auth().verifyIdToken(token);
      
      if (decodeToken) {
        return decodeToken.email
      }
      throw new Error('')
    } catch (err) {
      throw new Error('')
    }
  }


module.exports = decode;
