import * as openpgp from 'openpgp';

async function generateKeyPair() {
    const res = await openpgp.generateKey({
        userIDs: [{ name: 'snoop', email: 'snoop.dog@example.com' }], // Identity information
        curve: 'ed25519', // Key type and curve
        passphrase: 'your-passphrase', // Passphrase to protect the private key
    });
    return res
}

(async () => {
    const user1 = await generateKeyPair()
    const user2 = await generateKeyPair()

    const encryptedKey = await openpgp.readKey({ armoredKey: user2.privateKey });
    const passphrase = 'your-passphrase'; // what the private key is encrypted with
    const plaintext = 'Hello, World!';

    const publicKeys = await Promise.all([user1.publicKey, user2.publicKey].map(armoredKey => openpgp.readKey({ armoredKey })));

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: user1.privateKey }),
        passphrase
    });

    const message = await openpgp.createMessage({ text: plaintext });

    const encrypted = await openpgp.encrypt({
        message, // input as Message object
        encryptionKeys: publicKeys,
        signingKeys: privateKey // optional
    });

    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    console.log((await openpgp.decrypt({
        message: await openpgp.readMessage({ armoredMessage: encrypted }),
        verificationKeys: publicKeys[0],
        decryptionKeys: privateKey
      })).data)
})();