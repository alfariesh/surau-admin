"use client";

import {getApp, getApps, initializeApp, type FirebaseOptions} from "firebase/app";
import {getAuth} from "firebase/auth";

function readRequiredClientEnv(key: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing Firebase client environment variable: ${key}`);
  }

  return value;
}

function getFirebaseConfig(): FirebaseOptions {
  return {
    apiKey: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_API_KEY",
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    ),
    appId: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_APP_ID",
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    ),
    authDomain: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    ),
    messagingSenderId: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    ),
    projectId: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    ),
    storageBucket: readRequiredClientEnv(
      "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    ),
  };
}

export function getFirebaseClientApp() {
  return getApps().length ? getApp() : initializeApp(getFirebaseConfig());
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}
