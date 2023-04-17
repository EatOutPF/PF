const admin = require("./firebaseConfig");

  async function decode(token) {
    
    try {
      const decodeToken = await admin.auth().verifyIdToken(token);
      console.log(decodeToken);
      if (decodeToken) {
        return decodeToken.email
      }
      throw new Error('TOKEN no recibido')
    } catch (err) {
      throw new Error(err.message)
    }
  }


module.exports = decode;




