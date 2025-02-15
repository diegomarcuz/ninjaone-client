import { mapKeys, camelCase } from 'lodash';

export const convertSnakeToCamelCase = (obj: object) => {
    return mapKeys(obj, (_, key) => camelCase(key));
};