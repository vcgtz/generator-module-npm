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
        message: "What's the name of your package?",
        default: this.appname,
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: "What's the description of your project?",
        default: '',
      },
      {
        type: 'list',
        name: 'lang',
        message: 'Which programming language do you want to use?',
        choices: [
          {
            name: 'JavaScript',
            value: 'js',
          },
          {
            name: 'TypeScript',
            value: 'ts',
          },
        ],
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
      { projectName: this.answers.projectName }
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );

    if (this.answers.lang === 'ts') {
      this._setTypeScriptFiles();
    } else {
      this._setJavaScriptFiles();
    }
  }

  install() {
    this.env.options.nodePackageManager = 'npm';
  }

  async end() {
    if (this.answers.gitInit) {
      this.spawnCommand('git', ['init', '--quiet', '--initial-branch=main']);
    }

    this.log('');
    this.log(`Your NPM Module ${this.answers.projectName} has been created!`);
    this.log('');
  }

  _setJavaScriptFiles() {
    this.fs.copyTpl(
      this.templatePath('js/.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copyTpl(
      this.templatePath('js/package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription,
      }
    );

    this.fs.copyTpl(
      this.templatePath('js/index.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('js/index.test.js'),
      this.destinationPath('tests/index.test.js')
    );
  }

  _setTypeScriptFiles() {
    this.fs.copyTpl(
      this.templatePath('ts/.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copyTpl(
      this.templatePath('ts/jest.config.js'),
      this.destinationPath('jest.config.js')
    );

    this.fs.copyTpl(
      this.templatePath('ts/tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copyTpl(
      this.templatePath('ts/package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription,
      }
    );

    this.fs.copyTpl(
      this.templatePath('ts/index.ts'),
      this.destinationPath('src/index.ts')
    );

    this.fs.copyTpl(
      this.templatePath('ts/index.test.ts'),
      this.destinationPath('tests/index.test.ts')
    );
  }
};
