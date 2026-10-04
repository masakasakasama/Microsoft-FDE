# Official guide audit

Checked at: 2026-10-02 UTC

The three official English Microsoft Learn pages were retrieved over HTTPS and their article bodies reviewed. Skills effective dates below come from the “Skills measured as of” heading, not HTML metadata or page “Last updated”. Localized exam updates may lag the English version; confirm the language and exam date before booking.

| Exam | Local snapshot | Published effective date | Result |
|---|---|---|---|
| [GH-300](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) | 2026-08-07 | 2026-08-07 | Six domain weights match the local summary. |
| [AI-103](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) | 2026-04-16 | 2026-04-16 | Five domain weights match the local summary. |
| [AB-100](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100) | 2026-07-22 | 2026-10-14 | Upcoming English revision on the audit date. Three domain weights remain 25–30%, 25–30%, 40–45%. |

## Scope differences and remaining work

- GH-300 includes productivity, testing, edge cases, and security improvements as a separate domain. The compact local modules are an outline, not evidence of complete question coverage.
- AI-103 explicitly covers generated images/video, multimodal visual understanding, indirect prompt injection in visual content, and speech solutions (STT/TTS, custom speech, audio reasoning, translation). The local “Vision & text” outline does not enumerate these objectives.
- AB-100's change log marks minor changes to overall AI strategy, AI/agent design, and ALM, with unchanged domain weights. The published outline includes customized small language models, MCP/Computer Use, reasoning/voice mode, and cross-platform ALM. Review each affected module and question against the effective version before changing the local July snapshot.
- The app now displays the AB-100 published revision date separately from its local snapshot date. No question answers, completed-module IDs, or learner progress were changed by this audit.
- This audit does not validate exam availability, languages, duration, pricing, all 60 answer explanations, or full syllabus coverage. These require separate official-source checks.

## AB-100 revision mapping (2026-10-02 refresh)

The official article was fetched again. Its change log marks the following three
objective groups as Minor; functional domain weights remain unchanged. The preview
uses the published October 14 objectives, while the assessed July 22 snapshot and
all existing module indexes/question IDs/answers remain unchanged.

| Published objective group | Existing module(s) | Existing questions reviewed | Additional preview scope |
|---|---|---|---|
| Analyze requirements / overall AI strategy | Requirements & AI strategy; Cross-platform architecture | ab100-01,02,03,04,18 | customized small language model use cases, build/buy/extend, TCO/ROI, prompt library, AI CoE |
| Design AI and agents | Agents & orchestration; Cross-platform architecture | ab100-05,06,07,08,19 | MCP extensibility, Computer Use, reasoning/voice mode, Teams/SharePoint |
| Security and architecture constraints | Security & governance | ab100-09,20 | Existing data boundaries/least privilege guidance retained |
| Analyze/monitor/tune and testing | Testing & monitoring | ab100-10,11,12,13,14 | No change-log claim of a changed group; current outline retained |
| Design ALM | ALM & deployment | ab100-15,16,17 | Data for models/agents, Copilot Studio dependencies, Foundry Agents Service, custom models and Dynamics 365 workloads |

All six modules and 20 AB-100 question prompts/explanations were compared at
objective level; no contradiction requiring an answer change was found. This is
not certification of exam-quality wording or complete coverage. Existing questions
do not test every new objective; the preview makes the missing learning scope
explicit without claiming that prior completions include it.

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100
Skills measured as of: October 14, 2026. Source article Last updated is distinct.

## AI-103 coverage supplement (2026-10-02 refresh)

The official English article was retrieved again. Its effective skills heading
remains April 16, 2026 and five domain weights match the local snapshot. Added
three Study modules at indexes 6–8, preserving all existing indexes 0–5 and
question IDs/answers. Prior completed modules do not mark these additions complete;
the Study denominator increases from 6 to 9. No progress migration or reset.

| Official objective group | Added Study module | Included skills |
|---|---|---|
| Computer vision: image/video generation | Image & video generation | text/reference media generation, inpainting/mask/prompt edits, video editing, platform controls |
| Computer vision: multimodal understanding/responsible AI | Multimodal vision & safety | grounded visual QA, caption/alt-text, video segments, Content Understanding modes, embedded-text indirect prompt injection, filters/policy |
| Text analysis: speech | Speech & audio | STT/TTS for agent interaction, custom speech, audio reasoning, speech translation |

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103
These are study outlines, not lab completion evidence or full question coverage.
The existing 20 AI-103 practice questions are unchanged and do not cover every
added objective. Exam duration, price and localized availability remain separate
unverified metadata.

## Exam metadata check (2026-10-04)

| Exam | Official offered Japanese | Assessment time | Official page |
|---|---|---|---|
| GH-300 | Yes | 100 minutes | https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/ |
| AI-103 | Yes | 120 minutes | https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/ |
| AB-100 | Yes (Japanese / ja listed) | Not stated in the retrieved pages; confirm when scheduling | https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-100/ |

GH-300 and AI-103 explicitly say “You will have 100/120 minutes to complete this
assessment.” AB-100's exam page and certification page list Japanese but do not
state an assessment duration. The local English-only label was corrected and the
unsourced “100–120 minutes” estimate was replaced with an explicit unknown.
AB-100 certification cross-check:
https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/

The pages say price depends on the country or region in which the exam is proctored.
No fixed price is stored. Learners are directed to confirm current price, duration
and offered language at booking. Metadata has a check date and direct official
exam link; Study guide sources remain separate. Study modules, all question IDs,
answers and stored progress are unchanged. The local 20-question/30-minute mock
is not the official assessment duration.
