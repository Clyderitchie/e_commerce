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
}); // done 

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    )
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}); // done

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
