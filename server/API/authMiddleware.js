// takes an auth header and uses it to verify logged in user
// pull in User model
// store funcs that act as middleware b/n request and response
// call next() w/o arg to move onto next piece of middleware

// requireToken (logged in user)

// isAdmin/role (admin priv) (req.user.isAdmin / req.user.role === ...)
