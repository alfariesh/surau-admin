import "server-only";

import {cert, getApp, getApps, initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

const DEFAULT_PROJECT_ID = "surau-87160";

function readRequiredServerEnv(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing Firebase Admin environment variable: ${key}`);
  }

  return value;
}

function getPrivateKey() {
  return readRequiredServerEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

export function getFirebaseAdminApp() {
  if (getApps().length) return getApp();

  const projectId = process.env.FIREBASE_PROJECT_ID ?? DEFAULT_PROJECT_ID;

  return initializeApp({
    credential: cert({
      clientEmail: readRequiredServerEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: getPrivateKey(),
      projectId,
    }),
    projectId,
  });
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

