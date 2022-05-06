**Steps to reproduce:**

1. Open folder in VS Code
1. Edit launch.json and add a valid AWS profile
1. Start debugging in VS Code
1. Try to add a breakpoint in backend/services/echo.ts
1. Invoke the /echo/message endpoint (eg using curl or the SST console)
1. Observe that you receive a result, but the breakpoint in VS Code is never triggered. If you hover over it, it says 'Unbound breakpoint'.

**Expected behaviour**

When debugging in VS Code, breakpoints should be triggered when your lambda function code executes.