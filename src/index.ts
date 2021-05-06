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
      match: isInstalledModule(__filename),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import { isPhoneValid } from 'utils/isPhoneValid'
    {
      match: and(isAbsoluteModule, not(isInstalledModule(__filename))),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import { Heading } from "./styles"
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
}
