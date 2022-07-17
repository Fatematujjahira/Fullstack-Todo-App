/* dependencies */
const bcrypt = require('bcrypt')

/* password hash function */
async function hashStr(password) {
  try {
    return await bcrypt.hash(password, 6)
  } catch (error) {
    throw error
  }
}

module.exports = hashStr