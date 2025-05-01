// server/services/corpnetAPI.js
const axios = require('axios');
require('dotenv').config();

const CORPNET_API_KEY = process.env.CORPNET_API_KEY;
const BASE_URL = 'https://staging22api.corpnet.com/api/business-formation';

function getHeaders() {
  return {
      'token': CORPNET_API_KEY,
      'Content-Type': 'application/json'
  };
}

async function getFormationPackages(entityType, state, filing) {
  const url = `${BASE_URL}/package?entityType=${entityType}&state=${state}&filing=${filing}`;
  const response = await axios.get(url, { headers: getHeaders() });
  return response.data;
}

async function addFormationPackage(payload) {
  const response = await axios.post(`${BASE_URL}/add-package`, payload, { headers: getHeaders() });
  return response.data;
}

async function createOrder(payload) {
  const response = await axios.post(`${BASE_URL}/create-order`, payload, { headers: getHeaders() });
  return response.data;
}

async function getOrderDetails(orderGuid) {
  const response = await axios.get(`${BASE_URL}/get-order/${orderGuid}`, { headers: getHeaders() });
  return response.data;
}

async function updateOrder(orderGuid, payload) {
  const response = await axios.post(`${BASE_URL}/update-order/${orderGuid}`, payload, { headers: getHeaders() });
  return response.data;
}

async function cancelOrder(orderGuid) {
  const response = await axios.post(`${BASE_URL}/cancel-order/${orderGuid}`, {}, { headers: getHeaders() });
  return response.data;
}

async function uploadDocument(orderGuid, payload) {
  const response = await axios.post(`${BASE_URL}/order-upload/${orderGuid}`, payload, { headers: getHeaders() });
  return response.data;
}

async function getDocuments(orderGuid) {
  const response = await axios.get(`${BASE_URL}/order-documents/${orderGuid}`, { headers: getHeaders() });
  return response.data;
}

async function getDocumentById(orderGuid, documentId) {
  const response = await axios.get(`${BASE_URL}/order-documents/${orderGuid}/${documentId}`, { headers: getHeaders() });
  return response.data;
}

module.exports = {
  getFormationPackages,
  addFormationPackage,
  createOrder,
  getOrderDetails,
  updateOrder,
  cancelOrder,
  uploadDocument,
  getDocuments,
  getDocumentById
};