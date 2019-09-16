const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

const validate = async props => {
  console.log(props);
  try {
    if (!props.name || !props.address || !props.phone || !props.document) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else if (
      props.name === null ||
      props.address === null ||
      props.phone === null ||
      props.document === null
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else if (
      props.name === "" ||
      props.address === "" ||
      props.phone === "" ||
      props.document === ""
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else if (
      props.name === undefined ||
      props.address === undefined ||
      props.phone === undefined ||
      props.document === undefined
    ) {
      return { status: "warning", message: "Preencha todos os campos." };
    } else {
      const response = await Customer.findOne({ name: props.name });
      if (!response) {
        return { status: "success", message: "Cliene Cadastrado." };
      } else if (response.name === props.name) {
        return { status: "warning", message: "Este nome já está em uso!" };
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
      const customer = await Customer.paginate({}, { page, limit: 10 });

      return res.json(customer);
    } catch {
      return res.send();
    }
  },

  async show(req, res) {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });

      return res.json(customer);
    } catch {
      return res.status();
    }
  },

  async store(req, res) {
    const { name, email, phone, document, address } = req.body;
    try {
      const validation = await validate({name, email, phone, document, address });

      if (validation.status === "success") {
        const customer = await Customer.create(req.body);
        return res.json(validation);
      } else {
        return res.json(validation);
      }
    } catch (error) {
      return res.json({ status: "error", message: error });
    }
  },

  async update(req, res) {
    try {
      const customer = await Customer.findOneAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return res.json(customer);
    } catch {
      res.send();
    }
  },

  async destroy(req, res) {
    try {
      const response = await Customer.findByIdAndDelete(req.params.id);
      if (response) {
        return res.json({ status: "success", message: "Cliente removido." })
      }
    } catch (error){
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  }
};
