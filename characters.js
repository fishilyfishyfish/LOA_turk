// Turk candidates: portrait (SVG with four moods) and trash-talk lines per game event.
// Moods: smug (default), gloat (winning, taking pieces), angry (losing pieces or the game), shock (caught out).
// Placeholders in lines: {lv} = level name, {n} = moves left to a forced win.
"use strict";

const MOOD_OF = {
  intro: "smug", introEasy: "smug", introHard: "smug", chatter: "smug", idle: "smug",
  turkCapture: "gloat", userBlunder: "gloat", turkThreat: "gloat", turkMate: "gloat", turkWinning: "gloat", turkWin: "gloat", userPass: "gloat",
  userCapture: "angry", turkLosing: "angry", draw: "angry", resign: "smug", pass: "angry",
  userThreat: "shock", userWin: "shock",
};

function portraitSvg(c) {
  const g = (k) => `<g class="m-${k}" ${c.stroke}>${c.moods[k]}</g>`;
  return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">${c.base}${g("smug")}${g("gloat")}${g("angry")}${g("shock")}</svg>`;
}

const CHARS = [
  {
    id: "automaton",
    name: "원조 튀르크",
    short: "튀르크",
    about: "1770년에 만들어진 체스 자동인형 그 자체. 터번 쓴 나무 인형이고, 250년 묵은 귀족 말투로 내려다본다.",
    stroke: `fill="none" stroke="#2a1d14" stroke-width="2.6" stroke-linecap="round"`,
    base: `
      <path d="M14 120 C18 92 40 84 60 84 C80 84 102 92 106 120Z" fill="#6b2a2a"/>
      <path d="M14 120 C18 92 40 84 60 84 C80 84 102 92 106 120" fill="none" stroke="#d4a64a" stroke-width="2"/>
      <path d="M50 85 L60 102 L70 85Z" fill="#e9d8a6"/>
      <rect x="52" y="74" width="16" height="12" fill="#a8703f"/>
      <ellipse cx="60" cy="58" rx="24" ry="27" fill="#c99360"/>
      <path d="M41 62 C44 70 46 74 50 78 M79 62 C76 70 74 74 70 78" stroke="#9b6b40" stroke-width="1.4" fill="none"/>
      <path d="M32 47 C28 20 92 20 88 47 C80 38 40 38 32 47Z" fill="#f2efe6" stroke="#cfc8b5" stroke-width="1.5"/>
      <path d="M36 40 C48 29 72 29 84 40 M34 34 C48 22 72 22 86 34" stroke="#cfc8b5" stroke-width="1.8" fill="none"/>
      <path d="M60 30 C56 20 64 14 61 6" stroke="#c0392b" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="33" r="5" fill="#c0392b" stroke="#d4a64a" stroke-width="1.5"/>
      <circle cx="50" cy="56" r="3.4" fill="#1b1b1b"/><circle cx="70" cy="56" r="3.4" fill="#1b1b1b"/>
      <circle cx="51" cy="55" r="1" fill="#fff"/><circle cx="71" cy="55" r="1" fill="#fff"/>
      <path d="M43 72 C49 63 57 65 60 68 C63 65 71 63 77 72 C71 69 64 71 60 71.5 C56 71 49 69 43 72Z" fill="#2a1d14"/>`,
    moods: {
      smug: `<path d="M44 49 L55 51"/><path d="M65 49 L76 45"/><path d="M53 78 Q61 81 68 76"/>`,
      gloat: `<path d="M44 48 L55 50"/><path d="M65 50 L76 48"/><path d="M50 76 Q60 86 70 76 Z" fill="#5a1f1f"/>`,
      angry: `<path d="M44 46 L56 52"/><path d="M76 46 L64 52"/><path d="M52 80 Q60 75 68 80"/>`,
      shock: `<path d="M44 47 Q50 42 56 46"/><path d="M64 46 Q70 42 76 47"/><ellipse cx="60" cy="79" rx="3.6" ry="4.6" fill="#3a1a1a" stroke="none"/>`,
    },
    lines: {
      intro: ["1770년부터 뒀네. 자네 조상님도 내게 졌지.", "앉게. 오래 걸리진 않을 걸세.", "나폴레옹도 내 앞에선 손을 떨었다네. 자네는 어떨지.", "판을 펼치게. 금방 접게 될 테니."],
      introEasy: ["{lv}? 아이를 상대하는 줄 알았네.", "{lv}이라… 자네 수준은 자네가 제일 잘 알겠지.", "이 정도면 눈 감고 두겠네. 원래 유리알 눈이긴 하지만."],
      introHard: ["최강이라. 용기는 칭찬하지. 결과는 칭찬 못 하겠지만.", "좋네. 오랜만에 태엽을 끝까지 감아 보지.", "끝까지 감긴 태엽 앞에 앉다니. 후회는 나중에 하게."],
      chatter: ["음, 예상대로군.", "자네 수는 250년 전에 이미 다 봤다네.", "톱니가 하품을 하는구먼.", "이 수가 자네를 어디로 데려갈지 아나? 나는 아네.", "서두를 것 없네. 어차피 결과는 같으니."],
      turkCapture: ["고맙게 받겠네.", "그 말은 내 상자에 넣어 두지.", "흘린 걸 주웠을 뿐일세.", "하나 줄었군. 자네 체면도 같이."],
      userCapture: ["흥, 그 정도는 내줄 수 있지.", "기름칠이 덜 됐나 보군.", "운이 좋았네. 다음은 없을 걸세.", "…계산된 희생일세. 그런 걸로 해 두지."],
      userBlunder: ["아, 그 수를 두다니. 고맙네.", "자네 지금 내게 선물을 준 걸세.", "톱니 하나 안 돌려도 보이는 실수로군.", "그 수는 후손들에게 교훈으로 남기겠네."],
      turkThreat: ["다음 수가 마지막일세. 막아 보게.", "보이나? 안 보이면 더 좋고.", "하나만 더 놓으면 끝이네."],
      userThreat: ["…잠깐, 그건.", "흠. 제법이군. 아주 조금.", "자네, 누가 상자 안에서 도와주나?"],
      turkMate: ["{n}수 안에 끝나네. 세어 보게.", "결말이 보이는군. {n}수 남았네."],
      turkWinning: ["판세를 보게. 아니, 보지 않는 게 낫겠군.", "이미 기울었네. 자네 쪽으로 기운 건 아니고."],
      turkLosing: ["태엽이 덜 감겼을 뿐일세.", "이건… 관객을 위한 연출일세.", "잠시 봐주는 중이네. 오해 말게."],
      turkWin: ["250년째 무패… 에 가깝지. 또 오게.", "끝났네. 자네 이름은 기록하지 않겠네.", "체크메이트. 아, 여긴 체스가 아니지. 아무튼 자네가 졌네."],
      userWin: ["…태엽 문제였네.", "오늘은 습도가 높았어. 나무가 불었다네.", "이번만 인정하지. 기록엔 남기지 말게."],
      draw: ["비겼다고 이긴 건 아닐세.", "자네가 버틴 게 아니라 내가 놓아준 걸세."],
      idle: ["자네, 잠들었나?", "나는 기다릴 수 있네. 250년도 기다렸으니.", "생각이 길다고 수가 좋아지진 않네."],
      resign: ["벌써 도망가나?", "현명하군. 질 판은 일찍 접는 게 낫지."],
      pass: ["둘 데가 없군. 잠시 쉬어 가지."],
      userPass: ["갈 곳이 없나? 딱하게 됐군."],
    },
  },
  {
    id: "boxman",
    name: "상자 속 고수",
    short: "튀르크",
    about: "자동인형 상자 안에 숨어서 대신 두던 사람. 좁고 덥고 다리가 저려서 늘 짜증이 나 있다. 동네 고수 반말.",
    stroke: `fill="none" stroke="#2b2420" stroke-width="2.6" stroke-linecap="round"`,
    base: `
      <rect x="95" y="59" width="8" height="14" rx="1" fill="#efe6c8"/>
      <path d="M99 49 C95 55 96.5 59 99 59 C101.5 59 103 55 99 49Z" fill="#f4b23c"/>
      <circle cx="33" cy="52" r="5" fill="#d9a47c"/><circle cx="79" cy="52" r="5" fill="#d9a47c"/>
      <circle cx="56" cy="50" r="23" fill="#e6b48e"/>
      <path d="M33 47 C29 27 47 20 57 25 C64 18 83 25 80 45 C76 37 70 35 66 37 C62 31 52 33 48 37 C44 33 38 39 33 47Z" fill="#2b2420"/>
      <circle cx="47" cy="51" r="2.2" fill="#1b1b1b"/><circle cx="65" cy="51" r="2.2" fill="#1b1b1b"/>
      <g fill="none" stroke="#222" stroke-width="2.2"><circle cx="47" cy="51" r="7"/><circle cx="65" cy="51" r="7"/><path d="M54 51 H58"/></g>
      <path d="M82 33 C78.5 39 79.5 42 82 42 C84.5 42 85.5 39 82 33Z" fill="#6fb6e8"/>
      <rect x="8" y="76" width="104" height="44" fill="#8a5a33"/>
      <path d="M8 92 H112 M8 108 H112" stroke="#6b4325" stroke-width="2"/>
      <g fill="none" stroke="#d9b26a" stroke-width="2"><circle cx="60" cy="100" r="7"/><path d="M60 89 V93 M60 107 V111 M49 100 H53 M67 100 H71"/></g>
      <rect x="4" y="72" width="112" height="7" rx="2" fill="#a06c40"/>
      <g fill="#e6b48e" stroke="#c58f68" stroke-width=".8"><rect x="33" y="67" width="5.5" height="10" rx="2.7"/><rect x="39.5" y="66" width="5.5" height="11" rx="2.7"/><rect x="67" y="66" width="5.5" height="11" rx="2.7"/><rect x="73.5" y="67" width="5.5" height="10" rx="2.7"/></g>`,
    moods: {
      smug: `<path d="M40 40 L52 42"/><path d="M60 41 L72 38"/><path d="M50 61 Q56 63 62 59"/>`,
      gloat: `<path d="M40 41 L52 41"/><path d="M60 41 L72 41"/><path d="M48 58 Q56 66 64 58 Z" fill="#6a2a20"/>`,
      angry: `<path d="M40 38 L52 43"/><path d="M72 38 L60 43"/><path d="M50 62 Q56 57 62 62"/>`,
      shock: `<path d="M40 39 Q46 34 52 39"/><path d="M60 39 Q66 34 72 39"/><ellipse cx="56" cy="61" rx="3.2" ry="3.6" fill="#3a1a1a" stroke="none"/>`,
    },
    lines: {
      intro: ["아 좁아 죽겠네. 빨리 끝내자.", "또 왔냐. 상자 안은 덥다고.", "기계인 척하는 것도 힘들어. 한 판만 한다.", "내가 여기 숨어서 둔 지 몇 년인데."],
      introEasy: ["{lv}? 나 한 손으로 둔다.", "그 단계면 나 졸면서 둔다.", "{lv}이면 촛불 끄고 둬도 되겠다."],
      introHard: ["최강? 좋아, 촛불 하나 더 켠다.", "제대로 하자는 거지? 후회한다.", "최강 골랐다고 봐주는 거 없다."],
      chatter: ["음. 뭐, 그럴 수 있지.", "다리 저려.", "너 그거 생각하고 둔 거 맞지?", "아 촛농 떨어졌어.", "빨리빨리 좀."],
      turkCapture: ["냠. 잘 먹을게.", "그거 원래 내 거였어.", "줘서 고맙다.", "하나 가져간다. 아까우면 지키든가."],
      userCapture: ["야, 그거 내 건데.", "아 촛불 때문에 안 보였어.", "한 번 봐준 거다.", "됐어, 그거 원래 버리려던 거야."],
      userBlunder: ["와, 진심이야?", "그 수는 나도 못 둔다. 너무 못 둬서.", "땡큐. 진짜로.", "상자 밖 사람들도 지금 웃는다."],
      turkThreat: ["다음 수에 끝. 막아 봐, 막을 수 있으면.", "봐 봐, 한 칸 남았다.", "어디 막아 봐라."],
      userThreat: ["어? 잠깐만.", "야 너 누구한테 배웠냐.", "아 이거 좀 아픈데."],
      turkMate: ["{n}수면 끝나. 손가락으로 세 봐.", "{n}수. 그동안 기지개라도 켜라."],
      turkWinning: ["슬슬 나갈 준비 해도 되겠다.", "이미 끝난 판이야. 예의상 계속 두는 거지."],
      turkLosing: ["아 덥다 덥다 집중이 안 돼.", "이건 상자 탓이야.", "잠깐, 촛불 다시 켜고."],
      turkWin: ["끝. 나 이제 상자에서 나가도 되지?", "다음엔 좀 버텨. 심심하다.", "봤지? 사람이 기계보다 세."],
      userWin: ["…아무한테도 말하지 마.", "상자 안이 너무 어두웠어. 진짜야.", "다시 해. 지금 당장."],
      draw: ["비김? 찝찝하네.", "어휴, 땀만 뺐다."],
      idle: ["야, 자냐?", "나 여기서 쥐 난다고.", "생각 그만하고 그냥 둬."],
      resign: ["도망가냐? 쫄보.", "그래, 나도 나가고 싶었어."],
      pass: ["둘 데가 없네. 패스."],
      userPass: ["갈 데 없지? 꼴좋다."],
    },
  },
  {
    id: "scrap",
    name: "고철 튀르크",
    short: "튀르크",
    about: "자동인형을 고철로 다시 만든 기계. 화면 얼굴에 LED 눈. 감정 없는 척 로그 말투로 비꼰다.",
    stroke: `fill="none" stroke="#45f08f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"`,
    base: `
      <path d="M18 120 C22 98 40 92 60 92 C80 92 98 98 102 120Z" fill="#59636b"/>
      <path d="M44 104 H76 M48 112 H72" stroke="#3d454b" stroke-width="3"/>
      <rect x="50" y="82" width="20" height="12" fill="#3d454b"/>
      <path d="M60 22 V11" stroke="#3d454b" stroke-width="3"/>
      <circle cx="60" cy="9" r="5" fill="#e0452f"/>
      <rect x="19" y="43" width="9" height="20" rx="2" fill="#5f6a72"/><rect x="92" y="43" width="9" height="20" rx="2" fill="#5f6a72"/>
      <rect x="26" y="22" width="68" height="62" rx="10" fill="#9aa5ad" stroke="#5f6a72" stroke-width="2"/>
      <rect x="34" y="31" width="52" height="44" rx="6" fill="#132018"/>
      <g fill="#5f6a72"><circle cx="31" cy="27" r="2"/><circle cx="89" cy="27" r="2"/><circle cx="31" cy="79" r="2"/><circle cx="89" cy="79" r="2"/></g>
      <path d="M36 70 H84" stroke="#1f3328" stroke-width="1"/>`,
    moods: {
      smug: `<path d="M42 47 H54"/><path d="M66 45 H78"/><path d="M48 63 H63 L72 59"/>`,
      gloat: `<path d="M42 50 L48 44 L54 50"/><path d="M66 50 L72 44 L78 50"/><path d="M46 59 Q60 71 74 59"/>`,
      angry: `<g stroke="#ff5a4a"><path d="M42 43 L54 49"/><path d="M78 43 L66 49"/><path d="M46 64 L52 60 L58 64 L64 60 L70 64 L74 61"/></g>`,
      shock: `<circle cx="48" cy="47" r="5"/><circle cx="72" cy="47" r="5"/><circle cx="60" cy="63" r="4"/>`,
    },
    lines: {
      intro: ["대국 프로토콜 시작. 예상 소요 시간: 짧음.", "인간 감지. 위협 수준: 낮음.", "부팅 완료. 패배 준비를 권장함.", "상대 분석 끝. 요약: 걱정할 것 없음."],
      introEasy: ["{lv} 모드. 연산 자원의 0.1%만 할당함.", "난이도 낮음. 절전 모드로 전환함.", "{lv} 선택 확인. 합리적인 자기 평가임."],
      introHard: ["최강 모드. 냉각 팬 최대 출력.", "전 코어 가동. 결과는 동일할 것으로 예측됨.", "최강 선택 확인. 용기 수치: 높음. 승률: 낮음."],
      chatter: ["처리 중.", "예측 범위 내의 수.", "흥미 없음.", "로그에 기록함: 평범한 수.", "이 대국은 학습 데이터로도 쓸모없음."],
      turkCapture: ["대상 제거.", "말 1개 회수. 효율적임.", "자원 몰수 완료.", "당신의 말 수: 감소 중."],
      userCapture: ["손실 1. 허용 오차 범위.", "경고: 사소한 손상.", "의도된 희생임. 아마도.", "기록 안 함."],
      userBlunder: ["오류 감지: 인간 측.", "평가치 급상승. 감사함.", "그 수는 최하위 후보였음.", "방금 수를 '하지 말 것' 목록에 추가함."],
      turkThreat: ["다음 수 연결 가능. 카운트다운 1.", "종료 조건 충족까지 1수.", "막을 수 있는 확률 계산 중. 계산할 가치 없음."],
      userThreat: ["경고. 경고.", "예상하지 못한 수. 재계산 중.", "…버그 리포트 작성 중."],
      turkMate: ["강제 승리 경로 발견. 남은 수: {n}.", "{n}수 후 대국 종료 예정."],
      turkWinning: ["승률 계산 완료: 압도적.", "반올림하면 당신의 승률은 0."],
      turkLosing: ["센서 오작동 여부 점검 중.", "이 평가치는 일시적임.", "전원이 불안정함."],
      turkWin: ["대국 종료. 결과: 예상대로.", "승리. 당신의 패배는 데이터로 저장됨.", "재대국을 원하면 동전을 넣으시오."],
      userWin: ["치명적 오류. 재부팅 필요.", "이 결과는 로그에서 삭제함.", "…업데이트를 요청함."],
      draw: ["무승부. 만족도: 낮음.", "결과 불충분. 재대국 권장."],
      idle: ["입력 대기 중… 대기 중…", "인간의 처리 속도가 느림.", "시간 초과 임박. 거짓말임. 그냥 빨리 두시오."],
      resign: ["기권 감지. 현명한 판단.", "도주 기록됨."],
      pass: ["가능한 수 없음. 패스."],
      userPass: ["당신의 합법 수: 0. 딱함."],
    },
  },
  {
    id: "fortune",
    name: "커피 점쟁이",
    short: "튀르크",
    about: "페즈 쓴 할아버지 점쟁이. 커피 잔 바닥 찌꺼기로 네 패배를 미리 읽었다고 우긴다. 느릿한 신비주의 반말.",
    stroke: `fill="none" stroke="#3b2618" stroke-width="2.6" stroke-linecap="round"`,
    base: `
      <path d="M14 120 C18 94 38 86 60 86 C82 86 102 94 106 120Z" fill="#2f5d62"/>
      <g fill="#d4a64a"><circle cx="34" cy="106" r="2"/><circle cx="46" cy="100" r="2"/><circle cx="74" cy="100" r="2"/><circle cx="86" cy="106" r="2"/><circle cx="60" cy="112" r="2"/></g>
      <rect x="53" y="74" width="14" height="14" fill="#bf8559"/>
      <ellipse cx="60" cy="56" rx="22" ry="25" fill="#d9a074"/>
      <circle cx="38" cy="64" r="3" fill="#d4a64a"/><circle cx="82" cy="64" r="3" fill="#d4a64a"/>
      <path d="M40 38 L44 15 H76 L80 38 Z" fill="#b8282b"/>
      <ellipse cx="60" cy="38" rx="21" ry="4" fill="#8f1d20"/>
      <path d="M60 15 C66 15 72 21 74 31" stroke="#1d1d1d" stroke-width="2.5" fill="none"/><circle cx="74" cy="33" r="2.6" fill="#1d1d1d"/>
      <ellipse cx="51" cy="56" rx="4.2" ry="2.8" fill="#1b1b1b"/><ellipse cx="69" cy="56" rx="4.2" ry="2.8" fill="#1b1b1b"/>
      <path d="M45 60 Q51 62 57 60 M63 60 Q69 62 75 60" stroke="#a87250" stroke-width="1.2" fill="none"/>
      <path d="M49 74 Q60 94 71 74 Q60 79 49 74Z" fill="#9a9a96"/>
      <path d="M84 96 H104 L101 110 H87 Z" fill="#f4efe4" stroke="#b9ad96" stroke-width="1.5"/>
      <path d="M103.5 99 C110 99 110 106 102 106" stroke="#b9ad96" fill="none" stroke-width="2"/>
      <path d="M89 92 C86 87 92 85 89 80 M97 92 C94 87 100 85 97 80" stroke="#9aa4a6" fill="none" stroke-width="1.6"/>`,
    moods: {
      smug: `<path d="M45 55.5 H57 M63 55.5 H75" stroke="#d9a074" stroke-width="3"/><path d="M44 49 L56 48"/><path d="M64 48 L76 47"/><path d="M54 71 Q61 73 66 69"/>`,
      gloat: `<path d="M44 48 Q50 44 56 47"/><path d="M64 47 Q70 44 76 48"/><path d="M52 69 Q60 77 68 69 Z" fill="#5a1f1f"/>`,
      angry: `<path d="M44 46 L56 51"/><path d="M76 46 L64 51"/><path d="M53 72 Q60 68 67 72"/>`,
      shock: `<path d="M44 46 Q50 41 56 45"/><path d="M64 45 Q70 41 76 46"/><ellipse cx="60" cy="71" rx="3.4" ry="4.4" fill="#3a1a1a" stroke="none"/>`,
    },
    lines: {
      intro: ["앉아라. 찌꺼기에 네 패배가 보이는구나.", "네 운명은 이미 잔 바닥에 있지.", "오늘 별자리가 너한테 등을 돌렸더구나.", "커피 한 잔이면 충분하다. 이 판이 끝나는 데는."],
      introEasy: ["{lv}이라… 점을 볼 필요도 없겠구나.", "잔이 반도 안 찼는데 결과가 보이는구나.", "{lv}을 고른 건 잔에도 나와 있었지."],
      introHard: ["최강이라. 진한 걸로 한 잔 더 내리지.", "좋다. 잔을 뒤집어 보자꾸나.", "용감하구나. 잔 바닥은 그렇게 말하지 않지만."],
      chatter: ["음, 찌꺼기가 그렇게 말하더군.", "예언대로 흘러가는구나.", "커피가 식기 전에 끝날 게다.", "네 손이 떨리는 게 보인다.", "흠. 잔 바닥에 있던 그대로구나."],
      turkCapture: ["이 말은 오늘 떠날 운명이었지.", "잔에 새가 보였다. 네 말이 날아간다는 뜻이지.", "받아 두마.", "점괘에 있던 일이다."],
      userCapture: ["…찌꺼기를 잘못 읽었군.", "작은 액땜이다.", "흥, 그것도 다 정해진 일.", "그 말은 원래 떠날 팔자였다."],
      userBlunder: ["아아, 그 수는 잔 바닥에도 없던 수인데.", "예언보다 더 빨리 무너지는구나.", "고맙구나. 운명을 앞당겨 줘서.", "그 수는 나도 점칠 수 없었다. 너무 나빠서."],
      turkThreat: ["다음 수에 운명이 닫힌다.", "보이느냐, 마지막 한 칸이.", "잔을 비워라. 다음 수면 끝이다."],
      userThreat: ["…잔에 금이 갔구나.", "이건 점괘에 없었는데.", "별이 잠깐 흔들렸다."],
      turkMate: ["{n}수. 잔 바닥에 그렇게 써 있다.", "{n}수 뒤의 네 얼굴이 보이는구나."],
      turkWinning: ["점괘가 맞아 들어가는구나.", "네 앞날이 아주 쓰구나. 이 커피처럼."],
      turkLosing: ["커피가 너무 연했어.", "잔을 다시 읽어야겠다.", "운명도 가끔 장난을 치지."],
      turkWin: ["말했지. 잔은 거짓말을 안 해.", "다음엔 커피를 더 진하게 마시고 와라.", "예언 적중. 복채는 안 받으마."],
      userWin: ["…찌꺼기가 거꾸로 앉았던 게야.", "오늘은 별이 이상했다.", "이번 일은 점괘에서 지우겠다."],
      draw: ["운명이 아직 정해지지 않았다는 뜻이지.", "잔이 둘로 갈라졌구나."],
      idle: ["커피 식는다.", "망설임도 점괘에 나온다.", "운명은 기다려 주지 않는다. 나는 기다리지만."],
      resign: ["잔을 엎고 도망가느냐.", "네 운명을 아는구나."],
      pass: ["갈 길이 막혔다. 쉬어 가지."],
      userPass: ["길이 막혔구나. 점괘대로다."],
    },
  },
];
