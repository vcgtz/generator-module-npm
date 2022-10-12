const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    this.log(yosay('Welcome to the NPM Module generator!'));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s the name of your package?',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'What\'s the description of your project?',
        default: '',
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true,
      },
    ]);
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { projectName: this.answers.projectName },
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
    );

    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc'),
    );

    this.fs.copyTpl(
      this.templatePath('js/.eslintrc.js'),
      this.destinationPath('.eslintrc.js'),
    );

    this.fs.copyTpl(
      this.templatePath('js/package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription,
      },
    );

    this.fs.copyTpl(
      this.templatePath('js/index.js'),
      this.destinationPath('src/index.js'),
    );
  }
};
