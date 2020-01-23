import program from 'commander';

export default () => {
  program
    .version(process.env.npm_package_version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => console.log(firstConfig, secondConfig))
    .parse(process.argv);
};
