# CODEX_STATE

Status: in_progress
Goal: 学習履歴の安全な保存とインポート

## Done
- v1履歴の必須map・回答・スコア・目標日型を検証し、壊れたimportを既存履歴へ適用しない。
- 永続保存が成功してからメモリ状態へ適用する。未知のトップレベル値を取り込まない。

- 隔離Chromeで不正JSON、不正map、保存容量エラー、キャンセル、正常importを実際のonchange経路で検証。
- 失敗時に永続履歴・画面・exportしたメモリ内履歴が維持されることを検証する再実行可能なbrowser scriptを追加。

- Microsoft Learnの公式3ガイド本文とskills適用日・domain weightsを確認し、docs/GUIDE_AUDIT.mdに記録。
- AB-100の2026-10-14適用改訂を現行教材の2026-07-22基準と分離してStudy画面へ表示。問題・履歴は変更なし。

- 公式AB-100本文を再取得し6modules/20問のobjective-level対応を記録。3 Minor変更groupの追加学習scopeを10/14改訂previewとして表示。
- 現在7/22基準日・module index・question ID/answer・学習履歴を維持。既存完了を新scope合格と扱わない。

- AI-103公式本文を再取得し2026-04-16適用の不足範囲を確認。画像/動画生成、multimodal vision/safety、speech/audioの3学習moduleを末尾へ追加。
- 旧6module indexと全60question/answerを保持。Chromeで旧6/9完了・新3未完了、保存履歴無変更を確認。

## Current
- AI-103不足Study scopeの補完が完了。既存学習履歴・問題採点を維持。追加内容は学習outlineで実lab完了を意味しない。

## Next
- 公式試験ページから提供言語・試験時間を照合し、未確認metadataを根拠付きで整合する。料金は地域/予約時点依存を明記する。

## Blockers
- 試験提供言語・時間・価格は未照合。独自問題の全範囲網羅・試験品質は保証していない。

## Verification
- AI-103 official article: April16 effective date and added objective groups verified
- node --check content.js/app.js; progress parser 3/3 passed
- All 60 questions/answers and prior AI-103 module indexes preserved
- Chrome: 9 modules, old 6 complete/new 3 incomplete, local progress unchanged, JS errors=[]
- git diff --check passed

Updated at: 2026-10-02T21:48:38.671279+00:00
