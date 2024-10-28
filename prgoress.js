class Progress extends HTMLElement {
  // static observedAttributes = ["color", "size"];

  constructor() {
    super();
  }

  connectedCallback() {
    const size = this.getAttribute('size') || '48px';
    const ringWidth = this.getAttribute('ring-width') || '10px';
    const ringColor = this.getAttribute('ring-color') || '#eff3f6';
    const progressColor = this.getAttribute('progress-color') || '#005bff';
    const period = this.getAttribute('period') || '0';
    const state = this.getAttribute('state') || 'normal';
    const value = +(this.getAttribute('value') || '0');
    const degrees = 3.6 * value;

    const makeAnimation = () => {
      let result = `0% {background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);}\n`;
      let progressStart = 0;
      let progressEnd = degrees;
      let ringStart = degrees;
      let ringEnd = 360;

      const normalize = (degrees) => {
          return degrees > 360
          ? degrees - 360
          : degrees;
      }

      if (ringStart === ringEnd || progressStart === progressEnd) {
        return result;
      }

      for (let i = 1; i <= 100; i++) {
        progressStart = progressStart + 3.6;
        progressEnd = progressEnd + 3.6;
        ringStart = ringStart + 3.6;
        ringEnd = ringEnd + 3.6;
        const start = `${ringColor} ${normalize(ringEnd)}deg`
          // progressStart > ringEnd
          // ? `${progressColor} ${normalize(progressStart)}deg`
          // : `${ringColor} ${normalize(ringEnd)}deg`;
        const middle = `${progressColor} ${normalize(progressStart)}deg ${normalize(progressEnd)}deg`;
        const end = progressEnd > ringStart
          ? `${progressColor} ${normalize(progressEnd)}deg`
          : `${ringColor} ${normalize(ringStart)}deg`;

        progressStart = normalize(progressStart);
        progressEnd = normalize(progressEnd);
        ringStart = normalize(ringStart);
        ringEnd = normalize(ringEnd);

        result += `${i}% {background: conic-gradient(${start}, ${middle}, ${end});}\n`;
      }
      console.log(result);

      return result;
    }

    this.innerHTML = `
      <style>
        .circle {
          width: calc(${size} - ${ringWidth});
          height: calc(${size} - ${ringWidth});
          border-radius: 100%;
          background-color: white;
        }

        .circle-border {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${size};
          height: ${size};
          border-radius: 100%;
          background-color: transparent;
          background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);
          animation-name: rotation;
          animation-duration: 1s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
        }
        @keyframes rotation {
            ${makeAnimation()}
            // from  {background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);}
            // to  {background: conic-gradient(${progressColor} 360deg, ${ringColor} 0deg);}
            // 50%  {background: conic-gradient(
            //   ${ringColor} ${degrees}deg,
            //   ${progressColor} ${degrees}deg ${degrees + 180}deg,
            //   ${ringColor} ${degrees + 180}deg);}
            // 100% {background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);}
        }
      </style>
      <div class="circle-border">
        <div class="circle">
        </div>
      </div>
    `;
  }
}
        // @keyframes rotation {
        //     0%   {background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);}
        //     25%  {background: conic-gradient(
        //       ${ringColor} 20deg,
        //       ${progressColor} 10deg ${degrees + 20}deg,
        //       ${ringColor} ${degrees + 20}deg);}
        //     // 50%  {background: conic-gradient(
        //     //   ${ringColor} ${degrees}deg,
        //     //   ${progressColor} ${degrees}deg ${degrees + 180}deg,
        //     //   ${ringColor} ${degrees + 180}deg);}
        //     // 100% {background: conic-gradient(${progressColor} ${degrees}deg, ${ringColor} 0deg);}
        // }
customElements.define('progress-spinner', Progress);


// .progress {
//   width: 48px;
//   height: 48px;
//   border: 5px solid #FFF;
//   border-bottom-color: #FF3D00;
//   border-radius: 50%;
//   display: inline-block;
//   box-sizing: border-box;
//   // animation: rotation 1s linear infinite;
// }

// <style>
// .loader {
//   width: 48px;
//   height: 48px;
//   border:10px solid #FFF;
//   border-radius: 50%;
//   position: relative;
//   transform:rotate(45deg);
//   box-sizing: border-box;
// }
// .loader::before {
//   content: "";
//   position: absolute;
//   box-sizing: border-box;
//   inset:-10px;
//   border-radius: 50%;
//   border:10px solid #FF3D00;
//   animation: prixClipFix 2s infinite linear;
// }

// @keyframes prixClipFix {
//     0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
//     25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
//     50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
//     75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
//     100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
// }
// </style>
// <span class="progress"></span>


{/* <style>
.circle-wrap {
  margin: 50px auto;
  width: 150px;
  height: 150px;
  background: #e6e2e7;
  border-radius: 50%;
}
.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
}
.circle-wrap .circle .mask {
  clip: rect(0px, 150px, 150px, 75px);
}
.circle-wrap .circle .mask .fill {
  clip: rect(0px, 75px, 150px, 0px);
  background-color: #9e00b1;
}
.circle-wrap .circle .mask.full,
.circle-wrap .circle .fill {
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
}

@keyframes fill {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(126deg);
  }
}
.circle-wrap .inside-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  line-height: 130px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 2em;
}
</style>
<div class="circle-wrap">
<div class="circle">
  <div class="mask full">
    <div class="fill"></div>
  </div>
  <div class="mask half">
    <div class="fill"></div>
  </div>
  <div class="inside-circle">
    70%
  </div>
</div>
</div> */}




// <style>
//   .circle {
//     position: relative;
//     top: 5px;
//     left: 5px;
//     text-align: center;
//     width: ${size - ringInnerWidth};
//     height: ${size - ringInnerWidth};
//     border-radius: 100%;
//     background-color: white;
//   }

//   .circle-border {
//     position: relative;
//     text-align: center;
//     width: ${size};
//     height: ${size};
//     margin-left: 30%;
//     border-radius: 100%;
//     background-color: #E53B3B;
//     background: linear-gradient(270deg, blue 50%, transparent 50%), linear-gradient(0deg, blue 50%, lightgray 50%)
//   }
// </style>
// <div class="circle-border">
//   <div class="circle">
//   </div>
// </div>