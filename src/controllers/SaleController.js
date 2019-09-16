const mongoose = require("mongoose");
const Sale = mongoose.model("Sale");
const Salesman = mongoose.model("Salesman");
const Customer = mongoose.model("Customer");

validateData = data => {
  if(!data || data === null || data === '' || data === undefined) {
    return 204;
  
  } else return 200;
}

async function validate(props) {
  try {
    const { id, nf, customer, saleCoast, saleValue, salesman } = props;
    const dataGroup = [id, nf, customer, saleCoast, saleValue, salesman];
    let validation = [];
    await dataGroup.map(data => {
      validation.push(validateData(data));
    });
    if (204 in validation) {
      return { status: 'warning', message: 'Preencha todos os campos!' };
    } else {
      return { status: 'success', message: 'Venda cadastrada!' }; 
    }
  } catch { return { status: 'error', message: 'Ops, parece que algo deu errado. Tente novamente.'} };
}

async function makeSale(params) {
  try {
    const { id, nf, customer, saleCoast, saleValue, salesman, requestFROM } = params;
    const lastSale = await getLastSale();
    const number =  getSaleNumber(lastSale);
    const status = checkStatus(requestFROM);
    const customerID = await getCustomerID(customer);
    const salesmanID = await getSalesmanID(salesman);
    const newSale = {
      id,
      nf,
      customer,
      customerID,
      saleCoast,
      saleValue,
      salesman,
      salesmanID,
      status,
      number
    }
    return newSale;
  } catch (error) { console.log(error); }
}

function getLastSale() {
  return Sale.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, lastSale) {
    return lastSale;
  });
}

function getSaleNumber(lastSale) {
  if (lastSale !== null) return lastSale.number + 1;
  else return 1;
}

function checkStatus(requestFROM) {
  return requestFROM === '/nova-venda';
}

function getSalesmanID(salesman) {
  return Salesman.findOne({ 'name': salesman }).then(salesman => {
    return salesman._id;
  })
}

function getCustomerID(customer) {
  console.log(customer);
  return Customer.findOne({ 'name': customer }).then(customer => {
    return customer._id;
  })
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
    const { id, nf, customer, saleCoast, saleValue, salesman } = req.body;
    try {
      const validation = await validate({ id, nf, customer, saleCoast, saleValue, salesman });
      if(validation.status === 'success') {
        const newSale = await makeSale(req.body);
        await Sale.create(newSale);
      }
        return res.json(validation);
      } catch(e) {
        console.log(e)
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
      await Sale.updateOne({ _id: req.params.id }, req.body);
      return res.json({ status: "success", message: "Dados atualizados!" });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const response = await Sale.findByIdAndDelete(req.params.id);
      if (response) {
        return res.json({ status: "success", message: "Venda removida." })
      }
    } catch { return res.send() }
  }
};
