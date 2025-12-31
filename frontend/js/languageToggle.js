// js/languageToggle.js

document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".language-pills span");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });
});
const translations = {
  en: {
    text: "Make the world your audience. Translate your voiceover, captions, and documentation in one click.",
    videoId: "1083881529"
  },
  es: {
    text: "Haz del mundo tu audiencia. Traduce tu voz, subtítulos y documentación con un clic.",
    videoId: "1083881529"
  },
  de: {
    text: "Machen Sie die Welt zu Ihrem Publikum. Übersetzen Sie Voiceover, Untertitel und Dokumentation mit einem Klick.",
    videoId: "1083880688"
  },
  ja: {
    text: "ワンクリックでナレーション、字幕、ドキュメントを翻訳します。",
    videoId: "1083880579"
  },
  hi: {
    text: "एक क्लिक में वॉइसओवर, कैप्शन और दस्तावेज़ का अनुवाद करें।",
    videoId: "1083880507"
  },
  ar: {
    text: "اجعل العالم جمهورك. ترجم التعليق الصوتي والتسميات التوضيحية والمستندات بنقرة واحدة.",
    videoId: "1083880639"
  }
};


const langButtons = document.querySelectorAll(".language-pills .lang");
const translateText = document.getElementById("translateText");
const translateVideo = document.getElementById("translateVideo");

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // UI active state
    langButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    const data = translations[lang];

    // Change text
    translateText.textContent = data.text;

    // Change video smoothly
    if (data.video) {
      translateVideo.pause();
      translateVideo.src = data.video;
      translateVideo.load();
      translateVideo.play().catch(() => {});
    }
  });
});
