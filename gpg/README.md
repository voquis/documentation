# GPG
GPG is a utility to manage [OpenPGP](https://www.openpgp.org/) private/public keypairs.
It is an implementation of [public key cryptography](https://www.globalsign.com/en/ssl-information-center/what-is-public-key-cryptography).
A private key is used by a sender to encrypt data and the public key used by a recipient to decrypt received data.
The keys are mathematically related but not identical.
The private key should be closely guarded, revealing a private key could lead to impersonation and data breaches.

## Generating GPG private/public keypairs
The `gpg` command line utility can be used to generate OpenPGP private/public keypairs.
To verify the version of `gpg` installed, run:
```shell
gpg --version
```
The above should produce output like:
```
gpg (GnuPG) 2.2.19
libgcrypt 1.8.5
```

### Generating keys
To generate a keypair, run the following.
> If using these keys to sign git commits with remote repositories, ensure the email used is verified with GitLab/GitHub:
```shell
gpg --quick-generate-key "Firstname Lastname <firstname.lastname@example.com>" rsa4096 default 1y
```
This command will generate a keypair that is valid for 1 year with the `RSA` algorithm having a key length of `4096` bits that may be used for signing, auth and encryption (i.e. `default` usage).  The fingerprint or ID of the key should be displayed, e.g. `AE1F3AE71C387CC2B0E3C621A8D864BCCDD8B363`
> Take note of the key ID if using the key for e.g. git commit signing.  If no longer displayed, the keys [can be listed](#Listing-keys) to display the fingerprint.
It is recommended to rotate keys often, setting a validity period will force expiry of the keys.
If the last parameter is ommitted, the keys will not expire.

### Viewing the contents of a public key
If the id of a key is known, run the following to view the full public key.
```shell
gpg --armor --export <KEY ID>
```

> Note that the beginning `-----BEGIN PGP PUBLIC KEY BLOCK-----` and end `-----END PGP PUBLIC KEY BLOCK-----` are also part of the key:

### Listing keys
To list public keys:
```shell
gpg --list-keys
```

To list private keys:
```shell
gpg --list-secret-keys
```

### Deleting keys
To delete both the private and public part of a keypair, run the following, replacing `<KEY ID>` with the keypair ID:
```
gpg --delete-secret-and-public-key <KEY ID>
```

To delete the private half of a keypair, run the following.
> Note that the secret half of a key must be deleted before the public half.
```shell
gpg --delete-secret-keys <KEY ID>
```

To delete the public half of a keypair:
```shell
gpg --delete-keys <KEY ID>
```

### Renewing expired keys
The private part of a key does not expire, but the public key can be renewed e.g. by another year.
> Renewing a key generates a new public key that must be re-uploaded to e.g. GitHub/GitLab.

Enter the key editor with:

```shell
gpg --edit-key <KEY ID>
```
This will display key details and enter the key editor.
A new prompt (`gpg>`) is displayed at the end to run gpg-specific key-editing commands.

```
sec  rsa4096/A3AA000D29441C38
     created: 2022-07-30  expired: 2023-07-30  usage: SC
     trust: ultimate      validity: expired
[ expired] (1). Firstname Lastname <firstname.lastname@example.com>

gpg>
```

At the `gpg>` prompt, enter `expire`.

```shell
gpg> expire
```

This will initiate the key renewal process and the validity of the public key must be defined.
Enter `1y` to generate another public key valid for 1 year.
```shell
Key is valid for? (0) 1y
```
This will display a confirmation message, for example:

```
Key expires at Sat 03 Aug 2024 17:27:41 BST
```
At the prompt, confirm the request with `y`:

```
Is this correct? (y/N) y
```

Once complete, the key details are printed again for review.
> Changes must be saved before they may be used.
To exit the key editor, enter `quit`:
```
gpg> quit
```
At the prompt to save, enter `y`:
```
Save changes? (y/N) y
```

The new public key may be viewed [as before](#viewing-the-contents-of-a-public-key) with `gpg --armor --export <KEY ID>`.

### Viewing help
For usage information run:
```shell
gpg --help
```

To view the detailed usage manual (`man`), run:
```shell
man gpg
```
