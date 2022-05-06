import * as sst from '@serverless-stack/resources';
import { MyStack } from './MyStack';

// eslint-disable-next-line fp/no-nil
export default function main(app: sst.App): void {
  // eslint-disable-next-line fp/no-unused-expression
  app.setDefaultFunctionProps({
    srcPath: 'backend',
    runtime: 'nodejs14.x',
    environment: {
			NODE_OPTIONS: '--enable-source-maps'
		}
  });

  // eslint-disable-next-line fp/no-unused-expression
  app.stack(MyStack);
}
