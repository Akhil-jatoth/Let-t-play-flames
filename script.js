const languageSelect = document.getElementById("languageSelect");

const LANG = {
    en: {
        play: "Let’s Play Flames",
        first: "First Name",
        second: "Second Name",
        reveal: "Reveal",
        result: {
            F: "Friends",
            L: "Lovers",
            A: "Affectionate",
            M: "Marriage",
            E: "Enemies",
            S: "Siblings"
        }
    },
    ta: {
        play: "FLAMES விளையாடலாம்",
        first: "முதல் பெயர்",
        second: "இரண்டாம் பெயர்",
        reveal: "வெளிப்படுத்து",
        result: {
            F: "நண்பர்கள்",
            L: "காதலர்கள்",
            A: "பாசம்",
            M: "திருமணம்",
            E: "எதிரிகள்",
            S: "சகோதரர்கள்"
        }
    },
    hi: {
        play: "FLAMES खेलें",
        first: "पहला नाम",
        second: "दूसरा नाम",
        reveal: "परिणाम",
        result: {
            F: "दोस्त",
            L: "प्रेमी",
            A: "स्नेह",
            M: "विवाह",
            E: "दुश्मन",
            S: "भाई-बहन"
        }
    }
};

function applyLanguage(lang) {
    const L = LANG[lang];

    document.querySelector(".title").innerText = L.play;
    name1.placeholder = L.first;
    name2.placeholder = L.second;
    checkBtn.innerText = L.reveal;
}

languageSelect.addEventListener("change", e => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
});

// ================= ELEMENTS =================
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const overlay = document.getElementById("emojiOverlay");

const historyPanel = document.getElementById("historyPanel");
const settingsPanel = document.getElementById("settingsPanel");

const historyBtn = document.getElementById("historyBtn");
const settingsBtn = document.getElementById("settingsBtn");
const checkBtn = document.getElementById("checkBtn");

const darkMode = document.getElementById("darkMode");
const fontSize = document.getElementById("fontSize");


// ================= INPUT FLOW =================
name1.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        name2.focus();
    }
});

name2.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    }
});

checkBtn.addEventListener("click", calculate);

// ================= SIDEBARS =================
// historyBtn.addEventListener("click", e => {
//     e.stopPropagation();
//     historyPanel.classList.toggle("hidden");
//     settingsPanel.classList.add("hidden");
// });

// settingsBtn.addEventListener("click", e => {
//     e.stopPropagation();
//     settingsPanel.classList.toggle("hidden");
//     historyPanel.classList.add("hidden");
// });

// document.addEventListener("click", () => {
//     historyPanel.classList.add("hidden");
//     settingsPanel.classList.add("hidden");
// });



document.addEventListener("click", (e) => {
    if (
        !historyPanel.contains(e.target) &&
        !settingsPanel.contains(e.target) &&
        !historyBtn.contains(e.target) &&
        !settingsBtn.contains(e.target)
    ) {
        historyPanel.classList.add("hidden");
        settingsPanel.classList.add("hidden");
    }
});




settingsBtn.addEventListener("click", e => {
    e.stopPropagation();

    settingsPanel.classList.toggle("hidden");
    historyPanel.classList.add("hidden");

    // close menu
    sideMenu.classList.remove("show");
});





document.addEventListener("click", (e) => {
    const clickedInsideHistory =
        historyPanel.contains(e.target) || historyBtn.contains(e.target);

    const clickedInsideSettings =
        settingsPanel.contains(e.target) || settingsBtn.contains(e.target);

    if (!clickedInsideHistory && !clickedInsideSettings) {
        historyPanel.classList.add("hidden");
        settingsPanel.classList.add("hidden");
    }
});





document.addEventListener("click", (e) => {
    const clickedInsideHistory =
        historyPanel.contains(e.target) || historyBtn.contains(e.target);

    const clickedInsideSettings =
        settingsPanel.contains(e.target) || settingsBtn.contains(e.target);

    if (!clickedInsideHistory && !clickedInsideSettings) {
        historyPanel.classList.add("hidden");
        settingsPanel.classList.add("hidden");
    }
});




// historyPanel.addEventListener("click", e => e.stopPropagation());
// settingsPanel.addEventListener("click", e => e.stopPropagation());

// ================= DARK MODE (PERSISTENT) =================
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkMode.checked = true;
}

