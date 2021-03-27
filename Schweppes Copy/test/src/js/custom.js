window.addEventListener("load", (e) => {
  // Show the title Never Still
  addClass(document.querySelector(".c-home"), "is_active");
});

window.addEventListener("scroll", (i) => {
  // Show all the title elements
  if (document.documentElement.scrollTop > 500) {
    const titlesWrapper = document.querySelector(".c-scroll");
    removeClass(titlesWrapper, "hide");
  }
  const homeElem = document.querySelector(".c-home");
  const stillElem = document.querySelector(".c-still");
  const festiveElem = document.querySelector(".c-festive");

  scrollHandler(
    homeElem,
    0,
    0.5,
    function () {
      addClass(homeElem, "is_active");
    },
    function () {
      removeClass(homeElem, "is_active");
    }
  );
  scrollHandler(
    stillElem,
    -0.8,
    0.5,
    function () {
      addClass(stillElem, "is_active");
    },
    function () {
      removeClass(stillElem, "is_active");
    }
  );

  scrollHandler(
    festiveElem,
    -0.2,
    0.3,
    function () {
      addClass(festiveElem, "is_active");
      changeProperty("--bg-color", "#ffe500");
    },
    function () {
      removeClass(festiveElem, "is_active");
    }
  );

  // C-scroll
  const titleElem = document.querySelectorAll(".c-scroll section");
  titleElem.forEach((item, i) => {
    const titleTag = item.querySelector(".c-title");
    const scrollTag = document.querySelector(".c-scroll");
    const bubbleTag = item.querySelector(".img_mask");
    const buttonTag = titleTag.querySelector("a");
    const startRatioY = -0.11 + i * 0.17;
    const endRatioY = startRatioY + 0.17;
    const showButtonRatioY = startRatioY + 0.074;
    const color = titleTag.getAttribute("data-bg-color");
    scrollHandler(
      scrollTag,
      startRatioY,
      endRatioY,
      function () {
        addClass(titleTag, "is_active");
        changeProperty("--bg-color", color);
      },
      function () {
        removeClass(titleTag, "is_active");
      }
    );
    scrollHandler(
      scrollTag,
      showButtonRatioY,
      endRatioY,
      function () {
        addClass(buttonTag, "is_active");
        addClass(bubbleTag, "is_active");
      },
      function () {
        removeClass(buttonTag, "is_active");
      }
    );
  });
});

// start & end are position relative to C-scroll Element
function scrollHandler(triggerElem, start, end, enterFunc, leaveFunc) {
  if (!triggerElem) {
    return;
  }
  let startY, endY;
  if (typeof start === "number") {
    startY = triggerElem.getBoundingClientRect().height * start * -1;
  }
  if (typeof end === "number") {
    endY = triggerElem.getBoundingClientRect().height * end * -1;
  }
  const elemPosY = triggerElem.getBoundingClientRect().top;
  if (elemPosY <= startY && elemPosY >= endY) {
    enterFunc();
  } else {
    leaveFunc();
  }
}

function addClass(animateElem, newClass) {
  animateElem.classList.add(newClass);
}
function removeClass(animateElem, oldClass) {
  animateElem.classList.remove(oldClass);
}
function changeProperty(property, color) {
  document.body.style.setProperty(property, color);
}
// gooey bubbles
(function () {
  const svg = document.querySelectorAll(".gooey_bubble path");
  svg.forEach((item) => {
    let deg = 0,
      step = 5;
    setInterval(() => {
      if (deg >= 360) {
        deg = 0;
      }
      deg += step;
      const rotate = "rotate(" + deg + ")";
      item.setAttribute("transform", rotate);
    }, 50);
  });
})();

// Change titles to single span elements
const titles = document.querySelectorAll(".seperate_title");

titles.forEach((item, i) => {
  const innerHTML = item.innerHTML;
  const arrs = innerHTML.split("<br>");
  item.innerHTML = "";
  const newNode = document.createElement("div");
  newNode.classList.add("letter_wrapper");
  arrs.forEach((arr) => {
    const list = arr.trim().split("");
    list.forEach((letter, i) => {
      const newLetter = document.createElement("div");
      newLetter.classList.add("letter");
      const randomNum = parseInt(Math.random() * 5);
      if (randomNum % 3 === 1) {
        newLetter.classList.add("letter_delay");
      } else if (randomNum % 3 === 2) {
        newLetter.classList.add("letter_delay_1");
      }
      newLetter.innerText = letter;
      newNode.appendChild(newLetter);
    });
    const br = document.createElement("br");
    newNode.appendChild(br);
  });
  item.appendChild(newNode);
});

// dropdown toggle
const dropdownToggleBtns = document.querySelectorAll(".dropdown-toggle");
dropdownToggleBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    item.classList.toggle("is_active");
    document.body.classList.toggle("is_app_paused");
    // document.querySelector("#dropdown1").classList.toggle("hidden");
  });
});

let interval = null;
document.querySelectorAll("#dropdown1 a").forEach((item, i) => {
  item.addEventListener("mouseover", (e) => {
    changeProperty("--bg-color", item.getAttribute("data-bg-color"));
    changeProperty("--color", item.getAttribute("data-color"));

    const selectedImg = document.querySelectorAll(".product_img_cover div")[i];
    addClass(selectedImg, "is_active");

    const productCover = document.querySelector(".product_img_cover");

    // // Set the animation of img
    // let translateData = [];
    // productCover.style.transform.split(" ").forEach((item) => {
    //   const data = item.match(/-?\d+\.\d+/g)
    //     ? item.match(/-?\d+\.\d+/g)
    //     : item.match(/\d+/g);
    //   translateData.push(parseFloat(data));
    // });
    // });
  });
  item.addEventListener("mouseout", (e) => {
    removeClass(
      document.querySelector(".product_img_cover .is_active"),
      "is_active"
    );
    changeProperty("--bg-color", "#ffe500");
    changeProperty("--color", item.getAttribute("transparent"));
    clearInterval(interval);
  });
});
