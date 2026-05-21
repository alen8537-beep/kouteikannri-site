'use strict';

{
    $(function(){
        $('.header__btn').on('click', function(){
            $('.nav').toggleClass('is-open');
        });

        $('.nav__btn, .nav__item a').on('click', function(){
            $('.nav').removeClass('is-open');
        });
    });

}

const shindanSlides = [
  { section: "基本情報", q: "Q1 現場数", opts: ["1〜3件", "4〜9件", "10件以上"] },
  { section: "基本情報", q: "Q2 工程管理方法", opts: ["紙", "Excel", "専用ソフト", "管理していない"] },
  { section: "現場状況", q: "Q3 遅延の発生頻度", opts: ["ほとんどない", "たまにある", "頻繁にある"] },
  { section: "現場状況", q: "Q4 人員体制", opts: ["十分", "やや不足", "不足している"] },
  { section: "運用・管理", q: "Q5 確認タイミング", opts: ["当日", "翌日", "二日以上", "気づかないことがある"] },
  { section: "運用・管理", q: "Q6 情報共有方法", opts: ["口頭", "LINE", "Excel", "専用ツール"] },
  { section: "運用・管理", q: "Q7 遅延時の対応ルール", opts: ["明確にある", "部分的にある", "その場対応"] },
];

let shindanCurrent = 0;
const shindanAnswers = new Array(shindanSlides.length).fill(null);

function renderShindan() {
  const progressEl = document.getElementById("shindanProgress");
  const slidesEl = document.getElementById("shindanSlides");
  const nextBtn = document.getElementById("shindanNext");
  const backBtn = document.getElementById("shindanBack");

  // progress dots
  progressEl.innerHTML = shindanSlides.map((_, i) =>
    `<div class="shindan__dot${i === shindanCurrent ? " active" : ""}"></div>`
  ).join("");

  if (shindanCurrent >= shindanSlides.length) {
    // 結果表示
   slidesEl.innerHTML = `
  <p class="shindan__section-label">診断結果</p>
  <p class="shindan__q-title" style="color:red">遅延リスク 78%</p>
  <p style="font-size:1.4rem;text-align:center;line-height:1.8">
    高リスク<br>進捗確認が2日以上遅れているため<br><br>
    ◆ 主な原因<br>情報共有が属人化しています<br><br>
    ◆ 改善提案<br>2日ルール導入・共有フロー整備
  </p>
  <a href="#dl-form" class="shindan__cta">無料で資料をダウンロード</a>`;
    nextBtn.style.display = "none";
    backBtn.style.visibility = "visible";
    return;
  }

  const s = shindanSlides[shindanCurrent];
  slidesEl.innerHTML = `
    <p class="shindan__section-label">${s.section}</p>
    <p class="shindan__q-title">${s.q}</p>
    <div class="shindan__options">
      ${s.opts.map((o, i) =>
        `<button class="shindan__opt${shindanAnswers[shindanCurrent] === i ? " selected" : ""}" data-i="${i}">${o}</button>`
      ).join("")}
    </div>`;

  document.querySelectorAll(".shindan__opt").forEach(btn => {
    btn.addEventListener("click", () => {
      shindanAnswers[shindanCurrent] = parseInt(btn.dataset.i);
      document.querySelectorAll(".shindan__opt").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.style.display = "block";
    });
  });

  nextBtn.style.display = shindanAnswers[shindanCurrent] !== null ? "block" : "none";
  nextBtn.textContent = shindanCurrent === shindanSlides.length - 1 ? "結果を見る" : "次へ ▶";
  backBtn.style.visibility = shindanCurrent === 0 ? "hidden" : "visible";
}

const shindanNextBtn = document.getElementById("shindanNext");
const shindanBackBtn = document.getElementById("shindanBack");

if (shindanNextBtn) {
    shindanNextBtn.addEventListener("click", () => {
        shindanCurrent++;
        renderShindan();
    });
    shindanBackBtn.addEventListener("click", () => {
        if (shindanCurrent > 0) { shindanCurrent--; renderShindan(); }
    });
    renderShindan();
}