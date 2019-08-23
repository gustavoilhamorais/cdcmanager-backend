const mongoose = require("mongoose");
const Provider = mongoose.model("Provider");

const validate = (name) => (email) => (phone) => (document) => {
  console.log(name, email, phone, document)
  
  if(!name || !email || !phone ||
    !document) {
    
    return {status: 400, message: 'Preencha todos os campos'};
  }

  else if(
    name === null || email === null || phone === null ||
    document === null) {
    
    return {status: 400, message: 'Preencha todos os campos'};
  }

  else if (
    name === '' || email === '' || phone === '' ||
    document === '') {
    
    return {status: 400, message: 'Preencha todos os campos'};
  }

  else {
    const response = Provider.findOne({ name: name });
    let document = '';
    if(response) {
      if(response.name === name) {
        if(response.document === document) {
          code = 226; message = 'Fornecedor já cadastrado.';
        
        } else code = 200; message = 'OK'; 

      } else code = 200; message = 'OK';

    } else code = 200; message = 'OK';
  
  return {status: code, message: msg};
  };
};

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
      const validation = await validate(name)(address)(document)(phone);

      if(validation === 200) {
        const provider = await Provider.create(req.body);
        return res.send(200)
      
      } else if(response === 226) { return res.send(226);
      
      } else { return res.send(400) }
      
    } catch { return res.send(400) }
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
