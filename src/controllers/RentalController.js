const mongoose = require("mongoose");
const Rental = mongoose.model("Rental");
const Customer = mongoose.model("Customer");
const Merchandise = mongoose.model("Merchandise");

function validateData (data) {
  if(!data || data === null || data === '' || data === undefined) {
    return 204;
  
  } else return 200;
}
async function validate(customer, merchan, value, deadline) {
  try {
    const dataGroup = [customer, merchan, value, deadline];
    let validation = [];
    await dataGroup.map(data => validation.push(validateData(data)))
    if(204 in validation) return { status: 'warning', message: 'Preencha todos os campos!' };
    else return { status: 'success', message: 'Sua ordem de serviço foi registrada!' };
  } catch { return { status: 'error', message: 'Ops, parece que algo deu errado. Tente novamente.'} };
}

function getCustomerId(name) {
  return Customer.find({ name: name }).then(customer => customer._id);
}

function alocateMerchan(params) {
  const id = Merchandise.find({}).map(item => {
    if (item.code === params) return item._id;
  });
  return Merchandise.findOneAndUpdate(id, {status: false}, { new: true });
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const rental = await Rental.paginate({}, { page, limit: 10 })
      return res.json(rental)
    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const rental = await Rental.findOne({ _id: req.params.id });
      return res.json(rental)
    } catch { return res.status() }
  },

  async store(req, res) {
    const { customer, merchan, value, deadline, discount, observations } = req.body;
    try {
      const id = await getCustomerId(customer);
      const validation = await validate(customer, merchan, value, deadline);
      if(validation.status === 'success') {
        const rent = {
          customer: {
            name: customer,
            id: id,
          },
          merchan: merchan,
          value: value,
          deadline: deadline,
          discount: discount,
          observations: observations
        }
        await Rental.create(rent);
        await alocateMerchan(merchan);
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
      const rental = await Rental.findOneAndUpdate(req.params.id, req.body, { new: true });
      return res.json(rental)
    } catch (e){ res.send(e) }
  },

  async destroy(req, res) {
    try {
      await Rental.findByIdAndDelete(req.params.id);
      return res.send()
    } catch { return res.send() }
  }
};
