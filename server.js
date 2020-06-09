var npm = require('npm');
npm.load(function(err) {
  // handle errors

  npm.command.run('start2', function(message) {
    // log installation progress
    console.log(message);
  });
});