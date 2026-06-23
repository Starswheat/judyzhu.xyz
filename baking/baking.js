(function () {
  const textureRange = document.getElementById("textureRange");
  const flavorOptions = document.getElementById("flavorOptions");
  const sizeOptions = document.getElementById("sizeOptions");
  const recipeForm = document.getElementById("recipeForm");
  const chatLog = document.getElementById("chatLog");

  const output = {
    name: document.getElementById("recipeName"),
    summary: document.getElementById("recipeSummary"),
    dough: document.getElementById("recipeDough"),
    filling: document.getElementById("recipeFilling"),
    shape: document.getElementById("recipeShape"),
    bake: document.getElementById("recipeBake"),
    steps: document.getElementById("recipeSteps"),
  };

  const state = {
    texture: Number(textureRange.value),
    flavors: new Set(["sweet"]),
    size: "handful",
  };

  const flavorCopy = {
    sweet: {
      label: "sweet",
      ingredients: ["nectarine", "banana", "apple compote", "blueberry jam"],
      filling: "nectarine slices, banana custard, apple compote, and a little blueberry jam",
      name: "fruit custard",
    },
    savory: {
      label: "savory",
      ingredients: ["ham", "sausage", "corn mayo", "onion"],
      filling: "ham, tiny sausage coins, corn mayo, onion, and black pepper",
      name: "ham corn",
    },
    bitter: {
      label: "bitter",
      ingredients: ["matcha", "dark chocolate", "cacao nib", "hojicha"],
      filling: "matcha cream, dark chocolate shards, cacao nibs, and a dusting of hojicha",
      name: "matcha chocolat",
    },
    sour: {
      label: "sour",
      ingredients: ["yuzu", "lemon", "tomato", "pickled onion"],
      filling: "yuzu-lemon curd, slow tomato jam, and a few pickled onion ribbons",
      name: "yuzu tomato",
    },
  };

  const sizeCopy = {
    bite: {
      label: "bite size",
      shape: "six tiny chigiri rolls tucked together, each with a thumbprint of filling",
      bake: "178 C / 352 F for 9-11 min, covered loosely if the tops color early",
      yield: "6 small pieces",
    },
    handful: {
      label: "handful",
      shape: "one koppe-style roll with a shallow top split and a glossy milk wash",
      bake: "176 C / 350 F for 14-16 min, then brush with warm butter",
      yield: "2 generous rolls",
    },
    arm: {
      label: "arm length",
      shape: "a long baton inspired by Japanese-European bakery bread, sliced after cooling",
      bake: "218 C / 425 F for 8 min with steam, then 190 C / 375 F for 13-16 min",
      yield: "1 long sharing loaf",
    },
  };

  function textureProfile(value) {
    if (value < 34) {
      return {
        word: "fuwafuwa",
        dough: "tangzhong milk dough with bread flour, milk, egg, butter, and a gentle overnight rest",
        note: "proof until the dough wobbles like souffle and barely springs back",
        crumb: "soft, cloudlike, and pull-apart",
        name: "fuwafuwa",
      };
    }
    if (value < 68) {
      return {
        word: "balanced",
        dough: "yudane-koppe dough with milk, a little whole wheat, butter, and a longer bench rest",
        note: "shape with a light hand so the crust stays tender but the chew is present",
        crumb: "springy, plush, and lightly chewy",
        name: "koppe",
      };
    }
    return {
      word: "stodgy",
      dough: "lean baguette-leaning dough with yudane, tiny butter, high hydration, and a cool ferment",
      note: "bake hotter for a crisp shell, with a Pain des Philosophes / Pain Stock-inspired Japanese-European mood",
      crumb: "sturdy, custardy, and baguette-chewy",
      name: "baton",
    };
  }

  function activeFlavors() {
    return Array.from(state.flavors);
  }

  function chooseFlavorName(flavors) {
    if (flavors.length === 0) return "butter salt";
    if (flavors.length === 1) return flavorCopy[flavors[0]].name;
    if (flavors.includes("sweet") && flavors.includes("sour")) return "fruit yuzu";
    if (flavors.includes("savory") && flavors.includes("sour")) return "tomato sausage";
    if (flavors.includes("bitter") && flavors.includes("sweet")) return "matcha fruit";
    if (flavors.includes("savory") && flavors.includes("bitter")) return "miso chocolat";
    return flavors.map((key) => flavorCopy[key].label).join(" ");
  }

  function buildFilling(flavors) {
    if (flavors.length === 0) {
      return "salted butter, milk crumb, and a small brush of honey after baking";
    }
    const fillings = flavors.map((key) => flavorCopy[key].filling);
    if (flavors.includes("savory") && flavors.includes("bitter")) {
      fillings.push("a quiet miso-butter base to connect the cocoa bitterness and sausage salt");
    }
    if (flavors.includes("sweet") && flavors.includes("sour")) {
      fillings.push("a thin almond cream barrier so the fruit stays bright without soaking the crumb");
    }
    return fillings.join("; ");
  }

  function buildRecipe() {
    const texture = textureProfile(state.texture);
    const flavors = activeFlavors();
    const size = sizeCopy[state.size];
    const flavorName = chooseFlavorName(flavors);
    const isEuropeanLeaning = state.texture > 64 || state.size === "arm";
    const styleNote = isEuropeanLeaning
      ? "Japanese-European bakery mood: Pain des Philosophes calm, Pain Stock abundance, crisp edge, and chori-pan generosity."
      : "Classic Japanese chori-pan mood: soft dough, tidy filling, and a friendly milk-bread finish.";

    return {
      name: `${flavorName} ${texture.name} chori-pan`,
      summary: `${texture.crumb} ${size.label} bread with ${flavors.length ? flavors.map((key) => flavorCopy[key].label).join(", ") : "butter-salt"} flavor. ${styleNote}`,
      dough: texture.dough,
      filling: buildFilling(flavors),
      shape: `${size.shape}; yield ${size.yield}`,
      bake: size.bake,
      steps: [
        `Mix dough until elastic, then rest until puffy. ${texture.note}.`,
        "Prepare fillings in small pieces so every bite feels like a Japanese bakery tray moment.",
        `Shape as ${size.shape}, keeping wet fillings tucked above a butter, mayo, or cream barrier.`,
        `${size.bake}. Cool 8 min so the filling settles but the bread still feels warm.`,
        "Finish with flaky salt, kinako sugar, nori, citrus zest, or a tiny cat-shaped pick depending on the flavor mood.",
      ],
    };
  }

  function renderRecipe() {
    const recipe = buildRecipe();
    output.name.textContent = recipe.name;
    output.summary.textContent = recipe.summary;
    output.dough.textContent = recipe.dough;
    output.filling.textContent = recipe.filling;
    output.shape.textContent = recipe.shape;
    output.bake.textContent = recipe.bake;
    output.steps.replaceChildren(
      ...recipe.steps.map((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        return li;
      })
    );
  }

  function addMessage(text, who) {
    const wrap = document.createElement("div");
    wrap.className = `message ${who}`;

    const avatar = document.createElement("span");
    avatar.className = `avatar ${who === "user" ? "cat" : "bun"}`;
    avatar.setAttribute("aria-hidden", "true");

    const bubble = document.createElement("p");
    bubble.textContent = text;

    wrap.append(avatar, bubble);
    chatLog.appendChild(wrap);

    while (chatLog.children.length > 7) {
      chatLog.removeChild(chatLog.children[1]);
    }
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function summarizeChoices() {
    const texture = textureProfile(state.texture).word;
    const flavors = activeFlavors();
    const flavorText = flavors.length ? flavors.map((key) => flavorCopy[key].label).join(" + ") : "plain";
    return `${texture}, ${flavorText}, ${sizeCopy[state.size].label}`;
  }

  flavorOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-flavor]");
    if (!button) return;
    const flavor = button.dataset.flavor;
    if (state.flavors.has(flavor)) {
      state.flavors.delete(flavor);
      button.classList.remove("active");
    } else {
      state.flavors.add(flavor);
      button.classList.add("active");
    }
    addMessage(`flavor set: ${activeFlavors().map((key) => flavorCopy[key].label).join(" + ") || "plain"}`, "user");
    renderRecipe();
  });

  sizeOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button) return;
    state.size = button.dataset.size;
    sizeOptions.querySelectorAll(".choice").forEach((choice) => choice.classList.remove("active"));
    button.classList.add("active");
    addMessage(`size set: ${sizeCopy[state.size].label}`, "user");
    renderRecipe();
  });

  textureRange.addEventListener("input", () => {
    state.texture = Number(textureRange.value);
    renderRecipe();
  });

  textureRange.addEventListener("change", () => {
    addMessage(`texture set: ${textureProfile(state.texture).word}`, "user");
  });

  recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderRecipe();
    addMessage(`please bake: ${summarizeChoices()}`, "user");
    window.setTimeout(() => {
      addMessage("recipe card refreshed. pan-chan recommends eating the test loaf while the crust still whispers.", "bot");
    }, 220);
    document.getElementById("recipeCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  renderRecipe();
})();
