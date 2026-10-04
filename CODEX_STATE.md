# CODEX_STATE

Status: blocked
Goal: 学習履歴の安全な保存とインポート

## Done
- 0178027の自信度記録後に次の問題へ進む修正と既存回帰scriptを確認。公開app.js/content.jsが最新mainと一致し、元のgithub.io URLでHTTP200、Pages配信CI成功を確認。
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

- 公式試験ページでGH-300 100分・AI-103 120分と3試験の日本語提供を照合。AB-100の英語限定表記を修正し、根拠のない100〜120分推定を未確認表示へ変更。確認日・公式リンク・地域/予約時点での料金確認を表示した。

## Current
- 言語・GH/AI時間・料金依存のNextを整合。AB-100時間だけは取得した公式ページに数値がなく未確認。既存問題/Study構成/進捗を保持。

## Next
- AB-100公式ページに試験時間が掲載される、または正規予約画面の確認結果が得られたら、未確認表示を根拠付きで更新する。一般的な試験区分から時間を推定しない。

## Blockers
- AB-100公式exam/certificationページに試験時間の明記がない。現在は未確認表示とし完了扱いにしない。独自問題の全範囲網羅・試験品質は保証していない。

## Verification
- 0178027 app.js syntax check passed; public app.js/content.js exactly match current main; Pages CI success. New confidence browser regression script inspected, not independently rerun in this review
- AB-100 exam/certification official pages HTTP200 rechecked; neither gives a numerical duration. Existing unconfirmed display and Next preserved
- Official pages fetched: GH-300 100 minutes; AI-103 120 minutes; Japanese available for all three; country/region-dependent pricing
- AB-100 duration absent from both retrieved official pages; no inferred number
- node --check content.js/app.js; progress parser 3/3 passed
- All 60 questions/answers, every existing module/domain, and study guide dates/sources preserved
- Chrome 390px: three metadata/source cards, price/booking note, existing localStorage progress unchanged; JS errors=[]
- git diff --check passed; static repository has no build/lint scripts

Updated at: 2026-10-04T10:05:25.416895+00:00
