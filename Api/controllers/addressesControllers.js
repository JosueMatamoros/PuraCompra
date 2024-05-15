import Addresses from "../models/addresses.js"

export const getAddresses = async (request, response) => {
    try {
        const addresses = await Addresses.findAll();
        response.json(addresses);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
    };

export const getAddressById = async (request, response) => {
    try {
        const address = await Addresses.findByPk(request.params.id);
        if (address) {
            response.json(address);
        } else {
            response.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }