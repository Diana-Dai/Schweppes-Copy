const utils = {
  show: function (animateElem) {
    this.addClass(animateElem, "is_active");
  },
  hide: function (animateElem) {
    this.removeClass(animateElem, "is_active");
  },
  addClass: (animateElem, newClass) => {
    if (typeof animateElem === "string") {
      document.querySelector(animateElem).classList.add(newClass);
    } else if (typeof animateElem === "object") {
      animateElem.classList.add(newClass);
    }
  },
  removeClass: (animateElem, oldClass) => {
    if (typeof animateElem === "string") {
      document.querySelector(animateElem).classList.remove(oldClass);
    } else if (typeof animateElem === "object") {
      animateElem.classList.remove(oldClass);
    }
  },
  changeProperty: (property, color) => {
    document.body.style.setProperty(property, color);
  },
  getDom(string) {
    return document.querySelector(string);
  },
};

const scroll = {
  init: function () {
    this.showScrollElems();
    this.setScrollAnimations();
  },
  showScrollElems: () => {
    // Show all the title elements
    if (document.documentElement.scrollTop > 500) {
      utils.show(".c-scroll");
    }
  },
  setScrollAnimations: function () {
    this.setHomeElem();
    this.setStillElem();
    this.setFestiveElem();
    this.setScrollElems();
  },
  setHomeElem: () => {
    const homeTrigger = new ScrollHandler(".c-home");
    homeTrigger.addAnimation({
      start: 0,
      end: 0.5,
      enterFunc: function () {
        utils.show(".c-home");
      },
      leaveFunc: function () {
        utils.hide(".c-home");
      },
    });
  },
  setStillElem: () => {
    const stillElemTrigger = new ScrollHandler(".c-still");
    stillElemTrigger.addAnimation({
      start: -0.8,
      end: 0.5,
      enterFunc: function () {
        utils.show(".c-still");
      },
      leaveFunc: function () {
        utils.hide(".c-still");
      },
    });
  },
  setFestiveElem: () => {
    const festiveElemTrigger = new ScrollHandler(".c-festive");
    festiveElemTrigger.addAnimation({
      start: -0.2,
      end: 0.3,
      enterFunc: function () {
        utils.show(".c-festive");
      },
      leaveFunc: function () {
        utils.hide(".c-festive");
      },
    });
  },
  setScrollElems: () => {
    // C-scroll elements
    const scrollElemTrigger = new ScrollHandler(".c-scroll");

    document.querySelectorAll(".c-scroll section").forEach((item, i) => {
      const titleTag = item.querySelector(".c-title");
      const bubbleTag = item.querySelector(".img_mask");
      const buttonTag = item.querySelector(".c-title a");

      const startY = -0.11 + i * 0.17;
      const endY = startY + 0.17;

      const showButtonStartY = startY + 0.074;

      const color = titleTag.getAttribute("data-bg-color");

      scrollElemTrigger.addAnimation({
        start: startY,
        end: endY,
        enterFunc: function () {
          utils.show(titleTag);
          utils.changeProperty("--bg-color", color);
        },
        leaveFunc: function () {
          utils.hide(titleTag);
        },
      });

      scrollElemTrigger.addAnimation({
        start: showButtonStartY,
        end: endY,
        enterFunc: function () {
          utils.show(buttonTag);
          utils.show(bubbleTag);
        },
        leaveFunc: function () {
          utils.hide(buttonTag);
        },
      });
    });
  },
};

// start & end are position relative to trigger Element
class ScrollHandler {
  constructor(triggerElem) {
    this.triggerTarget = utils.getDom(triggerElem);
  }
  addAnimation(info) {
    if (typeof info.start === "number" && typeof info.end === "number") {
      this.init(info);
    }
  }
  init(info) {
    const startY = this.getTriggerPos(this.triggerTarget, info.start);
    const endY = this.getTriggerPos(this.triggerTarget, info.end);
    const elemTop = this.getElemTop(this.triggerTarget);

    // when elemtop + starty <=0, start the animation
    // when elemtop + endY >=0, start the animation
    if (startY + elemTop <= 0 && endY + elemTop >= 0) {
      info.enterFunc();
    } else {
      info.leaveFunc();
    }
  }
  getTriggerPos(triggerTarget, pos) {
    return triggerTarget.getBoundingClientRect().height * pos;
  }
  getElemTop(element) {
    return element.getBoundingClientRect().top;
  }
}

