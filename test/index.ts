import 'mocha';

import { expect } from 'chai';
import sortImports from 'import-sort';

import style from '../src/index';

const parser = require.resolve('import-sort-parser-typescript');

const unsortedCode = `import Process from 'lib/Process';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import { Server } from 'http';

import ReactMarkdown from 'react-markdown';
import configureMongoose from './configureMongoose';
import configureKafka from './configureKafka';
import configureLogging from './configureLogging';
import testPackage from '@atdrago/test-package';

import foo from '../foo';
import index from './';
import parent from '../';
import path from 'path';
import bar from '../../bar';

import ajv from 'ajv';
import typescript from 'typescript';
import { getEnv } from 'utils/getEnv';
import 'some-module-with-side-effects';

import configureMetrics from './configureMetrics';
import configureExpress from './configureExpress';
`;

const sortedCode = `import 'some-module-with-side-effects';

import { Server } from 'http';
import path from 'path';

import testPackage from '@atdrago/test-package';
import ajv from 'ajv';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import typescript from 'typescript';

import Process from 'lib/Process';
import { getEnv } from 'utils/getEnv';

import bar from '../../bar';
import parent from '../';
import foo from '../foo';
import index from './';
import configureExpress from './configureExpress';
import configureKafka from './configureKafka';
import configureLogging from './configureLogging';
import configureMetrics from './configureMetrics';
import configureMongoose from './configureMongoose';
`;

/**
 * Note: These tests work based off of the modules installed in this repository.
 * In some cases, modules have been installed for the sole purpose of testing
 * against them. Their version is pinned in the package.json, and we shouldn't
 * update these modules, unless it can be confirmed that the new module has the
 * same setup:
 *
 * - react-markdown@7.0.1 - needed for 'react-markdown/lib/complex-types.ts'
 */
describe('import-sort-style-atdrago', () => {
  it('sorts imports', () => {
    const sortResult = sortImports(unsortedCode, parser, style);

    expect(sortResult.code).to.eq(sortedCode);
  });
});
