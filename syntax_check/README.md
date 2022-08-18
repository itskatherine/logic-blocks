# Syntax Checker

The aim of this task it to create a set of functions that are able to check a system of syntax for errors and eventually to autocomplete where syntax is incomplete but correct

This syntax is made of several lines containing **chunks**. There are one or more **chunks** on each line, and **chunks** contain zero or more other **chunks**. Adjacent **chunks** are not separated by any delimiter; if one chunk stops, the next chunk (if any) can immediately start. Every chunk must **open** and **close** with one of four legal pairs of matching characters:

- If a chunk opens with `(`, it must close with `)`.
- If a chunk opens with `[`, it must close with `]`.
- If a chunk opens with `{`, it must close with `}`.
- If a chunk opens with `<`, it must close with `>`.

So, `()` is a legal chunk that contains no other chunks, as is `[]`. More complex but valid chunks include `([])`, `{()()()}`, `<([{}])>`, `[<>({}){}[([])<>]]`, and even `(((((((((())))))))))`.

Some lines are **incomplete**, but others are **corrupted**.

## Part 1

The first task is to identify corrupted lines

A corrupted line is one where a chunk **closes with the wrong character** - that is, where the characters it opens and closes with do not form one of the four legal pairs listed above.

Examples of corrupted chunks include `(], {()()()>, (((()))}`, and `<([]){()}[{}])`. Such a chunk can appear anywhere within a line, and its presence causes the whole line to be considered corrupted.

At the bottom of this readme there are a number of lines, some are corrupt and some are incomplete, as the first part of the task we want to find the corrupt lines and the syntax error that is associated with it.

so given

```txt
([]
(]
{()()()>
<([{}
```

Stop at the first incorrect closing character on each corrupted line.
The expected output would be

```js
["line 2 expected ) found ]", "line 3 expected } found >"];
```

There are 5 erroneous lines in the given data

## Part 2

Now lets look at the **incomplete** lines.

Incomplete lines don't have any incorrect characters - instead, they're missing some closing characters at the end of the line. You need to figure out the **sequence of closing characters** that complete all open chunks in the line.

You can only use closing characters (`)`, `]`, `}`, or `>`), and you must add them in the correct order so that only legal pairs are formed and all chunks end up closed.

so given the data below the incomplete lines are 1 and 4

```
([]
(]
{()()()>
<([{}
```

and the expected output would be

`["line 1 missing )", "line 4 missing ])>"]`

There are 5 incomplete lines in the given data

### DATA

```txt
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
```

### Extra Challenge

Give a full output of both the erroneous and incomplete lines
