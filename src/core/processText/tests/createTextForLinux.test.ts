import { KeyDownValue } from '../types';
import { createTextForLinux } from '../createTextForLinux';
import * as processUnicode from '../processUnicode';

const value: KeyDownValue = {
    char: 'a',
    charOrig: 'a',
    code: 'KeyA',
    isShift: false,
    isCtrl: false,
    isAlt: false,
    isMeta: false,
};

describe('createTextForLinux', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should work for simple letter', () => {
        expect(createTextForLinux(value)).toEqual('a');
    });

    it('should work when key pressed and any control are not pressed', () => {
        jest.spyOn(processUnicode, 'resetSequence');
        expect(createTextForLinux(value)).toEqual('a');

        expect(processUnicode.resetSequence).toHaveBeenCalledTimes(1);
    });

    it('should work when pressed only shift and has shift equivalent', () => {
        jest.spyOn(processUnicode, 'resetSequence');
        expect(createTextForLinux({ ...value, isShift: true, char: 'A' })).toEqual('A');

        expect(processUnicode.resetSequence).toHaveBeenCalledTimes(1);
    });

    it('should work when pressed only shift and has not shift equivalent', () => {
        jest.spyOn(processUnicode, 'resetSequence');
        expect(createTextForLinux({ ...value, isShift: true, char: 'Escape', charOrig: 'Escape' })).toEqual(
            'Shift+Escape'
        );

        expect(processUnicode.resetSequence).toHaveBeenCalledTimes(1);
    });

    it('should work when pressed controls', () => {
        jest.spyOn(processUnicode, 'resetSequence');
        expect(
            createTextForLinux({ ...value, isCtrl: true, isAlt: true, isMeta: true, isShift: true, char: 'A' })
        ).toEqual('Ctrl+Shift+Alt+Cmd+a');

        expect(processUnicode.resetSequence).toHaveBeenCalledTimes(1);
    });

    it('should work when pressed unicode sequence', () => {
        const sequenceValue: KeyDownValue = {
            char: 'U',
            charOrig: 'u',
            code: 'KeyU',
            isShift: true,
            isCtrl: true,
            isAlt: false,
            isMeta: false,
        };

        jest.spyOn(processUnicode, 'resetSequence');
        expect(createTextForLinux({ ...sequenceValue, char: 'u' })).toEqual('u');
        expect(createTextForLinux({ ...sequenceValue, char: '2', charOrig: '2', code: 'Digit2' })).toEqual('u2');
        expect(createTextForLinux({ ...sequenceValue, char: '6', charOrig: '6', code: 'Digit6' })).toEqual('u26');
        expect(createTextForLinux({ ...sequenceValue, char: '3', charOrig: '3', code: 'Digit3' })).toEqual('u263');
        expect(createTextForLinux({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual('☺');
    });

    it('should call resetSequence when in the middle unicode sequence is pressed any key', () => {
        const sequenceValue: KeyDownValue = {
            char: 'U',
            charOrig: 'u',
            code: 'KeyU',
            isShift: true,
            isCtrl: true,
            isAlt: false,
            isMeta: false,
        };

        jest.spyOn(processUnicode, 'resetSequence');
        expect(createTextForLinux({ ...sequenceValue, char: 'u' })).toEqual('u');

        expect(createTextForLinux({ ...sequenceValue, char: '2', charOrig: '2', code: 'Digit2' })).toEqual('u2');
        expect(createTextForLinux({ ...sequenceValue, char: '6', charOrig: '6', code: 'Digit6' })).toEqual('u26');

        expect(createTextForLinux(value)).toEqual('a');
        expect(processUnicode.resetSequence).toHaveBeenCalledTimes(1);

        expect(createTextForLinux({ ...sequenceValue, char: '3', charOrig: '3', code: 'Numpad3' })).toEqual(
            'Ctrl+Shift+3'
        );
        expect(createTextForLinux({ ...sequenceValue, char: 'A', charOrig: 'a', code: 'KeyA' })).toEqual(
            'Ctrl+Shift+a'
        );
    });
});
