import { KeyDownValue } from '../types';
import { processUnicodeSequence, resetSequence } from '../processUnicode';

const anyKeyValue: KeyDownValue = {
    char: 'a',
    charOrig: 'a',
    code: 'KeyA',
    isShift: false,
    isCtrl: false,
    isAlt: false,
    isMeta: false,
};

const sequenceValue: KeyDownValue = {
    char: 'U',
    charOrig: 'u',
    code: 'KeyU',
    isShift: true,
    isCtrl: true,
    isAlt: false,
    isMeta: false,
};

describe('processUnicodeSequence', () => {
    it('should work', () => {
        expect(processUnicodeSequence({ ...sequenceValue, char: 'u' })).toEqual('u');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('ua');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('uaa');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('uaaa');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('ꪪ');
    });

    it('should work with digits', () => {
        expect(processUnicodeSequence({ ...sequenceValue, char: 'u' })).toEqual('u');
        expect(processUnicodeSequence({ ...sequenceValue, char: '2', charOrig: '2', code: 'Digit2' })).toEqual('u2');
        expect(processUnicodeSequence({ ...sequenceValue, char: '6', charOrig: '6', code: 'Digit6' })).toEqual('u26');
        expect(processUnicodeSequence({ ...sequenceValue, char: '3', charOrig: '3', code: 'Digit3' })).toEqual('u263');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('☺');
    });

    it('should work with numpad', () => {
        expect(processUnicodeSequence({ ...sequenceValue, char: 'u' })).toEqual('u');
        expect(processUnicodeSequence({ ...sequenceValue, char: '2', charOrig: '2', code: 'Numpad2' })).toEqual('u2');
        expect(processUnicodeSequence({ ...sequenceValue, char: '6', charOrig: '6', code: 'Numpad6' })).toEqual('u26');
        expect(processUnicodeSequence({ ...sequenceValue, char: '3', charOrig: '3', code: 'Numpad3' })).toEqual('u263');
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('☺');
    });

    it('should reset when pressed any key in the middle unicode sequence', () => {
        expect(processUnicodeSequence({ ...sequenceValue, char: 'u' })).toEqual('u');
        expect(processUnicodeSequence({ ...sequenceValue, char: '2', charOrig: '2', code: 'Numpad2' })).toEqual('u2');
        expect(processUnicodeSequence({ ...sequenceValue, char: '6', charOrig: '6', code: 'Numpad6' })).toEqual('u26');
        resetSequence();
        expect(processUnicodeSequence({ ...sequenceValue, char: '3', charOrig: '3', code: 'Numpad3' })).toEqual(
            undefined
        );
        expect(processUnicodeSequence({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual(undefined);
    });

    it('should return undefined when pressed letter', () => {
        expect(processUnicodeSequence(anyKeyValue)).toEqual(undefined);
    });
});
