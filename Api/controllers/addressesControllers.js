import Addresses from "../models/addresses.js"


export const createAddress = async (request, response) => {
    try {
        const { UserID, address, addressID } = request.body;
        const newAddress = await Addresses.create({ UserID, address, addressID });
        response.status(201).json(newAddress);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
    }


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



export const updateAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const { address} = request.body;
        const [updated] = await Addresses.update({address}, {
            where: { addressID: id }
        });
        if (updated) {
            const updatedAddress = await Addresses.findByPk(id); //TODO this returns the address with the id of the user, not the addressid
            response.status(200).json(updatedAddress);
        } else {
            response.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }

export const deleteAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await Addresses.destroy({
            where: { addressID: id }
        });
        if (deleted) {
            response.status(200).json({ message: 'Address deleted' });
        } else {
            response.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
    }