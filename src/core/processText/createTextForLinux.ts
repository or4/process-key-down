import { KeyDownValue } from './types';
import { isPressedAnyControl, isPressedOnly, hasShiftEquivalent, getTextWithControls } from './utils';
import { resetSequence, processUnicodeSequence } from './processUnicode';

export function createTextForLinux(value: KeyDownValue) {
    if (!isPressedAnyControl(value) || (isPressedOnly(value, 'isShift') && hasShiftEquivalent(value))) {
        resetSequence();
        return value.char;
    }

    if (isPressedOnly(value, ['isCtrl', 'isShift'])) {
        const text = processUnicodeSequence(value);

        if (text) {
            return text;
        }
    }

    resetSequence();

    return getTextWithControls(value);
}
