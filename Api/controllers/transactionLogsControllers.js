import TransactionLogs from '../models/transactionLogs.js';

export const createTransactionLog = async (request, response) => {
  try {
    const { TransactionID, UsersID, OrderID, type, quantity, date } = request.body;
    const newTransactionLog = await TransactionLogs.create({ TransactionID, UsersID, OrderID, type, quantity, date: date || new Date() });
    response.status(201).json(newTransactionLog);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getTransactionLogs = async (request, response) => {
  try {
    const transactionLogs = await TransactionLogs.findAll();
    response.status(200).json(transactionLogs);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getTransactionLogById = async (request, response) => {
  try {
    const { id } = request.params;
    const transactionLog = await TransactionLogs.findByPk(id);
    if (transactionLog) {
      response.status(200).json(transactionLog);
    } else {
      response.status(404).json({ message: `TransactionLog with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateTransactionLog = async (request, response) => {
  try {
    const { id } = request.params;
    const { UsersID, OrderID, type, quantity, date } = request.body;

    const [updated] = await TransactionLogs.update({ UsersID, OrderID, type, quantity, date: date || new Date()}, {
      where: { TransactionID: id }
    });

    if (updated) {
      const updatedTransactionLog = await TransactionLogs.findByPk(id);
      response.status(200).json(updatedTransactionLog);
    } else {
      response.status(404).json({ message: `TransactionLog with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteTransactionLog = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await TransactionLogs.destroy({
      where: { TransactionID: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'TransactionLog deleted' });
    } else {
      response.status(404).json({ message: `TransactionLog with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
