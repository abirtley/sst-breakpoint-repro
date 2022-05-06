import * as sst from '@serverless-stack/resources';

/* eslint-disable fp/no-this, fp/no-unused-expression */
// eslint-disable-next-line fp/no-class
export function MyStack({ stack, app }: sst.StackContext) {
  // Create the HTTP API
  const api = new sst.Api(stack, 'Api', {
    routes: {
      'GET /echo/{message}': 'services/echo.get',
    },
    defaults: {
      function: {
        memorySize: 512,
        logRetention: 120,
      },
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  stack.addOutputs({
    sstConsole: `https://console.serverless-stack.com/`,
    stackName: stack.stackName,
    stackRegion: stack.region,
  });
}
