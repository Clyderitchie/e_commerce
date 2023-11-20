const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
}); // done

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Product
      }
    })
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
}); // done

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
}); // need to ask one this request 

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    )

    if (updateCategory[0] === 0) {
      // If no rows were affected, return a 404 status code
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await Category.findOne({
      where: { id: req.params.id }
    });

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // update a category by its `id` value
}); // need to work on possibly need help with

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({
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
