# Writing style

This guide covers everything the laboratory writes in its repositories: documentation, manuals, READMEs, code comments, commit messages, issues and pull requests. It applies in English and in Portuguese. A repository may add rules of its own; it may not relax these.

What we write is read by people who were not in the conversation that produced it, in laboratories that are not ours, and by agents that cannot ask what a sentence meant. Every rule here exists for them.

## English spelling

English text uses British spelling: colour, behaviour, centre, licence (the noun), artefact, catalogue, and -ise endings such as summarise and organise, as SOLAR and ZENITH already enforce. Names fixed by a product or a project keep their own spelling: a GitHub "organization", or the "Optimization" in the name of SAPHO. So do identifiers fixed by a library or a tool.

## Write plainly

Start with the answer. Do not announce what is coming and do not summarise what was just said.

Short sentences, one idea each. If a sentence would survive being deleted, delete it. Cut filler: "it is important to note that", "simply", "just", "obviously", "not only X but also Y", "in summary". A sentence that sounds good and says nothing goes entirely.

No emoji, no exclamation marks, no praise of the reader's question, no enthusiasm for its own sake.

State what you know, and say how you know it. An inference is written as an inference, with what it was inferred from. A number, a date or a result is checked against its source before it is written. If something is not known, say so and say where to check.

## Punctuation and emphasis

Do not use dashes as punctuation, in either language. Use a comma, a colon, a semicolon or parentheses instead.

No bold in running prose. Emphasis is rare and uses italics. Headings, table headers and the labels of a definition list are the only bold text in a document.

## Lists and tables

Prose is the default. A paragraph that connects its ideas explains more than a list that drops the connections.

Use a numbered list for a procedure whose steps happen in order. Use a bulleted list only when the items differ from each other and the reader will scan them. Use a table only for genuine reference: values the reader will look up, not text arranged in columns.

Every figure and every table is cited in the text before it appears.

## Names, numbers and units

Spell the projects as the laboratory does:

| Name | Meaning |
|---|---|
| NIPS-CERN | the laboratory |
| SAPHO | Scalable-Architecture Processor for Hardware Optimization |
| C± | the language of SAPHO, read "C plus-minus" |
| YANC | Yet Another Compiler, the C± compiler |
| AURORA | Advanced Utility Running Optimized Resource Architectures, the IDE of SAPHO |
| PRISM | Processor Rendering Interface for Schematic Models |
| Aurora Intelligence | the assistant inside AURORA |

Expand every other acronym the first time it appears in a document.

Numbers carry their units, with a space between them: `40 MHz`, `16 MiB`, `7.59 µs`. Use binary prefixes (KiB, MiB) for sizes in memory and on disk, decimal prefixes for everything else. A measurement says what was measured, on what, and how.

Dates in documents use ISO 8601: `2026-10-14`.

## Code comments

A comment says why, because the code already says what. A comment that restates the line below it is noise that will one day be wrong.

Three kinds of comment are always worth writing: the reason for a decision a reader would otherwise want to undo; the measurement behind a choice; and the section of a contract or a manual that a piece of code implements.

## Commit messages

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/). The subject is lower case, imperative, without a final full stop, and under seventy-two characters. These examples show the form; they do not describe real changes:

```text
feat(sim): report the cycle where the assertion failed
fix(asm): keep the label table sorted after an include
docs: update the manual to AURORA 6.21
```

The body says why, in prose. It carries the measurement that prompted the change, the alternative that was rejected, and anything the diff cannot show. A commit that fixes a defect says how the defect was found.

## Portuguese

Portuguese documentation is Brazilian Portuguese and follows every rule above. In addition:

- foreign words in running text are in italics, except the names of tools, languages and file formats;
- technical terms that the reader will meet in the software interface stay in the form the interface uses;
- the translation follows the meaning of the English source, not its sentence structure;
- "Aurora Intelligence" is feminine: "a Aurora Intelligence".

A translation is reviewed by a person other than the author of the English text, as the [guidelines](GUIDELINES.md) require.

## What the tools check

Each repository runs, in CI and in both languages, a spell checker and a Markdown linter, and blocks the build on their errors. Words the spell checker does not know are added to the repository word list with a reason, never silenced in place.
