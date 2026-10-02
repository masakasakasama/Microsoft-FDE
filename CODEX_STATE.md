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

## Current
- 公式ガイド確認済み。AB-100の将来改訂とAI-103の不足項目はauditへ記録。

## Next
- AB-100の10/14改訂の変更logと現行各module/questionを照合し、根拠付きで教材を更新する。
- AI-103の生成画像/video、音声、視覚prompt injectionの学習範囲を補う。

## Blockers
- 全60問の解説、試験提供言語・時間・価格は今回未検証。

## Verification
- 3 official study guide article bodies fetched and effective dates/domain weights compared
- node --check app.js / content.js; parser tests 3/3 passed
- Chrome AB-100 Study: published 2026-10-14 notice visible; JS errors=[]
- git diff --check passed

Updated at: 2026-10-02T16:42:09.194217+00:00
