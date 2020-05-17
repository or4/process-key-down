# Process key down

## Demo

https://process-key-down.s3.us-east-2.amazonaws.com/index.html

## Task

Создать react hook обрабатывающий нажатия клавиш на клавиатуре
Требования\критерии оценки:

1) Использование Typescript
2) Использование RxJS
3) Обработка сочетаний клавиш
4) Обработка ввода ASCII\Unicode символов
5) Отображение результата на canvas
6) Читаемость кода
7) Лаконичность кода

Примеры ожидаемого поведения:
Press: a
Result: 'a'

Press: Shift + a
Result: 'A'

Press: F1
Result: 'F1'

Press: Ctrl + Shift + a
Result: 'Ctrl+Shift+a'

(для windows)
Press: Alt + 1
Result: '☺️' // White Smiling Face Emoji

(для ubuntu)
Press: Ctrl + Shift + u + 2 + 6 + 3 + a
Result: '☺️' // White Smiling Face Emoji
