# import-sort-style-atdrago

Adam's personal style for [import-sort](https://github.com/renke/import-sort).

Sorts imports with side effects first, then node modules, installed modules, absolute modules, and finally relative modules. Everything is sorted alphabetically (unicode), and relative modules are sorted from farthest to closest (i.e., number of dots), and then alphabetically.

Example:

```ts
// Modules with side effects
import 'some-module-with-side-effects';

// Node modules
import { Server } from 'http';

// Installed modules
import { Express } from 'express';
import winston from 'winston';

// Absolute modules
import Process from 'lib/Process';
import { getEnv } from 'utils/getEnv';

// Relative modules
import configureExpress from './configureExpress';
import configureKafka from './configureKafka';
import configureLogging from './configureLogging';
import configureMetrics from './configureMetrics';
import configureMongoose from './configureMongoose';
```
