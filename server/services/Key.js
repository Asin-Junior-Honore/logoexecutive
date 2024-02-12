const Key = require("../models/Keys");
const { KeyCollection } = require("../utils/firestore");
const {Timestamp} = require("firebase-admin/firestore");

async function createKey(data) {
  try {
    const keyData = {
      keyId: crypto.randomUUID(),
      userId: data.userId,
      key: crypto.randomUUID().replace(/-/g, "").toUpperCase(),
      keyDescription: data.keyDescription,
      usageCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const result = await KeyCollection.doc(keyData.keyId).set(keyData);
    const UserKey = new Key(keyData);
    return UserKey;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function fetchKeysByuserid(userId) {
  try {
    const keyRef = await KeyCollection.where("userId", "==", userId).get();

    if (keyRef.empty) return null;

    const keys = keyRef.docs.map(doc => new Key({
      ...doc.data(),
    }));

    return keys;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function isAPIKeyPresent(userId, apiKey) {
  try {
    const keyRef = await KeyCollection.where("userId", "==", userId).where("key", "==", apiKey).get();

    if (keyRef.empty) return false;
    return true;
    
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function destroyKey(keyId) {
  try {
    const keyRef = await KeyCollection.doc(keyId).delete();
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  createKey,
  fetchKeysByuserid,
  destroyKey,
  isAPIKeyPresent
};
