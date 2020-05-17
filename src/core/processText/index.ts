import { OS, isOS } from 'utils/detectOs';

import { KeyDownValue, SKIP_KEY_DOWN_VALUES } from './types';
import { createTextForWindows } from './createTextForWindows';
import { createTextForLinux } from './createTextForLinux';

export function createText(value: KeyDownValue) {
    if (SKIP_KEY_DOWN_VALUES.includes(value.char)) {
        return '';
    }

    if (isOS(OS.Linux) || isOS(OS.UNIX)) {
        return createTextForLinux(value);
    }

    // this is text by default
    // there are windows, macos and other OS that are not defined
    return createTextForWindows(value);
}
