const { User, Role } = require('../models');

const isAdmin = async (req, res, next) => {    
    try {
        const userId = req.decoded.id;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized: No ID found in token"
            });
        }

        const existingUser = await User.findOne({
            where: { id: userId },
            include: [{
                model: Role,
                through: 'userRole',
                attributes: ['name']
            }]
        });

        if (!existingUser) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        const roles = existingUser.Roles ? existingUser.Roles.map(role => role.name) : [];

        if (!roles.includes('admin')) {
            return res.status(403).json({
                error: "Unauthorized: User does not have admin privileges"
            });
        }

        next(); 

    } catch (err) {
        return res.status(500).json({
            error: err.message || "Internal Server Error"
        });
    }
};

module.exports = isAdmin;
