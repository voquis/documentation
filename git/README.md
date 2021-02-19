# Git
Git is a utility designed to manage changes to files.
It is particularly suited to text files containing source code or config files.
Git integrates well with most IDEs to help visualise changes to files.
Hosted git platforms like GitLab, GitHub and BitBucket leverage the power of git for multiple collaborators on the same files and projects.

## Signing commits
It is trivial to set an impersonated or unverified email address as the author of a commit.
In order to verify a commit as signed by an email address trusted by GitLab or GitHub, complete the following:
1. Verify an email address with GitLab or GitHub.  This is usually done at sign-up
> Additional email addresses may be added to an account.
1. Generate a GPG private/public keypair locally per [these instructions](../gpg/README.md)
1. Paste the public GPG key part to GitLab/GitHub. In GitHub this will be in [Settings > SSH and GPG keys](https://github.com/settings/keys), in GitLab this will be in [Preferences > GPG Keys](https://gitlab.com/-/profile/gpg_keys).
> Do not paste the *private* or *secret* key, ensure only the *public* key is uploaded.
1. Configure Git to sign commits locally
First identify the GPG `KEY ID` to use, visible when generating a key or available from [listing gpg keys](../gpg/README.md#Listing-keys):
```shell
git config --global user.signingkey <KEY ID>
```
Then configure git to sign all commits using the specified key:
```shell
git config --global commit.gpgSign true
```

## Viewing current global config
```shell
git config --list
```
This should produce `key=value` pair output listing all configurations, for example:
```conf
user.signingkey=AE1F3AE71C387CC2B0E3C621A8D864BCCDD8B363
user.email=firstname.lastname@example.com
user.name=Firstname Lastname
commit.gpgsign=true
```
