const mongoose = require("mongoose");
const Merchandise = mongoose.model("Merchandise");
const Category = mongoose.model("Category");

const validate = async (props) => {
  try {
    if (!props.category || !props.buyValue || !props.sellValue || !props.code) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.category === null || props.buyValue === null || props.sellValue === null || props.code === null ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.category === "" || props.buyValue === "" || props.sellValue === "" || props.code === "" ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.category === undefined || props.buyValue === undefined || props.sellValue === undefined || props.code === undefined ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else {
      const response = await Category.findOne({ title: props.category });
      if (response.title !== props.category) {
        return { status: 'warning', message: "Categoria não existe." }
      } else {
        const response = await Merchandise.findOne({ category: props.category });
        if (response !== null && response !== undefined) {
          if (response.code === props.code) {
            return { status: 'warning', message: "Mercadoria já cadastrada." };
          } else {
            return { status: 'success', message: "Mercadoria Cadastrada." };
          } 
        } else {
          return { status: 'success', message: "Mercadoria Cadastrada." };
        }
      }
    }
  } catch (error) { return { status: 'error', message: "Erro interno! Contate um administrador do sistema." } }
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const merchandise = await Merchandise.paginate({}, { page, limit: 10 });
      return res.json(merchandise);
    } catch {
      return res.send();
    }
  },

  async show(req, res) {
    try {
      const merchandise = await Merchandise.findOne({ _id: req.params.id });
      return res.json(merchandise);
    } catch {
      return res.send();
    }
  },

  async store(req, res) {
    try {
      const { category, sellValue, buyValue, code } = req.body;
      const validation = await validate({ category, sellValue, buyValue, code });
      if (validation.status === 'success') {
        await Merchandise.create(req.body);
        Category.findOne({ title: category }).then(response => {
          response.atStorage++;
          response.save();
          return res.json(validation);
        }).catch(error => {return res.json({ status: 'error',message: err })});
      } else return res.json(validation);
    } catch (err) { 
      return res.json({ status: 'error',message: err });
    }
  },

  async update(req, res) {
    try {
      const merchandise = await Merchandise.findOneAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(merchandise);
    } catch (error){ res.send(error); }
  },

  async destroy(req, res) {
    try {
      const categoryToDecrease = await Merchandise.findOne({_id: req.params.id});
      await Merchandise.findByIdAndDelete(req.params.id);
      Category.findOne({ title: categoryToDecrease.category }).then(response => {
        response.atStorage = response.atStorage - 1;
        response.save();
        return res.json({ status: 200, message: "Categoria aprimorada." });
      }).catch(error => {
          return res.json({ status: 500, message: error });
      });
    } catch (error) {return res.json({ status: 500, message: error });}
  }
};
