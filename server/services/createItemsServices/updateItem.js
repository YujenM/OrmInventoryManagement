const { Op } = require('sequelize');

const { Item, User, Role } = require('../../models');

const updateItemService = async (userId, itemId, updateData) => {
    const item = await Item.findByPk(itemId);

    if (!item) {
        throw new Error("Item not found");
    }

    const user = await User.findByPk(userId, {
        include: {
            model: Role,
            where: {
                name: { [Op.in]: ['admin', 'superadmin'] }
            },
            through: 'userRole',
            attributes: ['name']
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isSuperadmin = user.Roles.some(role => role.name === 'superadmin');
    const isAdmin = user.Roles.some(role => role.name === 'admin');
    const isOwner = item.userId === userId;

    if (isSuperadmin || (isAdmin && isOwner)) {
        await item.update(updateData);
        return item;
    } else {
        throw new Error("Unauthorized: You don't have permission to update this item");
    }
};

module.exports = updateItemService;
