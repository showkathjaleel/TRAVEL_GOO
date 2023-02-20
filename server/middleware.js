
const jwt = require('jsonwebtoken')

module.exports = {

  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  //       const refreshToken = jwt.sign({
  //         username: userCredentials.username,
  //     }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  //     // Assigning refresh token in http-only cookie
  //     res.cookie('jwt', refreshToken, { httpOnly: true,
  //         sameSite: 'None', secure: true,
  //         maxAge: 24 * 60 * 60 * 1000 });
  //     return res.json({ accessToken });
  // }
  // else {
  //     // Return unauthorized error if credentials don't match
  //     return res.status(406).json({
  //         message: 'Invalid credentials' });
  // }
  // })

}
