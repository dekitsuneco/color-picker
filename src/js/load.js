// @ts-check

/**
 * @typedef {Object} progressObject
 * @property {number} min
 * @property {number} current
 * @property {number} max
 */
/**
 * @typedef {Object} scaleObject
 * @property {number} min
 * @property {number} max
 */

// Cashing DOM:
/**
 * @type {HTMLElement}
 */
const bgi = document.querySelector('.content');
/**
 * @type {HTMLElement}
 */
const loadingTxt = document.querySelector('.loading-text');

// Setting objects:
/**
 * @type {progressObject}
 */
const progress = {
  min: 0,
  current: 0,
  max: 100,
};
/**
 * @type {scaleObject}
 */
const blurScale = { min: 45, max: 0 };
/**
 * @type {scaleObject}
 */
const opacityScale = { min: 1, max: 0 };

// Helping functions:
/**
 * @param {scaleObject} fromRange
 * @param {scaleObject} toRange
 * @param {number} num
 * @returns {number}
 */
const mapNumBetweenRanges = (fromRange, toRange, num) => {
  /**
 * @type {number}
 */
  const sizeOfToRange = toRange.max - toRange.min;
  /**
 * @type {number}
 */
  const sizeOfFromRange = fromRange.max - fromRange.min;

  return (
    toRange.min + (sizeOfToRange / sizeOfFromRange) * (num - fromRange.min)
  );
};

// Main logic:
/**
 * @returns {void}
 */
const load = () => {
  progress.current++;

  /**
   * @type {number}
   */
  const opacityValue = mapNumBetweenRanges(
    progress,
    opacityScale,
    progress.current,
  );
  /**
   * @type {number}
   */
  const blurValue = mapNumBetweenRanges(progress, blurScale, progress.current);

  bgi.style.filter = `blur(${blurValue}px)`;

  loadingTxt.innerText = `${progress.current}%`;
  loadingTxt.style.opacity = opacityValue.toString();
};

/**
 * @returns {number}
 */
const timerID = setInterval(() => {
  load();

  if (progress.current >= progress.max) {
    clearInterval(timerID);
  }
}, 20);
