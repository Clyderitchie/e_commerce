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
}); // done

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
}); // done

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // create a new tag
}); // done

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )
    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}); // done

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
    