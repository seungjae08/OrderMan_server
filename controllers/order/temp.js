module.exports = {
  post: async (req, res) => {

    const { itemList } = req.body

    for (let product of itemList) {
      let [newProduct, created] = await item.findOrCreate({
        where: {
          name: product.item,
          unit: product.unit
        },
        defaults: {
          name: product.item,
          unit: product.unit
        }
      })

      await user_order_item.create({
        order_id: option.id,
        item_id: newProduct.id,
        quantity: product.quantity
      })
    }

    res.status(200).end();
  },
};
