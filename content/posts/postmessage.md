---
title: "\"PostMessage XSS\"-н тухай"
date: 2025-10-14
draft: false
tags: ["xss", "postmessage", "iframe", "sop"]
description: PostMessage-ийг буруу хэрэгжүүлэхээс үүдэлтэй DOM-based XSS эмзэг байдлын тайлбар, PoC ба хамгаалалт.
---

## "PostMessage" гэж юу вэ? ( not finished )

Юун түрүүнд **developer**-ийн өнцгөөс *яагаад, хэрхэн* ашиглагддагийг харъя. Зарим вебсайт **ADS**-ийг `iframe` ашиглан байршуулдаг жишээг доор харуулав.

```html
<!-- Зар байршуулж буй жишээ код -->
<iframe src="https://youradurl.com" height="700" width="500"></iframe>
```

Мөн Cross-Origin Communication–д (өөр өөр origin/domain хооронд өгөгдөл солилцох) өргөн хэрэглэгддэг. Жишээлбэл: төлбөрийн системтэй холболт, OAuth, гуравдагч талын үйлчилгээ (AD, виджет гэх мэт).

Эндээс Same-Origin Policy (SOP) хөндөгдөнө. SOP нь өөр өөр origin-той window/frame-үүд бие биенийхээ resource руу шууд хандахыг хязгаарладаг. Origin-г дараах 3-аар тодорхойлно:

- protocol (http:// vs https://)
- hostname (domain)
- port
  
Дээрх 3-ын аль нэг нь зөрвөл same-origin биш болно. Шууд тайлбар: [MDN — Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

Window ба Iframe 

iframe нь өөр web page-ийг өөрийн хуудсан дотор “нэвтрүүлж” ажиллуулна.

Хэрэв адилхан origin бол дуудаж буй хуудас (parent) нь дуудагдсан хуудсандаа (child) JS-ээр нөлөөлж чадна (DOM-д бичих, унших).

Олон сайтууд X-Frame-Options: SAMEORIGIN эсвэл Content-Security-Policy: frame-ancestors 'self' ... ашиглаж iframe дотор нэвтрүүлэхийг хязгаарладаг.

Одоо харин “PostMessage XSS” рүү

Эмзэг байдлыг хайхдаа тухайн сайт Web Messaging ашиглаж байгаа эсэхийг шалгана:

window.postMessage(message, targetOrigin, transfer?)

эсвэл addEventListener("message", handler) ашигласан эсэх.

Жишээ хэлбэр:

// message listener суулгасан байж болно
addEventListener("message", function (event) {
  // энд ирсэн мессежийг handle хийж байна
});

// илгээгч тал
window.postMessage(message, targetOrigin /*, transfer */);


(Илрүүлэхэд туслах энгийн арга: кодуудаас "message" listener, postMessage( мөрүүдийг хайх; эсвэл өөрийн ашигладаг postMessage tracker/extension-ээ ажиллуулах.)

Яаж эмзэг болдог вэ?

Ихэвчлэн орж ирсэн мессежийг буруу handle хийж, origin шалгахгүй, эсвэл event.data-г sanitize хийхгүйгээр innerHTML зэрэг аргаар DOM руу шууд бичих үед.

⚠️ DOM руу шууд бичих сайн биш аргууд (sanitize-гүй бол):

element.innerHTML = ...

element.outerHTML = ...

element.insertAdjacentHTML(...)

document.write(...)

PoC — Эмзэг код ба халдагч

Доорх нь ойлгомжтой, минимал PoC. (Таны дурдсанчлан vulnerable.html-ийг өөр домэйн дээр, attacker.html-ийг localhost дээр байршуулж болно.)

vulnerable.html (эмзэг тал)
<!doctype html>
<html>
  <body>
    <h1>Vulnerable Page</h1>
    <div id="message"></div>

    <script>
      // ⚠️ origin ШАЛГАХГҮЙ, sanitize ХИЙХГҮЙ
      window.addEventListener("message", function (event) {
        // АЮУЛТАЙ: шууд innerHTML-д бичиж байна
        document.getElementById("message").innerHTML = event.data;
      });
    </script>
  </body>
</html>

attacker.html (халдагч тал)
<!doctype html>
<html>
  <body>
    <h1>Attacker Page</h1>
    <button id="pwn">Send payload</button>

    <script>
      const vuln = window.open("https://victim.example.com/vulnerable.html", "vuln");

      document.getElementById("pwn").onclick = () => {
        const payload = `<img src=x onerror="alert('XSS from ' + location.origin)">`;
        // ⚠️ targetOrigin='*' - санаатайгаар сул орхиж байна (демо)
        vuln.postMessage(payload, "*");
      };
    </script>
  </body>
</html>


Энд эмзэг тал ямар ч origin шалгаагүй тул attacker.html-ээс ирсэн мессежийг DOM-доо payload хэлбэрээр цутгаж, XSS үүсч байна.

Таны PoC линк: https://uug4na.me/poc/index.html (хэрэв амьд жишээ ажиллуулж байгаа бол эндээс харуулж болно.)

Зөв хамгаалалт

Origin шалгах — итгэсэн origin-уудаас ирсэн мессежийг л зөвшөөр.

Агуулгыг текстээр оруулах — HTML биш, textContent:

window.onmessage = function (event) {
  // 1) Зөвшөөрөгдсөн origin эсэхийг баталгаажуул
  if (event.origin !== "https://safe-origin.com") return;

  // 2) DOM руу текст хэлбэрээр оруул (XSS байхгүй)
  const messageDiv = document.getElementById("message");
  const el = document.createElement("div");
  el.textContent = event.data; // ← textContent = аюулгүй
  messageDiv.appendChild(el);
};


Илгээгч талд postMessage-ийн targetOrigin-ыг * биш, яг хүлээгдсэн origin болгож тохируулах.

CSP (Content Security Policy) ашиглан inline script-ийг хориглох, зөвшөөрөгдсөн эх сурвалжийг л нээх.

Жишээ кейсүүд (ил болгоод тайлагнагдсан)

PlayStation — reflected XSS via postMessage (HackerOne disclosed)

HackerOne — DOM-based XSS in Marketo form handler (disclosed)

Upserve — DOM-based XSS via postMessage (disclosed)

Эдгээр нь origin шалгалт дутуу/буруу, мөн DOM-руу sanitize-гүй бичих зэрэг нийтлэг алдаанаас үүдсэн.

Дүгнэлт

postMessage өөрөө буруу биш; мессежийг хэрхэн handle хийж байгаа нь аюул үүсгэнэ.

Origin-оо шалга, sanitize-гүй HTML бичихээс зайлсхий, targetOrigin-оо нарийвчил.

Хэрэв хоёр тал өөр origin бол SOP-ийн хүрээнд зөвшөөрөл, бодлогуудаа (CSP, frame-ancestors, XFO) зөв тохируул.

Ашигласан эх сурвалж

MDN — Same-origin policy: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

(Та өөрийн PoC/тайлангийн линкүүдээ энд нэмээрэй.)