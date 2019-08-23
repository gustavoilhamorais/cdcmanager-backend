const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

const validate = (name) => (email) => (phone) => (document) => (address) => {
  console.log(name, email, phone, document, address)
  
  if(!name || !email || !phone ||
    !document || !address) {
    
    return 400;
  }

  else if(
    name === null || email === null || phone === null ||
    document === null || address === null) {
    
    return 400;
  }

  else if (
    name === '' || email === '' || phone === '' ||
    document === '' || address === '') {
    
    return 400;
  }

  else {
    const response = Customer.findOne({ name: name });
    let document = '';
    if(response) {
      if(response.name === name) {
        if(response.document === document) {
          code = 226; // Already created this item;
        
        } else code = 200; 

      } else code = 200;

    } else code = 200;
  
  return code;
  };
};

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    try {
      const customer = await Customer.paginate({}, { page, limit: 10 })

      return res.json(customer)

    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });

      return res.json(customer)

    } catch { return res.status() }
  },

  async store(req, res) {
    const { name, email, phone, document, address } = req.body;
    try {
      const validation = await validate(name)(email)(phone)(document)(address);

      if(validation === 200) { 
        const customer = await Customer.create(req.body);
        return res.send(200);
      
      } else if (validation === 226) { return 226;

      } else { return 400; };
      
    } catch { return res.send(400); }
  },

  async update(req, res) {
    try {
      const customer = await Customer.findOneAndUpdate(req.params.id, req.body, { new: true });

      return res.json(customer)

    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Customer.findByIdAndDelete(req.params.id);

      return res.send()

    } catch { return res.send() }
  }
};
