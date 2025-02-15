import { convertSnakeToCamelCase } from '../convertSnakeToCamelCase';

describe('convertSnakeToCamelCase', () => {
    it('should convert snake_case keys to camelCase', () => {
        const input = {
            first_name: 'John',
            last_name: 'Doe',
            user_age: 30
        };
        const expectedOutput = {
            firstName: 'John',
            lastName: 'Doe',
            userAge: 30
        };
        expect(convertSnakeToCamelCase(input)).toEqual(expectedOutput);
    });

    it('should handle empty objects', () => {
        const input = {};
        const expectedOutput = {};
        expect(convertSnakeToCamelCase(input)).toEqual(expectedOutput);
    });

    it('should handle objects with no snake_case keys', () => {
        const input = {
            firstName: 'John',
            lastName: 'Doe'
        };
        const expectedOutput = {
            firstName: 'John',
            lastName: 'Doe'
        };
        expect(convertSnakeToCamelCase(input)).toEqual(expectedOutput);
    });
});