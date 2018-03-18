const User = require('../models/').User;

async function createAdmin() {
  try {
    const defaults = {
      email: 'stepan.shvets1996@gmail.com',
      name: 'Stepan',
      password: 'stepan.shvets1996@gmail.com',
      isAdmin: true,
    };
    await User.findOrCreate({ where: { email: 'stepan.shvets1996@gmail.com' }, defaults });
  } catch (e) {
    console.error(e);
    process.exit(0);
  }

}

setTimeout(createAdmin, 1000);