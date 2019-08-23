const mongoose = require("mongoose");
const Provider = mongoose.model("Provider");

const validate = async (props) => {
  try {
    if (!props.name || !props.address || !props.phone || !props.document) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.name === null || props.address === null || props.phone === null || props.document === null ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.name === "" || props.address === "" || props.phone === "" || props.document === "" ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else if (props.name === undefined || props.address === undefined || props.phone === undefined || props.document === undefined ) {
      return { status: 'warning', message: "Preencha todos os campos." }
    } else {
      const response = await Provider.findOne({ name: props.name });
      if (!response) {
        return { status: 'success', message: "Mercadoria Cadastrada." };
      } else if (response.name === props.name) {
        return { status: 'warning', message: "Este nome já está em uso!" }
      }
    }
  } catch (error) { 
    console.log(error)
    return { status: 'error', message: "Erro interno! Contate um administrador do sistema." } }
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const provider = await Provider.paginate({}, { page, limit: 10 })
      return res.json({status: 200, message: 'OK', docs: provider.docs})
    } catch { return res.json({status:500, message:'Erro interno.'}) }
  },

  async show(req, res) {
    try {
      const provider = await Provider.findOne({ _id: req.params.id });
      return res.json(provider)
    } catch { return res.status() }
  },

  async store(req, res) {
    const { name, address, document, phone } = req.body;
    try {
      const validation = await validate({ name, address, document, phone });
      if(validation.status === 'success') {
        await Provider.create(req.body);
        return res.json(validation)
      } else  return res.json(validation);
    } catch { return res.json({ staus: 'error', message: error.message}); }
  },

  async update(req, res) {
    try {
      const provider = await Provider.findOneAndUpdate(req.params.id, req.body, { new: true });
      return res.json(provider)
    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Provider.findByIdAndDelete(req.params.id);
      return res.send()
    } catch { return res.send() }
  }
};
