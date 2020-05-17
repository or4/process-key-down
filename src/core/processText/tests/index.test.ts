import { createText } from '..';
import { KeyDownValue } from '../types';

describe('createText', () => {
    const value: KeyDownValue = {
        char: 'Control',
        charOrig: 'Control',
        code: '',
        isShift: false,
        isCtrl: false,
        isAlt: false,
        isMeta: false,
    };

    it('should skip control values', () => {
        expect(createText({ ...value })).toEqual('');
        expect(createText({ ...value, char: 'Alt' })).toEqual('');
        expect(createText({ ...value, char: 'Shift' })).toEqual('');
        expect(createText({ ...value, char: 'Meta' })).toEqual('');
    });
});