darkMode.addEventListener("change", e => {
    if (e.target.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});

// ================= FONT SIZE =================
fontSize.addEventListener("change", e => {
    document.body.style.fontSize = e.target.value + "px";
});

// ================= FLAMES LOGIC =================
function calculate() {
    let a = name1.value.toLowerCase().replace(/\s+/g, "");
    let b = name2.value.toLowerCase().replace(/\s+/g, "");

    if (!a || !b) return;

    let arr1 = a.split("");
    let arr2 = b.split("");

    // 🔥 REMOVE ALL COMMON LETTERS (INCLUDING REPEATS)
    const commonLetters = arr1.filter(ch => arr2.includes(ch));
    arr1 = arr1.filter(ch => !commonLetters.includes(ch));
    arr2 = arr2.filter(ch => !commonLetters.includes(ch));

    const count = arr1.length + arr2.length;

    let flames = ["F", "L", "A", "M", "E", "S"];
    let pos = 0;

    // 🔁 CONTINUE FROM REMOVED LETTER
    while (flames.length > 1) {
        pos = (pos + count - 1) % flames.length;
        flames.splice(pos, 1);
    }

    const map = {
        F: ["Friends", "🤝"],
        L: ["Lovers", "❤️"],
        A: ["Affectionate", "💖"],
        M: ["Marriage", "💍"],
        E: ["Enemies", "😡"],
        S: ["Siblings", "👨‍👩‍👧‍👦"]
    };

    // const [text, emoji] = map[flames[0]];

    const lang = languageSelect.value;
    const relationKey = flames[0];
    const text = LANG[lang].result[relationKey];
    const emoji = map[relationKey][1];

    result.innerText = `${emoji} ${text}`;

    const entry = `${name1.value} ❤ ${name2.value} → ${emoji} ${text}`;

    const li = document.createElement("li");
    li.innerHTML = entry;
    historyList.prepend(li);

    // saveHistory(entry);



// // const entry = `${name1.value} ❤ ${name2.value} → ${emoji} ${text}`;
// // saveHistory(entry);
// loadHistory();



// const entry = `${name1.value} ❤ ${name2.value} → ${emoji} ${text}`;

    // saveHistory(entry);
    // loadHistory();




    const names = `${name1.value} ❤ ${name2.value}`;
    saveHistory(names, emoji, text);
    loadHistory();



    emojiBurst(emoji);

    name1.value = "";
    name2.value = "";
    name1.focus();


//     function saveHistory(entry) {
//     const history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
//     history.unshift(entry); // latest first
//     localStorage.setItem("flamesHistory", JSON.stringify(history));
// }



    // const names = `${name1.value} ❤ ${name2.value}`;
    // saveHistory(names, emoji, text);
    // loadHistory();


}

// ================= EMOJI EFFECT =================
function emojiBurst(emoji) {
    overlay.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const e = document.createElement("div");
        e.className = "emoji";
        e.textContent = emoji;
        e.style.fontSize = 20 + Math.random() * 30 + "px";
        overlay.appendChild(e);
    }

    setTimeout(() => {
        overlay.innerHTML = "";
    }, 3000);
}

// ================= BACKGROUND FLOATING FLAMES =================
const bgFlames = document.getElementById("bgFlames");
const FLAME_COUNT = 20 ;
function createFlames() {
    bgFlames.innerHTML = "";

    for (let i = 0; i < FLAME_COUNT; i++) {
        const flame = document.createElement("div");
        flame.className = "bg-flame";
        flame.textContent = "FLAMES";

        flame.style.left = Math.random() * 100 + "%";

        // keep flames mostly on sides
        // flame.style.left = Math.random() < 0.5
        // ? Math.random() * 15 + "%"       // left side
        // : 85 + Math.random() * 15 + "%"; // right side

        flame.style.top = Math.random() * 100 + "%";

        flame.style.fontSize = 16 + Math.random() * 30 + "px";
        flame.style.animationDuration = 15 + Math.random() * 20 + "s";

        // floating distance
        flame.style.setProperty("--x", (Math.random() * 120 - 60) + "px");
        flame.style.setProperty("--y", (Math.random() * 120 - 60) + "px");

        flame.style.color = getComputedStyle(document.body)
            .getPropertyValue("--flame-color") || "black";

        bgFlames.appendChild(flame);
    }
}

// recreate flames on load
createFlames();

// update flame color on theme change
darkMode.addEventListener("change", createFlames);


// ✨ TOUCH / CLICK RIPPLE EFFECT
document.addEventListener("pointerdown", e => {
    const ripple = document.createElement("div");
    ripple.className = "touch-ripple";

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 800);
});




// History
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    sideMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
    sideMenu.classList.remove("show");
});

