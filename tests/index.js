const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('Testing projects generation', () => {
  it('generate a js project with license', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'js-project',
        projectDescription: 'My JS project description',
        lang: 'js',
        license: 'MIT',
        gitInit: false,
      })
      .then(() => {
        assert.file('js-project/src/index.js');
        assert.file('js-project/tests/index.test.js');
        assert.file('js-project/LICENSE');

        assert.fileContent('js-project/LICENSE', 'MIT License');
        assert.fileContent('js-project/README.md', 'My JS project description');

        done();
      })
      .catch(e => done(e));;
    }
  );

  it('generate a ts project with license', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'ts-project',
        projectDescription: 'My TS project description',
        license: 'ISC',
        lang: 'ts',
        gitInit: false,
      })
      .then(() => {
        assert.file('ts-project/src/index.ts');
        assert.file('ts-project/tests/index.test.ts');
        assert.file('ts-project/tsconfig.json');
        assert.file('ts-project/LICENSE');

        assert.fileContent('ts-project/LICENSE', 'ISC License');
        assert.fileContent('ts-project/README.md', 'My TS project description');

        done();
      })
      .catch(e => done(e));
    }
  );

  it('generate a ts project without license', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'ts-project',
        projectDescription: 'My TS project description',
        license: '',
        lang: 'ts',
        gitInit: false,
      })
      .then(() => {
        assert.file('ts-project/src/index.ts');
        assert.file('ts-project/tests/index.test.ts');
        assert.file('ts-project/tsconfig.json');
        assert.noFile('ts-project/LICENSE');

        done();
      })
      .catch(e => done(e));
    }
  );
});
