export const authorizationRequired = (req, res, next) => {
    const session = req.session;

    if (!session.cookie || !session.isAuthenticated) {  // If there's no session
        return res.status(401).json({
            error: 'User needs to be logged in to access content.',
            message: 'Access restricted. Please log in.'
        })
    }

    next();
}