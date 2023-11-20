const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
} catch (err) {
    res.status(500).json(err.message);
}
});

router.get('/:id', async(req, res) => {
  try {
   const tag = await Tag.findByPk(req.params.id, {
    include: {
      model: Product,
      trough: ProductTag
    }
   })
    res.status(200).json(tag);
} catch (err) {
    res.status(500).json(err.message);
}
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err.message);
  }
}); // done

module.exports = router;
