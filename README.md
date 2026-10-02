# Microsoft FTE Study

GH-300 → AI-103 → AB-100 の順で Microsoft FTE バッジ取得を進めるための、個人学習用Webアプリです。

## Features

- 3試験を1つのダッシュボードで管理
- Microsoft Learnの最新Study Guideのskills measuredを学習単位として整理
- 60問の独自問題（各試験20問）
- 正答だけでなく、網羅率、2回以上の連続正解、Study完了、模試を分けて定着度を算出
- 回答後に「自信なし / 少し迷った / 自信あり」を記録
- 自信度と正誤に応じた復習間隔
- 誤答、未定着、復習期限到来をReviewへ集約
- 非公式20問 / 30分の模試
- localStorage保存、JSON Export / Import
- Android / desktop向けresponsive dark UI
- 依存ライブラリなしの静的サイト

## Study order

1. GH-300 GitHub Copilot
2. AI-103 Developing AI Apps and Agents on Azure
3. AB-100 Agentic AI Business Solutions Architect

## Official sources

- GH-300: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300
- AI-103: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103
- AB-100: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100

問題と解説は公式問題の転載ではなく、skills measuredをもとに独自作成しています。

## Readiness

`定着度 = 網羅率 × 0.25 + 全問題中の正答済み率 × 0.30 + Study完了率 × 0.15 + 2回以上連続正解した問題の割合 × 0.10 + 最新模試 × 0.20`

少数問だけを正解して定着度が過大になることを避けます。

## Run locally

```bash
python -m http.server 8000
```

Open http://localhost:8000

## Deploy

Static files only. GitHub Pages, Vercel, Cloudflare Pagesなどでそのまま配信できます。

## Import regression checks

Run `node --test scripts/progress-validation.test.mjs` for backup validation. With a local static server running, install `agent-browser` and run `TEST_BASE_URL=http://127.0.0.1:8000 node scripts/import-browser.test.mjs`. The isolated QA browser session checks malformed JSON, invalid maps, storage quota errors, cancelled selection, and valid imports. It seeds synthetic local progress only. `AGENT_BROWSER_BIN` can select an installed CLI path.
