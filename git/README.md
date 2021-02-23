# Git
Git is a utility designed to manage changes to files.
It is particularly suited to text files containing source code or config files.
Git integrates well with most IDEs to help visualise changes to files.
Hosted git platforms like GitLab, GitHub and BitBucket leverage the power of git for multiple collaborators on the same files and projects.

## Cloning (fetching) repositories
When fetching a remote code project repository, two modes are generally used, `https` or `ssh`.
There are two main reasons for choosing `ssh` over `https`.
In general `ssh` performs better, but more importantly, if the repository requires authentication (i.e. it is a private repository) and multi-factor (or two-factor) authentication is enabled, `ssh` access is usually the only method.
[ssh](../ssh/README.md) (like [gpg](../gpg/README.md)) is an implementation of public key cryptography.
Because of the high computational expense of guessing an SSH key (compared to a regular password), `ssh` access to repositories is considered safe enough to not need a password.
In general, cloning a public repository with `https` is more convenient if sign-up or login to  the repository platform is not required.

To be able to clone repositories via SSH authentication from a remote code collaboration platform e.g. GitLab or GitHub, the following must be performed:
1. Generate an SSH public-private keypair per [these instructions](../ssh/README.md)
2. Paste the public SSH key part to GitLab/GitHub. In GitHub this will be in [Settings > SSH and GPG keys](https://github.com/settings/keys), in GitLab this will be in [Preferences > SSH Keys](https://gitlab.com/-/profile/keys).
> Do not paste the *private* or *secret* key, ensure only the *public* key is uploaded.
3. Clone the repository from GitLab/GitHub.

In general, cloning a remote repository will look like the following.
> Note that the path to the repos is usually revealed by clicking a `Code` or `Clone` button in the project on GitLab/GitHub.
```shell
git clone git@github.com:<ORGANISATION OR USER>/<REPO NAME>.git
```
> Unless specified, the command will clone the remote project into a sub-directory of the current directory.

## Signing commits
It is trivial to set an impersonated or unverified email address as the author of a commit.
In order to verify a commit as signed by an email address trusted by GitLab or GitHub, complete the following:
1. Verify an email address with GitLab or GitHub.  This is usually done at sign-up
> Additional email addresses may be added to an account.
2. Generate a GPG private/public keypair locally per [these instructions](../gpg/README.md)
3. Paste the public GPG key part to GitLab/GitHub. In GitHub this will be in [Settings > SSH and GPG keys](https://github.com/settings/keys), in GitLab this will be in [Preferences > GPG Keys](https://gitlab.com/-/profile/gpg_keys).
> Do not paste the *private* or *secret* key, ensure only the *public* key is uploaded.
4. Configure Git to sign commits locally
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
