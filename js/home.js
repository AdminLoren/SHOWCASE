
window.COTA = window.COTA || {};

COTA.home = (function () {
  async function render() {
    const strip = document.getElementById("home-character-strip");
    if (!strip) return;

    const characters = await COTA.data.getCharacters();
    strip.innerHTML = "";

    characters.forEach((c) => {
      const card = document.createElement("button");
      card.className = "home-char-card";
      card.style.setProperty("--char-color", c.color);
      const badge = c.franchiseLogo
        ? `<img src="assets/images/${c.franchiseLogo}" alt="" class="franchise-badge" />`
        : "";
      card.innerHTML = `
        <span class="home-char-thumb-wrap">
          <img src="assets/images/render_${c.code}.png" alt="${c.name}" class="home-char-thumb" />
          ${badge}
        </span>
        <span class="home-char-name">${c.name}</span>
        <span class="home-char-gen">${c.gen === 2 ? "2nd Gen" : "1st Gen"}</span>
      `;
      card.addEventListener("click", () => {

        COTA.app.goToTab("lore", { resetView: false });
        COTA.lore.openCharacterById(c.id);
      });
      strip.appendChild(card);
    });
  }

  return { render };
})();
