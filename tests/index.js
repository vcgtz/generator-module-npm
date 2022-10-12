const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('Testing projects generation', () => {
  it('generate a js project', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'js-project',
        projectDescription: 'My JS project description',
        lang: 'js',
        gitInit: false,
      })
      .then(() => {
        assert.file('src/index.js');
        assert.file('tests/index.test.js');

        done();
      })
      .catch(e => done(e));;
    }
  );

  it('generate a ts project', (done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'ts-project',
        projectDescription: 'My TS project description',
        lang: 'ts',
        gitInit: false,
      })
      .then(() => {
        assert.file('src/index.ts');
        assert.file('tests/index.test.ts');
        assert.file('tsconfig.json');

        done();
      })
      .catch(e => done(e));
    }
  );
});
