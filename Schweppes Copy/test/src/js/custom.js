const utils = {
  show: function (animateElem) {
    this.addClass(animateElem, "is_active");
  },
  hide: function (animateElem) {
    this.removeClass(animateElem, "is_active");
  },
  addClass: (animateElem, newClass) => {
    if (animateElem) {
      if (typeof animateElem === "string") {
        document.querySelector(animateElem).classList.add(newClass);
      } else if (typeof animateElem === "object") {
        animateElem.classList.add(newClass);
      }
    }
  },
  removeClass: (animateElem, oldClass) => {
    if (animateElem) {
      if (typeof animateElem === "string") {
        document.querySelector(animateElem).classList.remove(oldClass);
      } else if (typeof animateElem === "object") {
        animateElem.classList.remove(oldClass);
      }
    }
  },
  toggleClass: (item, cls) => {
    if (item && cls) {
      item.classList.toggle(cls);
    }
  },
  changeProperty: (property, color) => {
    if (property && color) {
      document.body.style.setProperty(property, color);
    }
  },
  getDom(string) {
    if (string) {
      return document.querySelector(string);
    }
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
        utils.changeProperty("--bg-color", "#ffe500");
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
    document.querySelectorAll(".bubble path").forEach((item) => {
      this.setBubble(item, 3);
    });

    // slow bubbles in product page
    this.setBubble(document.querySelector(".bubble_slow path"), 2);
  },
  setBubble: (bubble, step) => {
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
      this.onclick(item);
    });
  },
  onclick: function (item) {
    this.checkDropdown(item);
    this.toggleAllClass(item);
  },
  toggleAllClass: function (item) {
    utils.toggleClass(item, "is_active");
    this.toggleBodyClass();
  },
  toggleBodyClass: function () {
    if (document.querySelector(".dropdown-toggle.is_active")) {
      utils.addClass(document.body, "is_app_paused");
    } else {
      utils.removeClass(document.body, "is_app_paused");
    }
  },
  checkDropdown: function (item) {
    const ativeDropdown = document.querySelector(".dropdown-toggle.is_active");
    if (ativeDropdown !== item) {
      utils.hide(ativeDropdown);
    }
  },
};

// product-dropdown
class DropdownAnimation {
  constructor(dropdownClass) {
    this.dropdownClass = dropdownClass;
  }
  init() {
    this.dropdownClass.element.addEventListener("mouseover", (e) => {
      this.dropdownClass.mouseover(e);
    });
    this.dropdownClass.element.addEventListener("mouseout", (e) => {
      this.dropdownClass.mouseOut(e);
    });
  }
}
class Dropdown {
  constructor(element) {
    this.element = document.querySelector(element);
  }
  mouseOut() {
    throw console.error("Please use the extended function");
  }
  mouseover() {
    throw console.error("Please use the extended function");
  }
}
class ProductDropdown extends Dropdown {
  constructor(element) {
    super(element);
  }
  mouseOut(e) {
    dropdownUtils.hideImg(e);
    dropdownUtils.changeAtr("#ffe500", "transparent");
  }
  mouseover(e) {
    dropdownUtils.showImg(e, this.element.querySelector(".product_img_cover"));
    dropdownUtils.changeAtr(
      e.target.getAttribute("data-bg-color"),
      e.target.getAttribute("data-color")
    );
  }
}
class MoodDropdown extends Dropdown {
  constructor(element) {
    super(element);
  }
  mouseOut(e) {
    dropdownUtils.hideImg();
    dropdownUtils.removeAnimation(e);
  }
  mouseover(e) {
    dropdownUtils.showImg(e, this.element.querySelector(".product_img_cover"));
    dropdownUtils.addAnimation(e);
  }
}
const dropdownUtils = {
  changeAtr: function (bgColor, color) {
    if (bgColor && color) {
      utils.changeProperty("--bg-color", bgColor);
      utils.changeProperty("--color", color);
    }
  },
  addAnimation: function (e) {
    if (e.target.tagName === "A") {
      utils.addClass(document.querySelector("#dropdown2"), "is_hover");
      utils.addClass(e.target.parentNode, "is_active");
    }
  },
  removeAnimation: function (e) {
    utils.removeClass(document.querySelector("#dropdown2"), "is_hover");
    utils.removeClass(
      document.querySelector("#dropdown2 .is_active"),
      "is_active"
    );
  },
  hideImg: function () {
    const img = document.querySelector(".product_img_cover .is_active");
    if (img) {
      utils.hide(img);
    }
  },
  showImg: function (e, parentNode) {
    const src = e.target.getAttribute("data-src");

    if (src) {
      const node = this.createImage(src);
      this.appendChild(parentNode, node);

      setTimeout(() => {
        utils.show(node);
      }, 10);
    }
  },
  myImage: function (src) {
    const newNode = document.createElement("div");
    const newImg = document.createElement("img");

    newImg.src = src;
    newImg.alt = src;
    newNode.appendChild(newImg);

    return newNode;
  },
  createImage: (function () {
    let cache = {};
    return function (src) {
      if (src in cache) return cache[src];
      return (cache[src] = this.myImage(src));
    };
  })(),
  appendChild: function (parentNode, childNode) {
    parentNode.appendChild(childNode);
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

  const dropdown1Animation = new DropdownAnimation(
    new ProductDropdown("#dropdown1")
  );
  const dropdown2Animation = new DropdownAnimation(
    new MoodDropdown("#dropdown2")
  );
  dropdown1Animation.init();
  dropdown2Animation.init();
})();
