import { Construct, SecretValue, Stack, StackProps, Stage } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from "@aws-cdk/pipelines";
import { CdkpipelinesDemoStage } from './cdkpipelines-demo-stage';
/**
 * The stack that defines the application pipeline
 */
export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',
      selfMutation: true,
       // How it will be built and synthesized
       synth: new ShellStep('Synth', {
         // Where the source can be found
         input: CodePipelineSource.gitHub('hassanazharkhan/cdk-pipeline-demo', 'main', {
          authentication: SecretValue.secretsManager('GITHUB_TOKEN') as any,
         }),
         
         // Install dependencies, build and run cdk synth
         commands: [
           'npm ci',
           'npm run build',
           'npx cdk synth'
         ],
       }),
    });

    const preProd = new CdkpipelinesDemoStage(this, 'PreProd', {
      env: { account: '525813303752', region: 'us-east-1' }
     });
  
     const prod = new CdkpipelinesDemoStage(this, 'prod', {
      env: { account: '525813303752', region: 'us-east-1' }
     });
    // This is where we add the application stages
    pipeline.addStage(preProd as any, { });
    pipeline.addStage(prod as any, { 
      pre: [
        new ManualApprovalStep('PromoteToProd'),
      ]
    });
  }
}