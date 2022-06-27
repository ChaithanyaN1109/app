
const { Agency } = require('../Model/Schema.js')
const validator = require('../Utilities/validator.js');
const helper = require('../Utilities/helpers');
const { Client } = require('../Model/Schema.js')

exports.addData = async (req, res) => {
    console.log("inside add data")
    try {
        if (
            await validator.ValidatePhoneNo(req.body.agency.phoneNumber) &&
            await validator.validateAddress(req.body.agency.address1)
        ) {
            const AgencyId = await helper.generateAgencyId();
            const agencyData = await Agency.create({
                AgencyId: AgencyId,
                Name: req.body.agency.name,
                Address1: req.body.agency.address1,
                Address2: req.body.agency.Address2,
                State: req.body.agency.State,
                City: req.body.agency.City,
                PhoneNumber: req.body.agency.phoneNumber
            });
            console.log("Data", agencyData)
            for (let i = 0; i < req.body.agency.clients.length; i++) {
                if (
                    await validator.ValidateEmail(req.body.agency.clients[i].email) &&
                    await validator.ValidatePhoneNo(req.body.agency.clients[i].phoneNumber)) {
                    const ClientId = await helper.generateClientId();
                    const clientData = await Client.create({
                        ClientId: ClientId,
                        AgencyId: AgencyId,
                        Name: req.body.agency.clients[i].name,
                        Email: req.body.agency.clients[i].email,
                        PhoneNumber: req.body.agency.clients[i].phoneNumber,
                        TotalBill: req.body.agency.clients[i].totalBill
                    });
                }
                else if (!await validator.ValidatePhoneNo(req.body.agency.clients[i].phoneNumber)) {
                    return res.status(400).json({
                        status: 'error',
                        message: `Enter valid PhoneNumber for ${req.body.agency.clients[i].name}`,
                    });
                }
                else if (!await validator.ValidateEmail(req.body.agency.clients[i].email)) {
                    return res.status(400).json({
                        status: 'error',
                        message: `Enter valid email for ${req.body.agency.clients[i].name}`,
                    });
                }

            }
            res.status(201).json({
                status: 'success',
                data: {
                    agencyData
                },
            });
        }
        else if (!await validator.ValidatePhoneNo(req.body.agency.phoneNumber)) {
            res.status(400).json({
                status: 'error',
                results: 'Enter valid PhoneNumber for agency',
            });
        }
        else if (! await validator.validateAddress(req.body.agency.address1)) {
            res.status(400).json({
                status: 'error',
                results: 'Enter valid address for agency',
            });
        }
    } catch (err) {
        console.log("error", err.toString())
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};


exports.updateClient = async (req, res) => {
    try {
        console.log(req.params.ClientId)
        const clientData = await Client.findOneAndUpdate(
            { ClientId: req.params.ClientId },
            req.body,
            {
                new: true, //to return new doc back
                runValidators: true, //to run the validators which specified in the model
            }
        );
        console.log("data", clientData)
        if (clientData != null) {
            res.status(200).json({
                status: 'success',
                data: {
                    clientData,
                },
            });
        } else {
            res.status(400).json({
                status: 'success',
                data: {
                    message: `No data available with client ${req.params.ClientId} `,
                },
            });
        }
    } catch (err) {
        console.log("error", err.toString())
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getDetails = async (req, res) => {
    try {
        console.log(req.params.AgencyId)
        const AgentDetails = await Agency.find(
            { AgencyId: req.params.AgencyId },
            { _id: 0, __v: 0, AgencyId: 0, PhoneNumber: 0, createdAt: 0, updatedAt: 0, Address1: 0, Address2: 0, State: 0, City: 0 }
        );
        const ClientDetails = await Client.find(
            { AgencyId: req.params.AgencyId },
            { _id: 0, __v: 0, Email: 0, PhoneNumber: 0, createdAt: 0, updatedAt: 0, ClientId: 0, AgencyId: 0 }
        ).sort({ TotalBill: -1 }).limit(1);
        if (AgentDetails.length > 0 && ClientDetails.length > 0) {
            res.status(200).json({
                status: 'success',
                data: {
                    "AgencyName": AgentDetails[0].Name,
                    "ClientName": ClientDetails[0].Name,
                    "TotalBill": ClientDetails[0].TotalBill

                },
            });
        } else {
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No data available',
                },
            });
        }
    } catch (err) {
        console.log(err.toString())
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.invalid = async (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Invalid path',
    });
};
