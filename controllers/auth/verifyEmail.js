const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, 'Email not found');

  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationCode: '',
  });

  res.json({ message: 'Email verification success' });
};

module.exports = ctrlWrapper(verifyEmail);
