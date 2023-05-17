import type {RequestHandler} from './$types';
import {getAuth} from "firebase-admin/auth";
import {cert, initializeApp} from "firebase-admin/app";
import {FIREBASE_SERVICE_ACCOUNT} from "$env/static/private";

const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

export const POST = (async ({request}) => {
    console.log(JSON.stringify(serviceAccount))
    const app = initializeApp({credential: cert(serviceAccount)}, 'admin')
    const auth = getAuth(app);
    let idToken: string = await request.text();
    const cookie = await auth.createSessionCookie(idToken, {expiresIn: 60 * 60 * 24 * 5});
    const decodedToken = await auth.verifySessionCookie(cookie);
    console.log(decodedToken)
    return new Response();
}) satisfies RequestHandler;