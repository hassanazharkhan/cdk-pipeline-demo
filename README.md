# Cdk Pipeline Demo

The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework to define cloud infrastructure in familiar programming languages and provision it through AWS CloudFormation. The AWS CDK consists of three major components:

* The core framework for modeling reusable infrastructure components
* A CLI for deploying CDK applications
* The AWS Construct Library, a set of high-level components that abstract cloud resources and encapsulate proven defaults
* The CDK makes it easy to deploy an application to the AWS Cloud from your workstation by simply running `cdk deploy`. This is great when you’re doing initial development and testing, but you should deploy production workloads through more reliable, automated pipelines.

# Prerequisites

* You’ll need a GitHub account and have created a GitHub repository to hold the source code.
* To have AWS CodePipeline read from this GitHub repo, you also need to have a GitHub personal access token stored as a plaintext secret (not a JSON secret) in AWS Secrets Manager under the name github-token. The token should have the scopes repo and admin:repo_hook.

* You have to bootstrap every environment you plan to deploy a CDK application to
    * Where you want to provision the pipeline
    * Where you plan to deploy applications to using the pipeline

You only need to do this one time per environment where you want to deploy CDK applications. If you’re unsure whether your environment has been bootstrapped already, you can always run the command again.


```
export CDK_NEW_BOOTSTRAP=1

npx cdk bootstrap \
  --profile account1-profile \
  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
  aws://ACCOUNT1/us-east-2
```
Trust Relationship with Cross account

```
npx cdk bootstrap \
  --profile counterweight-dev \
  --trust ACCOUNT1 \
  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
  aws://ACCOUNT2/us-west-2

```

Note - CDK_NEW_BOOTSTRAP needs to be exported as modern pipeline which we are using in this demo required modern bootstrap env, preferably version 6 or greater
Read more about modern pipeline - https://github.com/aws/aws-cdk/tree/master/packages/%40aws-cdk/pipelines

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
