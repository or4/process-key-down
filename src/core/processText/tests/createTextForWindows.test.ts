import { KeyDownValue } from '../types';
import { createTextForWindows } from '../createTextForWindows';

const value: KeyDownValue = {
    char: 'a',
    charOrig: 'a',
    code: 'KeyA',
    isShift: false,
    isCtrl: false,
    isAlt: false,
    isMeta: false,
};

describe('createTextForWindows', () => {
    it('should work for simple letter', () => {
        expect(createTextForWindows(value)).toEqual('a');
    });

    it('should work when any control are not pressed', () => {
        expect(createTextForWindows(value)).toEqual('a');
    });

    it('should work when pressed only alt and has alt equivalent', () => {
        expect(createTextForWindows({ ...value, isAlt: true, char: 'å' })).toEqual('å');
    });

    it('should work when pressed only alt and has not alt equivalent', () => {
        expect(createTextForWindows({ ...value, isAlt: true, char: 'Enter', charOrig: 'Enter' })).toEqual('Alt+Enter');
    });

    it('should work when pressed only shift and has shift equivalent', () => {
        expect(createTextForWindows({ ...value, isShift: true, char: 'A' })).toEqual('A');
    });

    it('should work when pressed only shift and has not shift equivalent', () => {
        expect(createTextForWindows({ ...value, isShift: true, char: 'Escape', charOrig: 'Escape' })).toEqual(
            'Shift+Escape'
        );
    });

    it('should work when pressed controls', () => {
        expect(
            createTextForWindows({ ...value, isCtrl: true, isAlt: true, isMeta: true, isShift: true, char: 'A' })
        ).toEqual('Ctrl+Shift+Alt+Cmd+a');
    });
});
