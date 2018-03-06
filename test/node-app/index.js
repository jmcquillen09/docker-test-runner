/**
 * Just a simple app to test the base-image Dockerfile to ensure that the
 * environment variables and param passing are working.
 */
var http = require('http'); 

http.createServer(function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.end(`
<html>
  <body>
    <h2>Base image test</h2>
    <p>
      This application is run inside a docker container using a base image of
      <code>ghostinspector/test-runner-node</code>. The following
      environment/cli variables are exposed as a part of the test and verified
      at build time using Ghost Inspector:
    </p>
    <ul>
      <!-- MY_ENV_VAR is provided through the application environment -->
      <li id="envVar">${process.env.MY_ENV_VAR}</li>

      <!-- cliVar is provided through the command line -->
      <li id="cliVar">${process.argv[2]}</li>

      <!-- sha is provided through the command line and also sent to the suite execute API call for verification -->
      <li id="sha">${process.argv[3]}</li>

      <!-- buildNumber is provided through the command line and is to test we can send more than one param to the API (tests the URL format 'foo=bar&wizards=awesome') -->
      <li id="buildNumber">${process.argv[4]}</li>
    </ul>
  </body>
</html>
  `); 
}).listen(8000);
console.log('Server running on port 8000.');
