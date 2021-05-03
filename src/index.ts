import { IStyleAPI, IStyleItem } from 'import-sort-style';

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
      match: isNodeModule,
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
