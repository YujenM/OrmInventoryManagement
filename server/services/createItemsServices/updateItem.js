const { Op } = require('sequelize');
const { Item, User, Role } = require('../../models');

const updateItemService = async (userId, itemId, updateData) => {
    console.log("Extracted Item ID:", itemId);
    console.log("Extracted User ID:", userId);
    console.log(updateData)

    const item = await Item.findByPk(itemId);
    
    if (!item) throw new Error("Item not found");

    const user = await User.findByPk(userId, {
        include: {
            model: Role,
            where: { name: { [Op.in]: ['admin', 'superadmin'] } },
            through: 'userRole',
            attributes: ['name']
        }
    });

    if (!user) throw new Error("User not found");

    const roles = user.Roles.map(role => role.name);
    
    if (roles.includes('superadmin') || (roles.includes('admin') && item.userId === userId)) {
        await item.update(updateData);
        return item;
    }

    throw new Error("Unauthorized: You don't have permission to update this item");
};

module.exports = updateItemService;
