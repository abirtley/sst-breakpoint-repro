const fs = require('fs'); // eslint-disable-line
const path = require('path'); // eslint-disable-line

// Note - can't import from core/sst-outputs because this file
// is loaded by jest, not by us.
function getSstOutputs() {
  const stack = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../common/sst-start-outputs.json'),
      'utf8'
    )
  );
  const stackNames = Object.keys(stack).filter((key) =>
    Object.prototype.hasOwnProperty.call(stack, key)
  );
  if (stackNames.length !== 1) {
    // eslint-disable-next-line fp/no-throw
    throw new Error('Unable to determine stack name in the properties file.');
  }
  return stack[stackNames[0]];
}

// eslint-disable-next-line fp/no-nil
function setupEnvironmentVariables() {
  const stack = getSstOutputs();
  /* eslint-disable fp/no-mutation */
  process.env.CFN_STACK_NAME = process.env.CFN_STACK_NAME || stack.stackName;
  process.env.AWS_REGION = process.env.AWS_REGION || stack.stackRegion;
  process.env.AWS_PROFILE = process.env.AWS_PROFILE || stack.stackProfile;
  process.env.SLS_TEST_TOOLS_KEEP = process.env.SLS_TEST_TOOLS_KEEP || 'true';
  /* eslint-enable fp/no-mutation */
}

//eslint-disable-next-line fp/no-unused-expression
setupEnvironmentVariables();

const standardTransform = [
  'esbuild-jest',
  {
    sourcemap: true,
  },
];

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.*test.(ts|tsx|js)'],
  transform: {
    '\\.ts$': standardTransform,
  },
  collectCoverageFrom: ['(functions|core|services)/**/*.{ts,js}'],
  // Note: if you have more than 1 worker, then Jest spins up worker child processes,
  // but it *doesn't* pass command line arguments to those subprocesses. That breaks
  // sls-test-tools, which requires things to be passed on the command line.
  // see https://stackoverflow.com/questions/67456849/cant-get-full-process-argv-list-when-passing-custom-arguments-to-jest
  maxWorkers: 1,
};
