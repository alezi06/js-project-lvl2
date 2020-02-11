#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version(process.env.npm_package_version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig,
    secondConfig) => console.log(gendiff(firstConfig, secondConfig, program.format)))
  .parse(process.argv);
