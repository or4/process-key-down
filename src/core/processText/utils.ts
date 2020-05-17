import keycode from 'keycode';

import { CONTROL_KEYS, CONTROL_KEYS_OUTPUT, KeyDownValue, ControlKeys } from './types';

export function isPressedOnly(value: KeyDownValue, control: ControlKeys | ControlKeys[]) {
    return CONTROL_KEYS.every((key: ControlKeys) => {
        if (Array.isArray(control) ? control.includes(key) : key === control) {
            return value[key];
        }

        return !value[key];
    });
}

export function isPressedAnyControl({ isCtrl, isMeta, isAlt, isShift }: KeyDownValue) {
    return isCtrl || isMeta || isAlt || isShift;
}

export function getTextWithControls(value: KeyDownValue) {
    return `${getControlText(value)}${value.charOrig}`;
}

export function getControlText(value: KeyDownValue) {
    return CONTROL_KEYS.reduce((output: string[], control: ControlKeys) => {
        if (value[control]) {
            output.push(CONTROL_KEYS_OUTPUT[control]);
        }

        return output;
    }, []).join('');
}

export function hasAltEquivalent({ char, charOrig }: KeyDownValue) {
    return char.toLowerCase() !== charOrig.toLowerCase() && char !== 'Escape';
}

export function hasShiftEquivalent({ char, charOrig }: KeyDownValue) {
    return char !== charOrig;
}

export function getCharOrig(event: KeyboardEvent) {
    // This lib return original character
    // for example: in macos when we press 'Shift+`' we get '~'
    // this lib return '`', this need to output like Shift+`
    const charOrig = keycode(event);

    // We use event.key for convinient
    // there are capital letters, and longer text, like Escape instead of esc
    return charOrig.length === 1 ? charOrig : event.key;
}
