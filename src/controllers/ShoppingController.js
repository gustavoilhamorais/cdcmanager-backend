const mongoose = require("mongoose");
const Shopping = mongoose.model("Shopping");
const Provider = mongoose.model("Provider");
const Merchandise = mongoose.model("Merchandise");

async function makeNewShopping(params) {
  try {
    const { providerName, discount, products, nf, shopValue, requestFROM } = params;
    const lastShopping = await getLastShopping();
    const number = await getShoppingNumber(lastShopping);
    const status = checkStatus(requestFROM);
    const providerID = await getProviderID(providerName);
    const merchandise = products.map(item => {
      return {name: item.product, id: item.id, amount: item.amount}
    });
    if (status) await handleMerchandiseStorage(merchandise);
    return { provider: providerName, providerID, discount, merchandise, nf, shopValue, status, number };
    // else return {status: 'error', message: 'Você ultrapassou a quantidade disponível em estoque deste produto.'}
  } catch (error) { console.log(error); }
}

async function handleMerchandiseStorage(merchan) {
  let operationStatus = false;
  await merchan.map(item => {
    Merchandise.findOne({ _id: item.id }).then(merchandise => {
      merchandise.atStorage = (Number(merchandise.atStorage) + Number(item.amount));
      if (merchandise.atStorage > 0) {
        merchandise.save();
        operationStatus = 1
      }
    }).catch(error => console.log(error));
    if (operationStatus) return true;
  });
}

function getLastShopping() {
  return Shopping.findOne({}, {}, { sort: { createdAt: -1 } }, function(
    err,
    lastShopping
  ) {
    return lastShopping;
  });
}

function getShoppingNumber(lastShopping) {
  if (lastShopping !== null) return lastShopping.number + 1;
  else return 1;
}

function checkStatus(requestFROM) {
  return requestFROM === "/nova-compra";
}

function getProviderID(providerName) {
  return Provider.findOne({ name: providerName }, "_id", function(error, id) {
    return id;
  });
}

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const shopping = await Shopping.paginate({}, { page, limit: 10 });
      return res.json(shopping);
    } catch {
      return res.send();
    }
  },

  async show(req, res) {
    try {
      const shopping = await Shopping.findOne({ _id: req.params.id });
      return res.json(shopping);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const newShopping = await makeNewShopping(req.body);
      console.log(newShopping);
      if (newShopping.status === 'error') {
        return newShopping
      } else {
        await Shopping.create(newShopping);
        return res.json({
          status: "success",
          message: `Compra ${newShopping.number} cadastrada!`
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      await Shopping.updateOne({ _id: req.params.id }, req.body);
      return res.json({ status: "success", message: "Dados atualizados!" });
    } catch (error) {
      return res.json({ status: "error", message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const response = await Shopping.findByIdAndDelete(req.params.id);
      if (response) {
        return res.json({ status: "success", message: "Compra removida." });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: "error", message: error.message });
    }
  }
};
