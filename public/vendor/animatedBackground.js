let embedimSnow = document.getElementById('embedim--animated');
if (!embedimSnow) {
  let embRand2 = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let embRandColor2 = () => {
    const items = [
      // Snow
      // '#dbf2fd',
      // '#d8f8ff',
      // '#b8ddfa',
      // "url('https://i.imgur.com/GyzvjsF.png')",
      // "url('https://i.imgur.com/4frfBZL.png')",


      // New Year
      // "url('https://i.imgur.com/gQzenJU.png')",
      // "url('https://i.imgur.com/qrbDjpw.gif')",

      // PEACH
      "url('https://i.imgur.com/HDaD3Kp.gif')",

      // GOMA
      "url('https://i.imgur.com/yzC8Sww.gif')",
    ];
    return items[Math.floor(Math.random() * items.length)];
  };

  let embCSS = `
    .embedim-animated {
      position: absolute;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
    }
  `;

  let embHTML = '';
  for (let i = 1; i <= 69; i++) {
    embHTML += '<i class="embedim-animated"></i>';
    let rndX = embRand2(0, 1e6) * 1e-4,
      rndO = embRand2(-1e5, 1e5) * 1e-4,
      rndT = (embRand2(3, 8) * 10).toFixed(2),
      rndS = (embRand2(0, 1) * 1).toFixed(2);

    let bg = embRandColor2();
    let isImage = bg.includes('url(');

    embCSS += `.embedim-animated:nth-child(${i}) {
      background: ${bg};
      opacity: ${(embRand2(7, 10) * 0.1).toFixed(2)};
      transform: translate(${rndX.toFixed(2)}vw, -10px) scale(${rndS});
      animation: fall-${i} ${embRand2(10, 30)}s -${embRand2(0, 30)}s linear infinite;
      ${isImage ? 'background-size: contain; background-repeat: no-repeat; background-position: center;' : ''}
    }
    @keyframes fall-${i} {
      ${rndT}% {
        transform: translate(${(rndX + rndO).toFixed(2)}vw, ${rndT}vh) scale(${rndS});
      }
      to {
        transform: translate(${(rndX + rndO / 2).toFixed(2)}vw, 105vh) scale(${rndS});
      }
    }`;
  }

  embedimSnow = document.createElement('div');
  embedimSnow.id = 'embedim--animated';
  embedimSnow.innerHTML = `
    <style>
      #embedim--animated {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        z-index: 9999999;
        pointer-events: none;
      }
      ${embCSS}
    </style>
    ${embHTML}
  `;

  document.body.appendChild(embedimSnow);
}
