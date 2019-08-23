const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const validate = async (props) => {
  try {
    if(!props.title || !props.provider || !props.gender || !props.minimumAtStorage) {
      return {status: 'warning', message: 'Preencha todos os campos.'}
    }
    else if(props.title=== null || props.provider === null || props.gender === null || props.minimumAtStorage === null) {
      return {status: 'warning', message: 'Preencha todos os campos.'}
    }
    else if (props.title === '' || props.provider === '' || props.gender === '' || props.minimumAtStorage === '') {
      return {status: 'warning', message: 'Preencha todos os campos.'}
    }
    else {
      const response = await Category.findOne({ title: props.title });
        if (response === null) return { status: 'success', message: 'Categoria cadastrada'}
        else if(response.title !== undefined && response.title !== null) {
          return { status: 'warning', message: 'Categoria já cadastrada.' };
        } else {
          return { status: 'success', message: 'Categoria cadastrada.' };
        }
    }
  } catch (error) {
    console.log(error);
    return { status: 'error', message: 'Ops, algo deu errado.' }
  }
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
    try {
      const { title, provider, gender, atStorage, minimumAtStorage } = req.body;
      const validation = await validate({ title, provider, gender, minimumAtStorage });
      await console.log(validation)
      if(validation.status === 'success') {
        await Category.create(req.body);
        return res.json(validation);
      } else return res.json(validation);
    } catch(error) {
      return res.json({status: 'error', message:'Ops, parece que algo deu errado!'})
    }
  },

  async update(req, res) {
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
