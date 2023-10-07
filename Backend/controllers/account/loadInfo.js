const Users = require('../../models/Users');

const loadInfo = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(200).json({ loginStatus: false, message: 'Invalid User' });
    }

    const userInfo = {
      userID: user._id,
      fullname: user.fullname,
      email: user.email,
      points: user.points,
      active: user.active,
      message: user.message
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ loginStatus: false, message: 'Internal server error' });
  }
};

module.exports = { loadInfo };
