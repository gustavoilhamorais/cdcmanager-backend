const mongoose = require("mongoose");
const Merchandise = mongoose.model("Merchandise");
const Category = mongoose.model("Category");

const validate = (category) => (buyValue) => (sellValue) => (code) => {
  if(!category || !buyValue || !sellValue || !code) {
    return {status: 400, message: 'Preencha todos os campos.'};
  }

  else if(category === null || buyValue === null || sellValue === null || code === null) {
    return {status: 400, message: 'Preencha todos os campos.'};
  }

  else if (category === '' || buyValue === '' || sellValue === '' || code === '') {
    return {status: 400, message: 'Preencha todos os campos.'};
  }
  
  else if (category === undefined || buyValue === undefined || sellValue === undefined || code === undefined) {
    return {status: 400, message: 'Preencha todos os campos.'};
  }

  else if(category) {
    Category.findOne({ title: category })
      .then(res => {
        if(res.title !== category) {
          return {status: 404, message: 'Categoria não existe.'}
        };
      }).catch(error => {return 500});
  
  } else {
    const response = Merchandise.findOne({ category: category });
    if(response) { 
      if(response.code === code) {
        return {status: 226, message: 'Mercadoria já cadastrada.'};
      } else return {status: 200, message: 'Mercadoria válida.'};
    } else return {status: 200, message: 'Mercadoria válida.'};
  };
};

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    try {
      const merchandise = await Merchandise.paginate({}, { page, limit: 10 });

      return res.json(merchandise)

    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const merchandise = await Merchandise.findOne({ _id: req.params.id });

      return res.json(merchandise)

    } catch { return res.send() }
  },

  async store(req, res) {
    const { category, sellValue, buyValue, code } = req.body;
    try {
      const validation = await validate(category)(sellValue)(buyValue)(code);
      if (validation.status === 200) {
        await Merchandise.create(req.body);
        const category = await Category.findOne({ title: category });

        category.atStorage++;
        category.save()
          .then(() => { return res.json({status: 200, message:"Categoria aprimorada."}) })
          .catch(error => { return res.json({status: 500, message: error}) });

      } else return res.json(validation);

    } catch(err) {
      return res.json(err)
    }
  },

  async update(req, res) {
    try {
      const merchandise = await Merchandise.findOneAndUpdate(req.params.id, req.body, { new: true });

      return res.json(merchandise)

    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Merchandise.findByIdAndDelete(req.params.id);

      return res.send()

    } catch { res.send() }
  }
};
