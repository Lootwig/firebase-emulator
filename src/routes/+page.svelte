<script lang="ts">
    import {signInWithPopup, getAuth, GoogleAuthProvider, connectAuthEmulator} from "firebase/auth";
    import {initializeApp} from "firebase/app";
    import {PUBLIC_FIREBASE_CONFIG} from "$env/static/public";

    const config = JSON.parse(PUBLIC_FIREBASE_CONFIG)
    initializeApp(config);

    const auth = getAuth();
    connectAuthEmulator(auth, 'http://localhost:9099');
</script>

<button on:click={async () => {
    const provider = new GoogleAuthProvider().addScope('email');
    const userCredential = await signInWithPopup(auth, provider);
    await fetch('/login', { body: await userCredential.user.getIdToken(), method: 'POST' });
}}>SIGN IN</button>
