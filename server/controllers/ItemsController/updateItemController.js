const updateitemService = require('../../services/createItemsServices/updateItem.js');

const updateItemController = async (req, res) => {
    try {
        const userId = req.decoded.id;
        const { itemId } = req.params;
        const updateData = req.body;

        if (req.file && req.file.path) {
            updateData.itemImage = req.file.path;
        }

        const updatedItem = await updateitemService(userId, itemId, updateData );
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (err) {
        res.status(500).json({ Error: err.message || 'Internal Server Error' });
    }
};

module.exports = { updateItemController };
