class Progress extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      'size',
      'ring-width',
      'ring-color',
      'progress-color',
      'background-color',
      'period',
      'value',
      'animated',
      'hidden'];
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const size = this.getAttribute('size') || '48px';
    const ringWidth = this.getAttribute('ring-width') || '10px';
    const ringColor = this.getAttribute('ring-color') || '#eff3f6';
    const progressColor = this.getAttribute('progress-color') || '#005bff';
    const backgroundColor = this.getAttribute('background-color') || 'white';
    const period = this.getAttribute('period') || '1s';
    const value = +(this.getAttribute('value') || '0');
    const animated = this.hasAttribute('animated');

    const prepareValue = (value) => {
      if (isNaN(value) || value < 0) {
        return 0;
      } else if (value > 100) {
        return 3.6 * 100;
      }
      return 3.6 * value
    }

    const degrees = prepareValue(value);

    const makeAnimation = () => {
      let result = ``;
      let circleStart = 0;
      let circleEnd = degrees;

      const normalize = (degrees) => {
        return  degrees + 3.6 > 360
          ? degrees + 3.6 - 360
          : degrees + 3.6;
      }

      if (circleEnd.toFixed(0) === "360") {
        return result;
      }

      for (let i = 1; i <= 100; i++) {
        circleStart = normalize(circleStart);
        circleEnd = normalize(circleEnd);
        const start = circleStart > circleEnd
          ? `${progressColor} ${circleEnd}deg, 
              ${ringColor} ${circleEnd}deg ${circleStart}deg,
              ${progressColor} ${circleStart}deg\n`
          : `${ringColor} ${circleStart}deg,
              ${progressColor} ${circleStart}deg ${circleEnd}deg,
              ${ringColor} ${circleEnd}deg\n`
        result += `${i}% {background: conic-gradient(${start});}\n`;
      }

      return result;
    }

    this.innerHTML = `
      <style>
        .circle {
          width: calc(${size} - ${ringWidth});
          height: calc(${size} - ${ringWidth});
          border-radius: 100%;
          background-color: ${backgroundColor};
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
          ${animated && `
            animation-name: rotation;
            animation-duration: ${period};
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          `}
        }
        @keyframes rotation {
            ${makeAnimation()}
        }
      </style>
      <div class="circle-border">
        <div class="circle">
        </div>
      </div>
    `;
  }
}

customElements.define('progress-spinner', Progress);
