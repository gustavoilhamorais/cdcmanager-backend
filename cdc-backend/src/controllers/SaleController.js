const mongoose = require("mongoose");
const Sale = mongoose.model("Sale");

const validateCustomer = customer => {
  if(!customer || customer === null || customer === '') {
    return 204;
  } else return 200;
}
const validateMerchan = merchan => {
  if(!merchan || merchan === null || merchan === '') {
    return 204;
  } else return 200;
}
const validateDiscount = discount => {
  if(!discount || discount === null || discount === '') {
    return 204;
  } else return 200;
}
const validateValue = value => {
  if(!value || value === null || value === '') {
    return 204;
  } else return 200;
}

async function validate(customer, merchan, discount, value) {
  try {
    const customerIs = await validateCustomer(customer);
    const merchanIs = await validateMerchan(merchan);
    const discountIs = await validateDiscount(discount);
    const valueIs = await validateValue(value);

    if(customerIs === 200 && merchanIs === 200 &&
      discountIs === 200 && valueIs === 200) {
      return 200;
    
    } else if(customerIs === 204 || merchanIs === 204 ||
              discountIs === 204 || valueIs === 204) {
              return 204;
    
    } else return 400;
  
  } catch { return 400 };
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
    const { customer, merchan, discount, value } = req.body;
    try {
      const validation = await validate(customer, merchan, discount, value);

      if(validation === 200) {
        const sale = await Sale.create(req.body);
        return res.send(200)
      
      } else return res.send(validation);
      
    } catch { return res.send(400) };
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
