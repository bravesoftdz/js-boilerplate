/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {schema} from "./mockDataSchema";
import fs from 'fs';
import chalk from 'chalk';

jsf.extend('faker', () => require('faker'));
const json = JSON.stringify(jsf.generate(schema));

fs.writeFile("./src/api/db.json", json, function (err) {
  err ?
    console.log(chalk.red(err)) :
    console.log(chalk.green("Mock data generated."));
});
