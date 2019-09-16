const mongoose = require("mongoose");
const Merchandise = mongoose.model("Merchandise");

const validate = async props => {
  try {
    if (!props.name ||!props.buyValue ||
      !props.sellValue || !props.code
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else if (
      props.name === null ||
      props.buyValue === null ||
      props.sellValue === null ||
      props.code === null
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else if (
      props.name === undefined ||
      props.buyValue === undefined ||
      props.sellValue === undefined ||
      props.code === undefined
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else {
      const response = await Merchandise.findOne({ name: props.name });
      if (response !== null && response !== undefined) {
        if (response.code === props.code) {
          return { status: "warning", message: "Mercadoria já cadastrada." };
        } else {
          return { status: "success", message: "Mercadoria Cadastrada." };
        }
      } else {
        return { status: "success", message: "Mercadoria Cadastrada." };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Erro interno! Contate um administrador do sistema."
    };
  }
};

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
      const {
        name,
        code,
        sellValue,
        buyValue
      } = req.body;
      const validation = await validate({
        name,
        code,
        sellValue,
        buyValue,
      });
      if (validation.status === "success") {
        await Merchandise.create(req.body);
      }
      return res.json(validation);
    } catch (err) {
      return res.json({ status: "error", message: err });
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
    } catch (error) {
      res.send(error);
    }
  },

  async destroy(req, res) {
    try {
      const response = await Merchandise.findByIdAndDelete(req.params.id);
      if (response) {
        return res.json({ status: "success", message: "Mercadoria removida." })
      }
    } catch (error){
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  }
};
