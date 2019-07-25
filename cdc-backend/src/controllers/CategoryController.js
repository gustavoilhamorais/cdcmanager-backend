const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const validate = (title) => (provider) => (gender) => (minimumAtStorage) => {
  if(!title || !provider || !gender || !minimumAtStorage) {
    return {status: 400, message: 'Preencha todos os campos.'}
  }

  else if(title=== null || provider === null || gender === null || minimumAtStorage === null) {
    return {status: 400, message: 'Preencha todos os campos.'}
  }

  else if (title === '' || provider === '' || gender === '' || minimumAtStorage === '') {
    return {status: 400, message: 'Preencha todos os campos.'}
  }

  else {
    const response = Category.findOne({ title: title });

    if(response) {
      if(response.provider === provider) {
        if(response.gender === gender) {
          code = 226; msg = 'Categoria já existe.';
        
        } else code = 200; msg = 'Categoria já existe.';

      } else code = 200; msg = 'Categoria já existe.';

    } else code = 200; msg = 'Categoria já existe.';
  
  return {status: code, message: msg}
  };
};

 module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    try {
      const category = await Category.paginate({}, { page, limit: 10 });

      return res.json({status: 200, message: 'OK', docs: category.docs})

    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const category = await Category.findById({ _id: req.params.id });

      return res.json(category)

    } catch { return res.send() }
  },

  async store(req, res) {
    const { title, provider, gender, atStorage, minimumAtStorage } = req.body;
    try {
      const validation = await validate(title)(provider)(gender)(minimumAtStorage);
      
      if(validation.status === 200) {
        const category = await Category.create(req.body);

        return res.json(validation);

      } else return res.json(validation);

    } catch(error) { return res.json({status: 500, message:'Erro interno.'}) };
  },

  async update(req, res) { // return the new version of data
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });


      return res.json(category)

    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Category.findByIdAndRemove(req.params.id);

      return res.send()

    } catch { return res.send() }
  },
};
