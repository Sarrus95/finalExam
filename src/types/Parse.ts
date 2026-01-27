export type ParseResults<T> = { results: T[] };

type ParseWhereValue =
    | string
    | number
    | boolean
    | { $gte?: number; $lte?: number };

export type ParseWhere = Record<string, ParseWhereValue>;