import PriceHistory from "../models/priceHistory.js";

export const createPriceHistory = async (req, res) => {
    try {
        const { PriceID, ProductID, price, date } = req.body;
        const newPriceHistory = await PriceHistory.create({ PriceID, ProductID, price, date });
        res.status(201).json(newPriceHistory);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }};

export const getPriceHistory = async (req, res) => {
    try {
        const priceHistory = await PriceHistory.findAll();
        res.json(priceHistory);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }};

export const getPriceHistoryById = async (req, res) => {
    try {
        const priceHistory = await PriceHistory.findByPk(req.params.id);
        if (priceHistory) {
            res.json(priceHistory);
        } else {
            res.status(404).json({ message: 'Price history not found' });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }};

export const updatePriceHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, date } = req.body;
        const [updated] = await PriceHistory.update({price, date }, {
            where: { PriceID: id }
        });
        if (updated) {
            const updatedPriceHistory = await PriceHistory.findByPk(id);
            res.status(200).json(updatedPriceHistory);
        } else {
            res.status(404).json({ message: 'Price history not found' });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }}

export const deletePriceHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await PriceHistory.destroy({
            where: { PriceID: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Price history not found' });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }};