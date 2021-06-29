import { IMatcherFunction, IStyleAPI, IStyleItem } from 'import-sort-style';

export default function (styleApi: IStyleAPI): IStyleItem[] {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isInstalledModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    not,
    or,
    unicode,
  } = styleApi;

  /**
   * Checks whether the import is a built-in Node module, but ignores the
   * deprecated 'constants' modules
   */
  const isNodeModuleAndNotConstants: IMatcherFunction = (imported) => {
    return (
      !imported.moduleName.startsWith('constants') && isNodeModule(imported)
    );
  };

  /**
   * Checks whether the import is only dots and slashes. In this case, in Node,
   * we would be importing an index file, which belongs in relative imports.
   */
  const isIndexImport: IMatcherFunction = (imported) => {
    return /^[\.\/]+$/.test(imported.moduleName);
  };

  return [
    // import 'foo';
    {
      match: hasNoMember,
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import path from 'path';
    {
      match: isNodeModuleAndNotConstants,
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import React, { useEffect } from 'react';
    {
      match: and(isInstalledModule(__filename), not(isIndexImport)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import { isPhoneValid } from 'utils/isPhoneValid'
    {
      match: and(
        isAbsoluteModule,
        not(isInstalledModule(__filename)),
        not(isIndexImport),
      ),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import { Heading } from "./styles"
    {
      match: or(isRelativeModule, isIndexImport),
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
}
