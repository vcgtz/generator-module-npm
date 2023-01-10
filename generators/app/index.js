const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');

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
    const folderName = this.answers.projectName
      .replace(/\s/g, '-')
      .toLowerCase();
    const folderPath = path.resolve(this.destinationPath(), folderName);

    this.destinationRoot(folderPath);
    this.env.cwd = this.destinationPath();

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { projectName: this.answers.projectName }
    );

    this.fs.copyTpl(
      this.templatePath('gitignore'),
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
      this.templatePath('js/index.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('js/index.test.js'),
      this.destinationPath('tests/index.test.js')
    );

    const packageJson = this._getPackageJson();
    packageJson.name = this.answers.projectName.toLowerCase().replace(/ /g, '-');
    packageJson.main = 'src/index.js';
    packageJson.description = this.answers.projectDescription;
    packageJson.license = 'MIT';
    packageJson.devDependencies = this._getJSDevDependencies();
    packageJson.scripts = this._getJSScripts();

    this.fs.extendJSON(this.destinationPath('package.json'), packageJson);
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
      this.templatePath('ts/index.ts'),
      this.destinationPath('src/index.ts')
    );

    this.fs.copyTpl(
      this.templatePath('ts/index.test.ts'),
      this.destinationPath('tests/index.test.ts')
    );

    const packageJson = this._getPackageJson();
    packageJson.name = this.answers.projectName.toLowerCase().replace(/ /g, '-');
    packageJson.main = 'dist/src/index.js';
    packageJson.types = 'dist/src/index.d.ts';
    packageJson.description = this.answers.projectDescription;
    packageJson.license = 'MIT';
    packageJson.devDependencies = this._getTSDevDependencies();
    packageJson.scripts = this._getTSScripts();

    this.fs.extendJSON(this.destinationPath('package.json'), packageJson);
  }

  // eslint-disable-next-line class-methods-use-this
  _getPackageJson() {
    return {
      name: '',
      version: '0.0.1',
      description: '',
      main: '',
      scripts: {
      },
      repository: {
        type: 'git',
        url: 'git+https://github.com/<user>/<repo>.git'
      },
      keywords: [
      ],
      author: '',
      license: '',
      bugs: {
        url: 'https://github.com/<user>/<repo>/issues'
      },
      homepage: 'https://github.com/<user>/<repo>#readme',
      dependencies: {
      },
      devDependencies: {
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  _getJSDevDependencies() {
    return {
      eslint: '^8.31.0',
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-config-prettier': '^8.6.0',
      'eslint-plugin-import': '^2.26.0',
      jest: '^29.3.1',
      prettier: '^2.8.2'
    };
  }

  // eslint-disable-next-line class-methods-use-this
  _getTSDevDependencies() {
    return {
      "@jest/globals": "^29.3.1",
      "@typescript-eslint/eslint-plugin": "^5.48.1",
      "@typescript-eslint/parser": "^5.48.1",
      eslint: "^8.31.0",
      "eslint-config-prettier": "^8.6.0",
      "eslint-plugin-import": "^2.26.0",
      jest: "^29.3.1",
      prettier: "^2.8.2",
      "ts-jest": "^29.0.3",
      typescript: "^4.9.4"
    };
  }

  // eslint-disable-next-line class-methods-use-this
  _getJSScripts() {
    return {
      format: 'prettier --write "src/**/*.js"',
      'format:check': 'prettier --check "src/**/*.js"',
      lint: 'eslint "src/**/*.js"',
      test: 'jest'
    };
  }

  // eslint-disable-next-line class-methods-use-this
  _getTSScripts() {
    return {
      format: 'prettier --write "src/**/*.{ts,js}"',
      "format:check": 'prettier --check "src/**/*.{js,ts}"',
      lint: 'eslint "src/**/*.{js,ts}"',
      test: 'jest',
      build: 'tsc',
    }
  }
};
