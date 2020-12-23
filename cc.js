const { exec } = require("child_process");

var command = "npx crcf src/components/" + process.argv[2] + " -f";

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log("Component " + process.argv[2] + " created successfully.");
});
