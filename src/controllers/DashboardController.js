const mongoose = require("mongoose");
const Rental = mongoose.model("Rental");
const Sale = mongoose.model("Sale");

const rentalsData = async () => {
  try {
    const rentals = await Rental.find({});
    let totalOfActiveRents = 0;
    let expiresToday = 0;
    let late = 0;
    const now = new Date;
    const today = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;

    const responseObject = await rentals.map(rent => {
      if(rent.status === true) {
        totalOfActiveRents += 1;
      };

      if(rent.deadline === today) {
        if(rent.status === true) {
          expiresToday += 1;
        };
      };

      response = {
        activeRentals: totalOfActiveRents,
        expiresToday: expiresToday,
        late: late
      };

      return response;
    });

    return responseObject;

  } catch(error) { 
    return error;
  };
}

const incomingsData = async () => {
  const rentals = await Rental.find({});
  const sales = await Sale.find({});
  const custom = (prop) => {
    prop.map(p => {
      if(p.status !== true) {
        trueIncoming += Number(p.value);
      };
      possibleIncoming += Number(p.value);
    });
  };

  let possibleIncoming = 0;
  let trueIncoming = 0;
  custom(rentals);
  custom(sales);

  const earnings = {
    possibleIncoming: possibleIncoming,
    trueIncoming: trueIncoming
  };

  return earnings;
}

 module.exports = {
  async dashboard(req, res) {
    try{
      const rents = await rentalsData();
      const earnings = await incomingsData();
  
      data = {
        activeRentals: rents[0].activeRentals,
        expiresToday: rents[0].expiresToday,
        late: rents[0].late,
        possible: earnings.possibleIncoming,
        real: earnings.trueIncoming
      };

      return res.json(data);
    } catch(err) {
      return res.json(err);
    }
  },
};
