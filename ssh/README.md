# SSH
[SSH (secure shell)](https://www.ssh.com/ssh/) is a protocol for securely connecting to the terminal of a remote computer. Traffic between the two hosts is encrypted to secure the communication.
It is an implementation of [public key cryptography](https://www.globalsign.com/en/ssl-information-center/what-is-public-key-cryptography).
A private key is used by a sender to encrypt data and the public key used by a recipient to decrypt received data.
The keys are mathematically related but not identical.
The private key should be closely guarded, revealing a private key could lead to impersonation and data breaches.
Some services use SSH for secure but short-lived sessions to transfer files, e.g. cloning from or pushing to a remote private GitLab/GitHub repository.

## Generating SSH private/public keypairs
The `ssh-keygen` command line utility can be used to generate SSH private/public keypairs with:
```shell
ssh-keygen -b 4096 -f ~/.ssh/id_rsa
```
This above will produce a private/public keypair with a length of 4096 bits. The private key (`id_rsa`) will be saved in the folder `.ssh` in the current users home directory (`~`).
Alongside this file, the public key (`id_rsa.pub`) will also be created.
A similar random art fingerprint of the key should be displayed:
```
+---[RSA 4096]----+
|      .o..o++.o  |
|     .oo. +ooo   |
|   . .+... o..   |
|  . o .* o . + . |
|   o .o S = + E +|
|  .  . = O o = *o|
|      o o + .   +|
|         o .     |
|          o      |
+----[SHA256]-----+
```

## Viewing the content of a public key
The public key is not encrypted with a password because it is designed to be shared with a trusted host, i.e. the remote server.
The public key is simply a file on disk (locaed at `~/.ssh/id_rsa.pub`), so may be opened with a text editor.
However, some visual editors may reformat characters and sequences, consequently it is recommended to display the key with the command line or open the file in an IDE (e.g. VSCode).
To quickly display the contents of the file on the command line, use the `cat` command (concatenate) followed by the path to the file:
```shell
cat ~/.ssh/id_rsa.pub
```
This should produce the following output.
> Note that the public key is in three parts, the first the algorithm, e.g. `ssh-rsa`, the second the key and finally the user/host name.
```
ssh-rsa ...AAAAB3NzaC1yc2EAAAADAQABAA... me@my-pc
```
> When pasting a key into services like GitLab or GitHub, ensure the first and seconds parts are included, the third is optional.

### Viewing help
For usage information run:
```shell
ssh-keygen --help
```

To view the detailed usage manual (`man`), run:
```shell
man ssh-keygen
```
