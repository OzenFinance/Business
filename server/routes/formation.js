// server/routes/formation.js
const express = require('express');
const router = express.Router();
const {
  getFormationPackages,
  addFormationPackage,
  createOrder,
  getOrderDetails,
  updateOrder,
  cancelOrder,
  uploadDocument,
  getDocuments,
  getDocumentById
} = require('./CorpnetAPI');

/// GET /api/formation/packages
router.get('/formation/packages', async (req, res) => {
  try {
    const { entityType, state, filing } = req.query;
    const data = await getFormationPackages(entityType, state, filing);
    res.json(data);
  } catch (err) {
    console.error('Get Packages Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch formation packages' });
  }
});

// POST /api/formation/add-package
router.post('/formation/add-package', async (req, res) => {
  try {
    const data = await addFormationPackage(req.body);
    res.json(data);
  } catch (err) {
    console.error('Add Package Error:', err.message);
    res.status(500).json({ error: 'Failed to add formation package' });
  }
});

// POST /api/formation/create-order
router.post('/formation/create-order', async (req, res) => {
  try {
    const data = await createOrder(req.body);
    res.json(data);
  } catch (err) {
    console.error('Create Order Error:', err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/formation/get-order/:orderGuid
router.get('/formation/get-order/:orderGuid', async (req, res) => {
  try {
    const data = await getOrderDetails(req.params.orderGuid);
    res.json(data);
  } catch (err) {
    console.error('Get Order Error:', err.message);
    res.status(500).json({ error: 'Failed to get order details' });
  }
});

// POST /api/formation/update-order/:orderGuid
router.post('/formation/update-order/:orderGuid', async (req, res) => {
  try {
    const data = await updateOrder(req.params.orderGuid, req.body);
    res.json(data);
  } catch (err) {
    console.error('Update Order Error:', err.message);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// POST /api/formation/cancel-order/:orderGuid
router.post('/formation/cancel-order/:orderGuid', async (req, res) => {
  try {
    const data = await cancelOrder(req.params.orderGuid);
    res.json(data);
  } catch (err) {
    console.error('Cancel Order Error:', err.message);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

// POST /api/formation/upload-document/:orderGuid
router.post('/formation/upload-document/:orderGuid', async (req, res) => {
  try {
    const payload = { file: req.body.file };
    const data = await uploadDocument(req.params.orderGuid, payload);
    res.json(data);
  } catch (err) {
    console.error('Upload Document Error:', err.message);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// GET /api/formation/documents/:orderGuid
router.get('/formation/documents/:orderGuid', async (req, res) => {
  try {
    const data = await getDocuments(req.params.orderGuid);
    res.json(data);
  } catch (err) {
    console.error('Get Documents Error:', err.message);
    res.status(500).json({ error: 'Failed to get documents' });
  }
});

// GET /api/formation/documents/:orderGuid/:documentId
router.get('/formation/documents/:orderGuid/:documentId', async (req, res) => {
  try {
    const data = await getDocumentById(req.params.orderGuid, req.params.documentId);
    res.json(data);
  } catch (err) {
    console.error('Get Document Error:', err.message);
    res.status(500).json({ error: 'Failed to get document' });
  }
});

module.exports = router;