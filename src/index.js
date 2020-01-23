import program from 'commander';

export default () => {
  program
    .version(process.env.npm_package_version)
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};
