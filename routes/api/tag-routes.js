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

router.post('/', async (req, res) => {
  try {
    const newTag = await Category.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // create a new tag
}); // need to ask about return value here

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
}); // need to work on possibly need help with

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
