import { KeyDownValue } from './types';

let keypressSequence: string[] = [];

const unicodeRe = /(Numpad[0-9])|(Digit[0-9])|(Key[A-F])/gi;

const MAX_UNICODE_LENGTH = 5;

export function processUnicodeSequence(value: KeyDownValue): string | undefined {
    const { charOrig, code } = value;

    if (charOrig === 'u') {
        resetSequence({ initValue: charOrig });

        return sequenceToString();
    }

    const isMatchLength = keypressSequence.length > 0 && keypressSequence.length < MAX_UNICODE_LENGTH;
    unicodeRe.lastIndex = 0;

    if (isMatchLength && unicodeRe.test(code)) {
        keypressSequence.push(charOrig);

        if (keypressSequence.length === MAX_UNICODE_LENGTH) {
            return sequenceToString({ isUnicode: true });
        }

        return sequenceToString();
    }

    return;
}

interface ResetSequenceOptions {
    initValue?: string;
}

export function resetSequence({ initValue }: ResetSequenceOptions = {}) {
    if (keypressSequence.length > 0 || Boolean(initValue)) {
        keypressSequence = initValue ? [initValue] : [];
    }
}

interface SequenceToStringOptions {
    isUnicode?: boolean;
}

function sequenceToString(options: SequenceToStringOptions = {}) {
    if (options.isUnicode) {
        return String.fromCharCode(Number(`0x${keypressSequence.slice(1).join('')}`));
    }

    return keypressSequence.join('');
}
