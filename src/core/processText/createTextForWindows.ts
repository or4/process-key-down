import { KeyDownValue } from './types';
import { isPressedOnly, isPressedAnyControl, getTextWithControls, hasAltEquivalent, hasShiftEquivalent } from './utils';

export function createTextForWindows(value: KeyDownValue) {
    if (
        !isPressedAnyControl(value) ||
        (isPressedOnly(value, 'isAlt') && hasAltEquivalent(value)) ||
        (isPressedOnly(value, 'isShift') && hasShiftEquivalent(value))
    ) {
        return value.char;
    }

    return getTextWithControls(value);
}
