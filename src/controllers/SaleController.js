const mongoose = require("mongoose");
const Sale = mongoose.model("Sale");

validateData = data => {
  if(!data || data === null || data === '' || data === undefined) {
    return 204;
  
  } else return 200;
}
async function validate(customer, merchan, value) {
  try {
    const dataGroup = [customer, merchan, value];
    let validation = [];
    await dataGroup.map(data => validation.push(validateData(data)))
    if(204 in validation) return { status: 'warning', message: 'Preencha todos os campos!' };
    else return { status: 'success', message: 'Venda cadastrada!' };
  } catch { return { status: 'error', message: 'Ops, parece que algo deu errado. Tente novamente.'} };
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const sale = await Sale.paginate({}, { page, limit: 10 })
      return res.json(sale)
    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const sale = await Sale.findOne({ _id: req.params.id });
      return res.json(sale)
    } catch { return res.status() }
  },

  async store(req, res) {
    const { customer, merchan, value } = req.body;
    try {
      const validation = await validate(customer, merchan, value);
      if(validation.status === 'success') {
        await Sale.create(req.body);
      }
        return res.json(validation);
      } catch(e) {
        if (e.name === 'ValidationError') {
          return res.json({ status: 'warning', message: 'Preencha todos os campos!'});
        } else {
          console.log(e)
          return res.json({ status: 'error', message: 'Ops, tente novamente.'}) 
        }
      };
    },
  async update(req, res) {
    try {
      const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(sale)
    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Sale.findByIdAndDelete(req.params.id);
      return res.send()
    } catch { return res.send() }
  }
};
