
// Elements
const input = document.querySelector(".ipwd");
const btn = document.querySelector("#check");
const output = document.querySelector(".output");

// Click Event
btn.addEventListener("click", crackcheck);
input.addEventListener("input", crackcheck);
document.addEventListener("DOMContentLoaded", crackcheck);
// The Crack Checker Function
function crackcheck() {
  const val = input.value;
  const str = stringCheck(val);
  const qty = str.str;
  const range = str.range;

  if(val.length > 0){
btn.innerText = 'Sıfırla'
  } else {
    btn.innerText = 'Kontrol Et'  
  }
  if(val.length < 1 && event.type === 'click'){
      alert('Kontrol etmeden önce örnek parola girmelisiniz');
  } else if (event.type === 'click') {
    input.value = '';
  }

  const duration = crackDuration(range, val.length);
  const displayDuration =
    duration.dimension === null
      ? "Saniyeden daha az"
      : `${duration.time} ${duration.dimension}`;
  const status = duration.status;

  let label = [
    "Büyük Harf",
    "Küçük Harf",
    "Sayı",
    "Özel Karakter",,
    "Boşluk",
  ];

  let signs = "";
  qty.forEach((q, index) => {
    if (q > 0) {
      signs =
        signs +
        `<li class="opc6">${q} <span id="label" class="opc6">${label[index]}</span></li>`;

    }
  });

  const html = `<div class="w100 my10 fl status status-${status}">${displayDuration}</div>
<div class="w70 fl"><ul class="signs">${signs}</ul></div>
<div class="w30 fl sc3">Kaba kuvvet saldırısı ile parolanızı kırmak isteyen saldırganın ${range}<sup class="opc100">${val.length}</sup> deneme yapması gerekir</div>`;

  const htmlStart = `<h2>Parola Kontrolcüye hoşgeldin</h2>
  <p>yukarıya bir şifre girin ve bir hackerın onu kırmasının ne kadar süreceğini kontrol edin. Bu şekilde, seçtiğiniz şifrenin ne kadar güvenli olduğunu kontrol edebilirsiniz.  </p>
  <hr><h3>Güvenli bir parola için ipuçları</h3>
  <p>En az on iki karakterli parolalar kullanın. Parolanızın mutlaka en az bir büyük harf, bir küçük harf, rakam ve özel karakter içermesine dikkat edin.</p>
  <p>Farklı hesaplar için farklı parolalar kullanmaya özen gösterin.</p>
  `;
  if (input.value.length > 0) {
    output.innerHTML = html;
  } else {
    output.innerHTML = htmlStart;
  }
}


// Crack Duration
const crackDuration = (range, length) => {
  let ctime = Math.round(range ** length / 92_147_483_600);
  let steps = [12, 30, 24, 60, 60];
  let dimensions = ["Yıl", "Ay", "Saat", "Dakika", "Saniye"];
  let dimension = null;
  let status = 4;

  for (let i = 0; i < 5; i++) {
    const sum = steps.reduce((a, b) => a * b);
    if (ctime > sum) {
      ctime = Math.round(ctime / sum);
      dimension = dimensions[i];
      status = i;
      break;
    } else {
      steps.shift();
    }
  }
  return { time: ctime, dimension: dimension, status: status };
};

// Stringcheck
const stringCheck = (myString) => {
  const typs = [
    "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ",
    "abcçdefgğhıijklmnoöpqrsştuüvwxyz",
    "0123456789",
    "Ääßæ!é\"€§$%&/|{}[]'£~¨()=?*#+-:.;,<>_@°^₺\\",
    "\u0020 ",
  ];

  const countStrings = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < myString.length; i++) {
    for (let j = 0; j < typs.length; j++) {
      if (typs[j].includes(myString[i])) {
        countStrings[j]++;
      }
    }
  }

  let range = 0;
  for (let i = 0; i < countStrings.length; i++) {
    if (countStrings[i] > 0) {
      range = range + typs[i].length;
    }
  }

  return { str: countStrings, range };
};

//UI
function menu() {
  const menuBTN = document.querySelector("#menu-btn");
  const activeClass = "nav-btn-active";
  menuBTN.addEventListener("click", toggelMenu);
  function toggelMenu() {
    menuBTN.classList.contains(activeClass)
      ? menuBTN.classList.remove("nav-btn-active")
      : menuBTN.classList.add("nav-btn-active");
  }
}

menu();
