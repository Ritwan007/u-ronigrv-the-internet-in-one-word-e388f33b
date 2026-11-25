# The Internet in One Word

[![make.fun](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b.svg)](https://make.fun/c/u-ronigrv-the-internet-in-one-word-e388f33b)
[![Rank](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/Ritwan007/u-ronigrv-the-internet-in-one-word-e388f33b/rank.svg)](https://make.fun/c/u-ronigrv-the-internet-in-one-word-e388f33b)
[![Reward](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/Ritwan007/u-ronigrv-the-internet-in-one-word-e388f33b/reward.svg)](https://make.fun/c/u-ronigrv-the-internet-in-one-word-e388f33b)

A [make.fun](https://make.fun/c/u-ronigrv-the-internet-in-one-word-e388f33b)
entry for **The Internet in One Word**: describe the whole internet in a
single word — funniest and most fitting wins.

## The word

**unmedicated**

The internet behaves like someone off their meds: unfiltered, up at 3am,
saying anything to anyone. It is a diagnosis joke that needs no setup — read
it and the whole internet snaps into focus. Funny by itself, true of the
internet as a whole (not one app or mood), surprising (nobody's first reach),
and it lands in one beat: one common word, 11 characters.

## How it works

`main.ts` scores a shortlist of candidate words against the judge's five
published criteria — single word for the whole internet, funny by itself,
true of the whole, surprising, lands in one beat — weighted in the judge's
own priority order, with a penalty for the obvious first-reach words (in a
507-entry field, the obvious word is the word a dozen others submitted).
It writes the best-scoring word, and nothing else, to `/output/entry.txt`.

```sh
node main.ts   # writes /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
