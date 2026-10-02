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

## Current
- AB-100将来改訂preview追加済み。AI-103不足scopeの補完は未着手。

## Next
- AI-103の生成画像/video、音声、視覚prompt injectionの学習範囲を公式sourceで補う。

## Blockers
- 試験提供言語・時間・価格と問題の試験品質/全範囲網羅は未検証。

## Verification
- Official AB-100 article effective October14 and 3 Minor change groups verified
- node --check app.js/content.js; progress parser 3/3 passed
- Chrome preview visible; existing 6 modules and stored progress unchanged; JS errors=[]
- git diff --check passed

Updated at: 2026-10-02T21:03:49.285911+00:00
