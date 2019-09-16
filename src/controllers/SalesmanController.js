const mongoose = require("mongoose");
const Salesman = mongoose.model("Salesman");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const salesman = await Salesman.paginate({}, { page, limit: 10 })
      return res.json(salesman)
    } catch { return res.send() }
  },

  async show(req, res) {
    try {
      const salesman = await Salesman.findOne({ _id: req.params.id });
      return res.json(salesman)
    } catch (error){ 
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const salesman = await Salesman.create(req.body);
      return res.json({ status: "success", message: `Vendedor ${req.body.name} registrado!`});
    } catch { 
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const salesman = await Salesman.findOneAndUpdate(req.params.id, req.body, { new: true });
      return res.json({ status: "success", message:"", data: salesman })
    } catch (error){
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const response = await Salesman.findByIdAndDelete(req.params.id);
      if (response) {
        return res.json({ status: "success", message: "Vendedor removido." })
      }
    } catch (error){
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  }
};