// gooey bubbles
const setGooeyBubbles = {
  init: function () {
    // fast bubbles in home page
    document.querySelectorAll(".gooey_bubble path").forEach((item) => {
      this.setBubble(item, 5);
    });

    // slow bubbles in product page
    this.setBubble(document.querySelector(".gooey_bubble_slow path"), 3);
  },
  setBubble: (bubble, step) => {
    // document.querySelectorAll(".gooey_bubble path").forEach((item) => {
    let deg = 0;
    setInterval(() => {
      if (deg >= 360) {
        deg = 0;
      }
      deg += step;
      const rotate = "rotate(" + deg + ")";
      bubble.setAttribute("transform", rotate);
    }, 50);
  },
};

const separateTitles = {
  init: function () {
    // Change titles to single span elements
    document.querySelectorAll(".seperate_title").forEach((item) => {
      const arrs = this.getContentList(item);

      this.setInnerText(item, "");

      const newNode = this.createNewNode("div", "letter_wrapper");

      arrs.forEach((arr) => {
        const list = arr.trim().split("");

        list.forEach((letter) => {
          const newLetter = this.createNewNode("div", "letter");

          this.setRandomClass(newLetter);

          this.setInnerText(newLetter, letter);

          newNode.appendChild(newLetter);
        });
        const br = this.createNewNode("br");

        newNode.appendChild(br);
      });
      item.appendChild(newNode);
    });
  },
  getContentList: function (item) {
    const innerHTML = item.innerHTML;
    return innerHTML.split("<br>");
  },
  createNewNode: function (tag, cls) {
    const newNode = document.createElement(tag);
    if (!cls) {
      return newNode;
    }
    newNode.classList.add(cls);
    return newNode;
  },
  setRandomClass: function (item) {
    const randomNum = this.getRandomNum(0, 5);

    if (randomNum % 3 === 1) {
      item.classList.add("letter_delay");
    } else if (randomNum % 3 === 2) {
      item.classList.add("letter_delay_1");
    }
  },
  getRandomNum: function (min, max) {
    return parseInt(Math.random() * max + min);
  },
  setInnerText: function (item, content) {
    item.innerText = content;
  },
};

// dropdown toggle
const setDropdownBtns = {
  init: function () {
    const dropdownToggleBtns = document.querySelectorAll(".dropdown-toggle");
    dropdownToggleBtns.forEach((item) => {
      this.setEvent(item);
    });
  },
  setEvent: function (item) {
    item.addEventListener("click", (e) => {
      item.classList.toggle("is_active");
      document.body.classList.toggle("is_app_paused");
    });
  },
};

// 在hover时才创建div
const hoverDropdownElem = {
  init: function () {
    const dropDown = document.querySelector("#dropdown1");
    dropDown.addEventListener("mouseover", (e) => {
      const bgColor = e.target.getAttribute("data-bg-color");
      const color = e.target.getAttribute("data-color");
      if (bgColor && color) {
        utils.changeProperty("--bg-color", bgColor);
        utils.changeProperty("--color", color);
      }
      const selectedImg = document.querySelectorAll(".product_img_cover div")[
        i
      ];
      addClass(selectedImg, "is_active");

      const productCover = document.querySelector(".product_img_cover");
    });
    dropDown.addEventListener("mouseout", (e) => {
      //     removeClass(
      //       document.querySelector(".product_img_cover .is_active"),
      //       "is_active"
      //     );
      //     changeProperty("--bg-color", "#ffe500");
      //     changeProperty("--color", item.getAttribute("transparent"));
      //     clearInterval(interval);
      //   });
    });
  },
};

(function () {
  window.addEventListener("load", (e) => {
    // Show the title Never Still
    utils.show(".c-home");
  });

  window.addEventListener("scroll", (i) => {
    scroll.init();
  });

  setGooeyBubbles.init();

  separateTitles.init();

  setDropdownBtns.init();

  hoverDropdownElem.init();
})();