sideMenu.addEventListener("click", e => e.stopPropagation());



historyBtn.addEventListener("click", e => {
    e.stopPropagation();

    historyPanel.classList.toggle("hidden");
    settingsPanel.classList.add("hidden");

    // 🔥 CLOSE MENU
    sideMenu.classList.remove("show");
});



// Setting
// settingsBtn.addEventListener("click", e => {
//     e.stopPropagation();

//     settingsPanel.classList.toggle("hidden");
//     historyPanel.classList.add("hidden");

//     // 🔥 CLOSE MENU
//     sideMenu.classList.remove("show");
// });


// language
languageSelect.addEventListener("change", () => {
    sideMenu.classList.remove("show");
});





// ================= VOICE AI CONTROL =================
const micBtn = document.getElementById("micBtn");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.onclick = () => {
        recognition.start();
        micBtn.classList.add("listening");
    };

    recognition.onend = () => {
        micBtn.classList.remove("listening");
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(text);
    };
}



function handleVoiceCommand(command) {

    // 🔥 FLAMES CHECK
    if (command.includes("check flames")) {
        const cleaned = command.replace("check flames between", "").trim();
        const parts = cleaned.split("and");

        if (parts.length === 2) {
            name1.value = parts[0].trim();
            name2.value = parts[1].trim();
            calculate();
        }
    }

    // 🌙 DARK MODE
    else if (command.includes("dark mode")) {
        darkMode.checked = true;
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }

    // ☀️ LIGHT MODE
    else if (command.includes("light mode")) {
        darkMode.checked = false;
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }

    // 📜 OPEN HISTORY
    else if (command.includes("open history")) {
        historyPanel.classList.remove("hidden");
        settingsPanel.classList.add("hidden");
    }

    // ⚙ OPEN SETTINGS
    else if (command.includes("open settings")) {
        settingsPanel.classList.remove("hidden");
        historyPanel.classList.add("hidden");
    }


    // 🗑 DELETE LAST HISTORY
    else if (
        command.includes("delete last history") ||
        command.includes("remove last history")
    ) {
        deleteLastHistory();
    }


    // ❌ CLOSE ALL
    else if (command.includes("close")) {
        historyPanel.classList.add("hidden");
        settingsPanel.classList.add("hidden");
    }

    else {
        alert("❌ Command not recognized");
    }
}





function loadHistory() {
    const history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
    historyList.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        historyList.appendChild(li);
    });
}

loadHistory();


function clearHistory() {
    localStorage.removeItem("flamesHistory");
    historyList.innerHTML = "";
}




// Save history as objects
// function saveHistory(text) {
//     const history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
//     history.unshift({ id: Date.now(), text });
//     localStorage.setItem("flamesHistory", JSON.stringify(history));
// }




// Load history with 3-dot menu
function loadHistory() {
    const history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
    historyList.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.className = "history-item";

        li.innerHTML = `
            <span>
                ${item.names} → ${item.emoji} ${item.relation}
            </span>
            <button class="menu-btn">⋮</button>
            <div class="history-menu hidden">
                <button onclick="deleteHistory(${item.id})">Delete</button>
            </div>
        `;

        const btn = li.querySelector(".menu-btn");
        const menu = li.querySelector(".history-menu");

        btn.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll(".history-menu")
              .forEach(m => m.classList.add("hidden"));
            menu.classList.toggle("hidden");
        };

        document.addEventListener("click", () => {
            menu.classList.add("hidden");
        });

        historyList.appendChild(li);
    });
}





// delete single history
// function deleteHistory(id) {
//     let history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
//     history = history.filter(item => item.id !== id);
//     localStorage.setItem("flamesHistory", JSON.stringify(history));
//     loadHistory();
// }



document.addEventListener("DOMContentLoaded", loadHistory);









function saveHistory(names, emoji, relation) {
    const history = JSON.parse(localStorage.getItem("flamesHistory")) || [];

    history.unshift({
        id: Date.now(),
        names,
        emoji,
        relation
    });

    localStorage.setItem("flamesHistory", JSON.stringify(history));
}





// deleteHistory
function deleteHistory(id) {
    let history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem("flamesHistory", JSON.stringify(history));
    loadHistory();
}





function deleteLastHistory() {
    let history = JSON.parse(localStorage.getItem("flamesHistory")) || [];

    if (history.length === 0) {
        speak("No history to delete");
        return;
    }

    history.shift(); // remove latest entry
    localStorage.setItem("flamesHistory", JSON.stringify(history));
    loadHistory();

    speak("Last history deleted");
}
