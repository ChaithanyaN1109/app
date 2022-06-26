const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
const agency = new mongoose.Schema(
  {
    AgencyId: {
      type: String,
      unique: true,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Address1: {
      type: String,
      required: true,
    },
    Address2: {
      type: String,
      required: false,
    },
    State: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);


const client = new mongoose.Schema(
  {
    ClientId: {
      type: String,
      unique: true,
      required: true,
    },
    AgencyId: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    TotalBill: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Agency = mongoose.model('agencies', agency);
const Client = mongoose.model('clients', client);


module.exports = {
  Agency: Agency,
  Client: Client
};
