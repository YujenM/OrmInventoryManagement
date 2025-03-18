const { Op } = require('sequelize');
const { Item, User, Role } = require('../../models');

const deleteItems = async (itemid, userid) => {
    const existingUser = await User.findOne({
        where: { id: userid },
        include: [{
            model: Role,
            where: {
                name: { [Op.in]: ['admin', 'superAdmin'] },
            },
            through: 'userRoles',
            attributes: ['name']
        }]
    });

    if (!existingUser || !existingUser.Roles) {
        throw new Error('Unauthorized: Admin or SuperAdmin access required');
    }

    const item = await Item.findByPk(itemid);
    if (!item) {
        throw new Error('Item not found');
    }

    const isSuperadmin = existingUser.Roles.some(role => role.name === 'superAdmin');
    const isAdmin = existingUser.Roles.some(role => role.name === 'admin');
    const isOwner = existingUser.id === userid;

    if (isSuperadmin || (isAdmin && isOwner)) {
        await item.destroy();
        return {
            success: true,
            message: 'Item deleted successfully'
        };
    } else {
        throw new Error("Unauthorized: You don't have permission to delete this item");
    }
};

module.exports = deleteItems;
