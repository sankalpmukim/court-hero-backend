import app from "./app.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(app);

export const setAwake = async (id) => {
  await updateDoc(doc(db, "nodes", String(id)), {
    awake: true,
  });
};

export const setNotAwake = async (id) => {
  await updateDoc(doc(db, "nodes", String(id)), {
    awake: false,
  });
};

export const getNodes = async () => {
  const nodes = await getDocs(collection(db, "nodes"));
  const data = [];
  nodes.forEach((node) => {
    data.push(node.data());
  });
  return nodes.docs.map((node) => node.data());
};

export const setNodeFree = async (id) => {
  await updateDoc(doc(db, "nodes", String(id)), {
    people: false,
  });
  await addDoc(collection(db, `nodes/${id}/logs`), {
    created_at: serverTimestamp(),
    people: false,
  });
};

export const setNodeBusy = async (id) => {
  await updateDoc(doc(db, "nodes", String(id)), {
    people: true,
  });
  await addDoc(collection(db, `nodes/${id}/logs`), {
    created_at: serverTimestamp(),
    people: true,
  });
};

export const getNodesByBlock = async (block) => {
  const nodes = await getDocs(collection(db, "nodes"));
  return nodes.docs
    .filter((node) => node.data().block === block)
    .map((node) => node.data());
};

export const getNodesByBlockAndIndex = async (block, index) => {
  const nodes = await getDocs(collection(db, "nodes"));
  return nodes.docs
    .filter(
      (node) =>
        node.data().block === block && node.data().index === Number(index)
    )
    .map((node) => node.data());
};

export const sendDetectionLog = async (nodeId, detected) => {
  await setDoc(doc(db, "nodes", String(nodeId)), {
    people: detected,
  });
  await addDoc(collection(db, `nodes/${nodeId}/logs`), {
    people: detected,
    created_at: new Date().toISOString(),
  });
};
