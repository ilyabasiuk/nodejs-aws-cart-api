import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import {
  Code,
  Function,
  FunctionUrlAuthType,
  HttpMethod,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';

import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_HOST);
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartApiLambda = new Function(this, 'cart-api', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: Code.fromAsset('../dist/'),
      timeout: Duration.seconds(10),
      environment: {
        DB_HOST: process.env.DB_HOST || '',
        DB_PORT: process.env.DB_PORT || '',
        DB_USER: process.env.DB_USER || '',
        DB_PASS: process.env.DB_PASS || '',
        DB_NAME: process.env.DB_NAME || '',
      },
    });

    // const cartApiLambda = new NodejsFunction(this, 'cart-api', {
    //   runtime: Runtime.NODEJS_20_X,
    //   entry: '../dist/main.js',
    //   timeout: Duration.seconds(10),
    //   environment: {
    //     DB_HOST: process.env.DB_HOST || '',
    //     DB_PORT: process.env.DB_PORT || '',
    //     DB_USER: process.env.DB_USER || '',
    //     DB_PASS: process.env.DB_PASS || '',
    //     DB_NAME: process.env.DB_NAME || '',
    //   },
    // });
    const cartApiUrl = cartApiLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [
          HttpMethod.GET,
          HttpMethod.POST,
          HttpMethod.PUT,
          HttpMethod.DELETE,
        ],
        allowedHeaders: ['*'],
      },
    });

    new CfnOutput(this, 'cart-api-lambda', {
      value: cartApiUrl.url,
    });
  }
}
