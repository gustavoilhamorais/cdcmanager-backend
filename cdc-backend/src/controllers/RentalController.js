const mongoose = require("mongoose");
const Rental = mongoose.model("Rental");

validateData = data => {
  if(!data || data === null || data === '' || data === undefined) {
    return 204;
  
  } else return 200;
}
async function validate(customer, merchan, value, deadline) {
  try {
    const dataGroup = [customer, merchan, value, deadline];
    let validation = [];
    
    await dataGroup.map(data => validation.push(validateData(data)))
    console.log(validation)
    if(204 in validation) {
      return 204;
    
    } else return 200;
  
  } catch { return 400 };
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
    const { customer, merchan, value, deadline } = req.body;
    try {
      const validation = await validate(customer, merchan, value, deadline);
      
      if(validation === 200){
        const rental = await Rental.create(req.body);
        return res.send(200);
      
      } else return res.send(validation);
      
    } catch(e) { return res.send(400) };
  },

  async update(req, res) {
    try {
      const rental = await Rental.findOneAndUpdate(req.params.id, req.body, { new: true });

      return res.json(rental)

    } catch { res.send() }
  },

  async destroy(req, res) {
    try {
      await Rental.findByIdAndDelete(req.params.id);

      return res.send()

    } catch { return res.send() }
  }
};
