# AWS
AWS (Amazon Web Services) is one of the major public cloud providers.
AWS, like other providers, offers the full range of [as-a-service](https://www.redhat.com/en/topics/cloud-computing/what-is-paas) from Infrastructure (IaaS) and Platform (PaaS) to Software (SaaS) on a pay-per-use basis.
AWS resources may be created and managed in a number of ways (in order of increasing sophistication):
- Via the [web-based console](console.aws.amazon.com/):  Resources are created via a point and click approach.
- via the [CLI](https://docs.aws.amazon.com/cli/latest/reference/): Resources are created by issuing commands from the terminal
- via Infrastructure as Code (IaC) tools, e.g. [CloudFormation Stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) or [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest).

In general, one AWS account is used to separate resources by environment or business area.
Most organisations that leverage the cloud directly will have at least one account per environment.
For example, a `development` environment for low-risk building of products, a `test` environment where stable products may be throughly tested (usually without real data) and a closely monitored and guarded `production` environment where live systems and data operate.
Organisations that run complex products with lots of resources may choose to run a product per environment, resulting in lots of accounts.
It is noteworthy that sharing data and services between accounts can increase costs and complexity but the separation decreases risks from compromises and mis-configuration.

## AWS SSO
When an organisation operates resources in many accounts, switching between them can become cumbersome.
AWS SSO is a service that allows simple access to different accounts from a single-sign on (SSO) portal managed by AWS (configured in the root account).
AWS SSO also allows setting MFA/2FA in addition to using a web-based login to authorise the AWS CLI.
This means sensitive CLI credentials do not need to be stored locally.
Once configured by an orgnisation administrator, SSO should be accessible via `https://<organisation>.awsapps.com/start`.

## AWS CLI

Installation of the CLI should take place per the [official AWS instructions](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) (`sudo` required on Linux).
### Installing the CLI
The installation steps are, run as a non-root user (from the docs above):
1. Download the archive
```shell
curl -L -o "awscliv2.zip" "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip"
```
2. Unzip the archive
```shell
unzip awscliv2.zip
```
3. Run the installation
```shell
sudo ./aws/install
```
4. Remove the archive
```shell
rm -rf awscliv2.zip
```
### Configuring the CLI with AWS SSO
Configuration of the CLI to integrate with SSO is as follows:
- Create an AWS CLI config file in the `.aws` directory in your home directory (`~`).
- Add the roles visible from the SSO portal to the config file
- Issue commands and specify a profile
- Launch a browser session to perform SSO login

To set the config, create or edit `~/.aws/config`, e.g. with `vi` or `nano`.  In this file enter the following, e.g for the `dev` environment, using the correct url, account id and role:
```conf
[profile org-dev]
sso_start_url = https://<orginsation>.awsapps.com/start
sso_region = eu-west-2
sso_account_id = 123456789012
sso_role_name = OrgEngineer
region = eu-west-2
```

To issue CLI commands, first login using the named pofile in the config, e.g. `org-dev`:
```shell
aws sso login --profile org-dev
```
This command will try to launch the default browser prompting for login.
To bypass this behaviour and manually launch the browser, precede the above command with `BROWSER=true`.
This will output the URL that should be visited to continue authentication.
Once logged in, regular CLI commands may be issued, for example to list s3 buckets:
```
aws --profile org-dev s3 ls
```
Or to list running EC2 instances:
```
aws --profile org-dev ec2 describe-instances
```
