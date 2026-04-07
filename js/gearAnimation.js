const gearImage = document.querySelector(".gear-image");

const rotationDuration = 1500;
const overshootDegrees = 20;
const overshootRatio = 0.75;
const pauseBetweenLoops = 1500;
const profileImage = document.querySelector(".profile-image");

function triggerProfileAnimation() {
  profileImage.classList.remove("animate");

  void profileImage.offsetWidth;

  profileImage.classList.add("animate");
}

function easeInCubic(t) {
  return t * t * t;
}

function easeOutBounce(t) {
  if (t < (1 / 2.75))
    return 7.5625 * t * t;
  else if (t < (2 / 2.75)) {
    t -= (1.5 / 2.75);
    return 7.5625 * t * t + 0.75;
  } else if (t < (2.5 / 2.75)) {
    t -= (2.25 / 2.75);
    return 7.5625 * t * t + 0.9375;
  } else {
    t -= (2.625 / 2.75);
    return 7.5625 * t * t + 0.984375;
  }
}

function animateGearRotation() {
  let startTime = null;

  const startRotation = 0;
  const finalRotation = 360;
  const overshootRotation = finalRotation + overshootDegrees;

  function frame(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const t = elapsed / rotationDuration;

    if (t < overshootRatio) {
      const phase = t / overshootRatio;
      const eased = easeInCubic(phase);

      const rotation = startRotation + (overshootRotation - startRotation) * eased;
      gearImage.style.transform = `rotate(${rotation}deg)`;

    } else if (t < 1) {
      const phase = (t - overshootRatio) / (1 - overshootRatio);
      const eased = easeOutBounce(phase);

      const rotation = overshootRotation + (finalRotation - overshootRotation) * eased;
      gearImage.style.transform = `rotate(${rotation}deg)`;

    } else {
        gearImage.style.transform = `rotate(${finalRotation}deg)`;

        setTimeout(() => {
            animateGearRotation();
            triggerProfileAnimation();
        }, pauseBetweenLoops);

        return;
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

animateGearRotation();