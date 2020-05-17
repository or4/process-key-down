import { clear, mockUserAgent } from 'jest-useragent-mock';

import { isOS, OS, detectOs, osList } from './detectOs';

describe('detectOs', () => {
    beforeEach(() => {
        osList.length = 0;
    });
    afterEach(() => {
        clear();
    });

    it('should return windows', () => {
        const mockAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

        mockUserAgent(mockAgent);
        detectOs();
        expect(isOS(OS.Windows)).toEqual(true);
        expect(osList).toEqual(['windows']);
    });

    it('should return macos', () => {
        const mockAgent =
            '5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.96 YaBrowser/20.4.0.2442 Yowser/2.5 Yptp/1.23 Safari/537.36';

        mockUserAgent(mockAgent);
        detectOs();
        expect(isOS(OS.MacOS)).toEqual(true);
        expect(osList).toEqual(['macos']);
    });

    it('should return ubuntu', () => {
        const mockAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0';

        mockUserAgent(mockAgent);
        detectOs();
        expect(isOS(OS.Ubuntu)).toEqual(true);
        expect(osList).toEqual(['ubuntu', 'linux']);
    });

    it('should return unix', () => {
        const mockAgent =
            'Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6';

        mockUserAgent(mockAgent);
        detectOs();
        expect(isOS(OS.UNIX)).toEqual(true);
        expect(osList).toEqual(['unix']);
    });

    it('should return linux', () => {
        const mockAgent =
            'Mozilla/5.0 (X11; CentOS; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36';

        mockUserAgent(mockAgent);
        detectOs();
        expect(isOS(OS.Linux)).toEqual(true);
        expect(osList).toEqual(['linux']);
    });
});
