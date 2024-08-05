// Import the required modules
const dotenv = require('dotenv');
const { exec } = require('child_process');

// Load the environment variables from the .env file
dotenv.config();

// Extract the required environment variables
const { DB_HOST, DB_USER, DB_PASS } = process.env;

// Construct the command
const command = `eb create --cname rs-ib-cart-api --single --envvars DB_HOST=${DB_HOST},DB_USER=${DB_USER},DB_PASS=${DB_PASS}`;
console.log(command);
// Execute the command
// exec(command, (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
