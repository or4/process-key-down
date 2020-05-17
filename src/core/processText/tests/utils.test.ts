import {
    isPressedOnly,
    isPressedAnyControl,
    getControlText,
    hasAltEquivalent,
    hasShiftEquivalent,
    getCharOrig,
} from '../utils';
import { KeyDownValue } from '../types';

const value: KeyDownValue = {
    char: 'a',
    charOrig: 'a',
    code: 'KeyA',
    isShift: false,
    isCtrl: false,
    isAlt: false,
    isMeta: false,
};

describe('isPressedOnly', () => {
    describe('Single value', () => {
        it('should work when control is not pressed', () => {
            expect(isPressedOnly(value, 'isShift')).toEqual(false);
        });

        it('should work when control is not pressed but another control is pressed', () => {
            expect(isPressedOnly({ ...value, isCtrl: true }, 'isShift')).toEqual(false);
        });

        it('should work when control is pressed', () => {
            expect(isPressedOnly({ ...value, isShift: true }, 'isShift')).toEqual(true);
        });

        it('should work when control is pressed and another control is pressed too', () => {
            expect(isPressedOnly({ ...value, isShift: true, isCtrl: true }, 'isShift')).toEqual(false);
        });
    });

    describe('Argument is an array', () => {
        it('should work when control is not pressed', () => {
            expect(isPressedOnly(value, ['isCtrl', 'isShift'])).toEqual(false);
        });

        it('should work when control is not pressed but another control is pressed', () => {
            expect(isPressedOnly({ ...value, isAlt: true }, ['isCtrl', 'isShift'])).toEqual(false);
        });

        it('should work when control is pressed', () => {
            expect(isPressedOnly({ ...value, isCtrl: true, isShift: true }, ['isCtrl', 'isShift'])).toEqual(true);
        });

        it('should work when control is pressed and another control is pressed too', () => {
            expect(isPressedOnly({ ...value, isCtrl: true, isShift: true, isAlt: true }, 'isShift')).toEqual(false);
        });

        it('should work when one item of array is pressed but another not', () => {
            expect(isPressedOnly({ ...value, isShift: true }, ['isCtrl', 'isShift'])).toEqual(false);
        });
    });
});

describe('isPressedAnyControl', () => {
    it('should work when pressed Shift', () => {
        expect(isPressedAnyControl({ ...value, isShift: true })).toEqual(true);
    });

    it('should work when pressed Ctrl', () => {
        expect(isPressedAnyControl({ ...value, isCtrl: true })).toEqual(true);
    });

    it('should work when pressed Alt', () => {
        expect(isPressedAnyControl({ ...value, isAlt: true })).toEqual(true);
    });

    it('should work when pressed Meta', () => {
        expect(isPressedAnyControl({ ...value, isMeta: true })).toEqual(true);
    });

    it('should not work when not pressed any control key', () => {
        expect(isPressedAnyControl({ ...value })).toEqual(false);
    });
});

describe('getControlText', () => {
    it('should return empty when control keys are not pressed', () => {
        expect(getControlText(value)).toEqual('');
    });

    it('should return Ctrl+ when Ctrl is pressed', () => {
        expect(getControlText({ ...value, isCtrl: true })).toEqual('Ctrl+');
    });

    it('should return Shift+ when Shift is pressed', () => {
        expect(getControlText({ ...value, isShift: true })).toEqual('Shift+');
    });

    it('should return Alt+ when Alt is pressed', () => {
        expect(getControlText({ ...value, isAlt: true })).toEqual('Alt+');
    });

    it('should return Meta+ when Meta is pressed', () => {
        expect(getControlText({ ...value, isMeta: true })).toEqual('Cmd+');
    });

    it('should return Ctrl+Shift+ when Ctrl and Shift are pressed', () => {
        expect(getControlText({ ...value, isCtrl: true, isShift: true })).toEqual('Ctrl+Shift+');
    });

    it('should return Ctrl+Shift+Alt+Cmd+ when Ctrl, Shift, Alt, Cmd are pressed', () => {
        expect(getControlText({ ...value, isCtrl: true, isShift: true, isAlt: true, isMeta: true })).toEqual(
            'Ctrl+Shift+Alt+Cmd+'
        );
    });
});

describe('hasAltEquivalent', () => {
    it('should work when char and charOrig are different', () => {
        expect(hasAltEquivalent({ ...value, char: 'å', charOrig: 'a' })).toEqual(true);
    });

    it('should work when char and charOrig are equal', () => {
        expect(hasAltEquivalent({ ...value, char: 'Enter', charOrig: 'enter' })).toEqual(false);
    });

    it('should work when char is Escape', () => {
        expect(hasAltEquivalent({ ...value, char: 'Escape', charOrig: 'esc' })).toEqual(false);
    });
});

describe('hasShiftEquivalent', () => {
    it('should work when char and charOrig are different', () => {
        expect(hasShiftEquivalent({ ...value, char: 'A', charOrig: 'a' })).toEqual(true);
    });

    it('should work when char and charOrig are equal', () => {
        expect(hasShiftEquivalent({ ...value, char: 'Enter', charOrig: 'Enter' })).toEqual(false);
    });
});

describe('getCharOrig', () => {
    // @ts-ignore
    const event: KeyboardEvent = {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
        charCode: 0,
    };

    it('should work with letter', () => {
        expect(getCharOrig({ ...event, key: 'A', code: 'KeyA', keyCode: 65 })).toEqual('a');
    });

    it('should work with digit', () => {
        expect(getCharOrig({ ...event, key: '!', code: 'Digit1', keyCode: 49 })).toEqual('1');
    });

    it('should work with Enter', () => {
        expect(getCharOrig({ ...event, key: 'Enter', code: 'Enter', keyCode: 13 })).toEqual('Enter');
    });

    it('should work with spec symbol', () => {
        expect(getCharOrig({ ...event, key: '~', code: 'IntlBackslash', keyCode: 192 })).toEqual('`');
    });
});
