import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const LS_KEY = "recipe-library-v1";

const fmt = (value, digits = 2) => Number(value || 0).toFixed(digits);
const norm = (value = "") => value.toLowerCase().trim().replace(/\s+/g, " ");
const resolveCanonical = (name, map) => {
  const normalized = norm(name);
  if (map && map[normalized]) return map[normalized];
  if (/tarwe/.test(normalized)) return "Tarwemeel";
  if (/rogge/.test(normalized)) return "Roggemeel";
  if (/boekweit/.test(normalized)) return "Boekweitmeel";
  if (/zout/.test(normalized)) return "Zout";
  if (/olie|boter/.test(normalized)) return "Zonnebloemolie";
  if (/water/.test(normalized)) return "Water";
  return name;
};
const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "recept";
const makeId = () => Math.random().toString(36).slice(2, 9);

const blankRecipe = (title = "Nieuw recept") => ({
  id: makeId(),
  title,
  canonicalMap: {},
  blocks: [
    { name: "Hoofddeeg", isMain: true, items: [] },
    { name: "Voordeeg", isPreferment: true, mass: 0, items: [] },
  ],
});

const createDemoRecipe = () => {
  const recipe = blankRecipe("Tarwe–rogge–boekweit volkoren (zuurdesem)");
  recipe.canonicalMap = {
    "tarwemeel de vriendschap": "Tarwemeel",
    "roggemeel de vriendschap": "Roggemeel",
    "boekweitmeel de vriendschap": "Boekweitmeel",
    "zonnebloemolie dirk": "Zonnebloemolie",
    "bakkerszout de vriendschap": "Zout",
    water: "Water",
    "water koelkast": "Water",
  };
  recipe.blocks = [
    {
      name: "Hoofddeeg",
      isMain: true,
      items: [
        {
          label: "Tarwemeel De Vriendschap",
          grams: 1789.98,
          type: "flour",
          canonical: "Tarwemeel",
        },
        {
          label: "Roggemeel De Vriendschap",
          grams: 358.0,
          type: "flour",
          canonical: "Roggemeel",
        },
        {
          label: "Boekweitmeel De Vriendschap",
          grams: 715.99,
          type: "flour",
          canonical: "Boekweitmeel",
        },
        { label: "Water", grams: 1503.58, type: "water", canonical: "Water" },
        {
          label: "Zonnebloemolie Dirk",
          grams: 143.2,
          type: "oil",
          canonical: "Zonnebloemolie",
        },
        {
          label: "Bakkerszout De Vriendschap",
          grams: 57.28,
          type: "salt",
          canonical: "Zout",
        },
      ],
    },
    {
      name: "Voordeeg",
      isPreferment: true,
      mass: 1431.98,
      items: [
        {
          label: "Roggemeel De Vriendschap (90%)",
          grams: 715.99,
          type: "flour",
          canonical: "Roggemeel",
        },
        {
          label: "Water (90%)",
          grams: 715.99,
          type: "water",
          canonical: "Water",
        },
      ],
    },
    {
      name: "Zuurdesem starter",
      isPreferment: true,
      mass: 143.2,
      items: [
        {
          label: "Roggemeel De Vriendschap (50%)",
          grams: 71.6,
          type: "flour",
          canonical: "Roggemeel",
        },
        {
          label: "Water (50%)",
          grams: 71.6,
          type: "water",
          canonical: "Water",
        },
      ],
    },
  ];
  return recipe;
};

const computeRecipe = (recipe) => {
  const consolidated = new Map();
  let flour = 0;
  let water = 0;
  let salt = 0;
  let oil = 0;
  let doughTotal = 0;
  let prefermentFlour = 0;

  (recipe.blocks || []).forEach((block) => {
    (block.items || []).forEach((item) => {
      const grams = Number(item.grams) || 0;
      doughTotal += grams;
      const canonical = item.canonical || resolveCanonical(item.label, recipe.canonicalMap);
      consolidated.set(canonical, (consolidated.get(canonical) || 0) + grams);

      if (item.type === "flour") {
        flour += grams;
        if (block.isPreferment) {
          prefermentFlour += grams;
        }
      } else if (item.type === "water" || (item.type === "liquid" && item.waterEquiv != null)) {
        water += grams * (item.waterEquiv ?? 1);
      } else if (item.type === "salt") {
        salt += grams;
      } else if (item.type === "oil") {
        oil += grams;
      }
    });
  });

  const hydration = flour ? (water / flour) * 100 : 0;

  return {
    consolidated,
    flour,
    water,
    salt,
    oil,
    doughTotal,
    prefermentFlour,
    hydration,
  };
};

const defaultLibrary = () => ({
  currentId: null,
  items: [createDemoRecipe()],
});

const loadLibrary = () => {
  if (typeof window === "undefined") return defaultLibrary();
  try {
    const stored = window.localStorage.getItem(LS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.items && parsed.items.length) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Kon bibliotheek niet laden", error);
  }
  return defaultLibrary();
};

const saveLibrary = (library) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(library));
  } catch (error) {
    console.warn("Kon bibliotheek niet opslaan", error);
  }
};

function App() {
  const [library, setLibrary] = useState(() => {
    const initial = loadLibrary();
    if (!initial.currentId && initial.items.length) {
      initial.currentId = initial.items[0].id;
    }
    return initial;
  });
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState("");
  const fileInputRef = useRef(null);

  const currentRecipe = useMemo(() => {
    const found = library.items.find((item) => item.id === library.currentId);
    return found || library.items[0] || blankRecipe();
  }, [library]);

  const computed = useMemo(() => computeRecipe(currentRecipe), [currentRecipe]);

  useEffect(() => {
    if (currentRecipe?.title) {
      document.title = `${currentRecipe.title} · Receptviewer`;
    } else {
      document.title = "Receptviewer";
    }
  }, [currentRecipe]);

  useEffect(() => {
    saveLibrary(library);
  }, [library]);

  useEffect(() => {
    setJsonDraft(JSON.stringify(currentRecipe, null, 2));
    setJsonError("");
  }, [currentRecipe]);

  const updateLibrary = (updater) => {
    setLibrary((prev) => {
      const updated = updater(prev);
      if (!updated.currentId && updated.items.length) {
        return { ...updated, currentId: updated.items[0].id };
      }
      return updated;
    });
  };

  const handleSelectRecipe = (event) => {
    const id = event.target.value;
    updateLibrary((prev) => ({ ...prev, currentId: id }));
  };

  const handleNew = () => {
    const title = window.prompt("Naam nieuw recept:", "Nieuw recept");
    if (!title) return;
    const recipe = blankRecipe(title);
    updateLibrary((prev) => ({
      currentId: recipe.id,
      items: [...prev.items, recipe],
    }));
  };

  const handleDuplicate = () => {
    if (!currentRecipe) return;
    const copy = JSON.parse(JSON.stringify(currentRecipe));
    copy.id = makeId();
    copy.title = `${currentRecipe.title || "Recept"} (kopie)`;
    updateLibrary((prev) => ({
      currentId: copy.id,
      items: [...prev.items, copy],
    }));
  };

  const handleRename = () => {
    if (!currentRecipe) return;
    const title = window.prompt("Nieuwe naam:", currentRecipe.title || "");
    if (!title) return;
    updateLibrary((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === prev.currentId ? { ...item, title } : item
      ),
    }));
  };

  const handleDelete = () => {
    if (!currentRecipe || library.items.length <= 1) {
      window.alert("Minstens één recept moet blijven.");
      return;
    }
    if (!window.confirm("Verwijder dit recept?")) return;
    updateLibrary((prev) => {
      const items = prev.items.filter((item) => item.id !== prev.currentId);
      const currentId = items.length ? items[0].id : null;
      return { items, currentId };
    });
  };

  const handleEmail = () => {
    if (!currentRecipe) return;
    const lines = [];
    lines.push(`# ${currentRecipe.title}`);
    lines.push(
      `Hydratatie: ${fmt(computed.hydration, 1)}% · Totaal meel: ${fmt(
        computed.flour
      )} g · Totaal water: ${fmt(computed.water)} g`
    );
    lines.push(`Zout: ${fmt(computed.salt)} g · Vet: ${fmt(computed.oil)} g`);
    lines.push("");
    lines.push("— Ingrediënten (na consolidatie) —");
    Array.from(computed.consolidated.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([name, grams]) => {
        lines.push(`${name}: ${fmt(grams)} g`);
      });
    lines.push("");
    lines.push("— Blokken —");
    (currentRecipe.blocks || []).forEach((block) => {
      const postfix = block.isPreferment
        ? " (voordeeg)"
        : block.isMain
        ? " (hoofddeeg)"
        : "";
      lines.push(`* ${block.name}${postfix}`);
      (block.items || []).forEach((item) => {
        lines.push(`  - ${item.label}: ${fmt(item.grams)} g`);
      });
    });
    const subject = encodeURIComponent(`Recept: ${currentRecipe.title}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShare = async () => {
    if (!currentRecipe || typeof navigator === "undefined") return;
    const file = new File(
      [JSON.stringify(currentRecipe, null, 2)],
      `${slugify(currentRecipe.title)}.json`,
      { type: "application/json" }
    );
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: currentRecipe.title,
          text: "Recept JSON",
          files: [file],
        });
      } catch (error) {
        // gebruiker heeft gedeeld geannuleerd; geen actie nodig
      }
    } else {
      window.alert(
        "Delen met bestand wordt niet ondersteund. Gebruik Exporteer JSON of E‑mail."
      );
    }
  };

  const handleExportRecipe = () => {
    if (!currentRecipe) return;
    const blob = new Blob([JSON.stringify(currentRecipe, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(currentRecipe.title)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleExportLibrary = () => {
    const blob = new Blob([JSON.stringify(library, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recepten-bibliotheek.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed.title) {
          window.alert("Geen geldig recept");
          return;
        }
        parsed.id = makeId();
        updateLibrary((prev) => ({
          currentId: parsed.id,
          items: [...prev.items, parsed],
        }));
      } catch (error) {
        window.alert(`JSON-fout: ${error.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleJsonChange = (event) => {
    const value = event.target.value;
    setJsonDraft(value);
    try {
      const parsed = JSON.parse(value);
      updateLibrary((prev) => {
        const targetId = prev.currentId;
        const items = prev.items.map((item) =>
          item.id === targetId ? { ...parsed, id: parsed.id || targetId } : item
        );
        return { ...prev, items };
      });
      setJsonError("");
    } catch (error) {
      setJsonError(`⚠️ JSON-fout: ${error.message}`);
    }
  };

  const stats = [
    {
      title: "Totaal meel",
      value: `${fmt(computed.flour)} g`,
      sub: "incl. meel in alle voordegen",
    },
    {
      title: "Totaal water",
      value: `${fmt(computed.water)} g`,
      sub: "incl. water in voordegen",
    },
    {
      title: "Hydratatie",
      value: `${fmt(computed.hydration, 1)} %`,
      sub: "water ÷ meel",
    },
    {
      title: "Zout",
      value: `${fmt((computed.salt / computed.flour) * 100, 1)} %`,
      sub: `${fmt(computed.salt)} g / meel`,
    },
    {
      title: "Vet (olie)",
      value: `${fmt((computed.oil / computed.flour) * 100, 1)} %`,
      sub: `${fmt(computed.oil)} g / meel`,
    },
    {
      title: "% voordeegmeel",
      value: `${fmt((computed.prefermentFlour / computed.flour) * 100, 1)} %`,
      sub: `${fmt(computed.prefermentFlour)} g / meel`,
    },
  ];

  const consolidatedRows = useMemo(
    () =>
      Array.from(computed.consolidated.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, grams]) => ({ name, grams })),
    [computed]
  );

  const prefermentBlocks = (currentRecipe.blocks || []).filter(
    (block) => block.isPreferment && !block.isMain
  );
  const mainBlocks = (currentRecipe.blocks || []).filter((block) => block.isMain);
  const otherBlocks = (currentRecipe.blocks || []).filter(
    (block) => !block.isMain && !block.isPreferment
  );

  return (
    <div className="App">
      <header className="app-header">
        <div className="wrap">
          <h1>{currentRecipe.title || "Receptviewer (offline · mobiel)"}</h1>
          <div className="sub">
            Single‑page · geen database · meerdere recepten · import/export · e‑mail/Share
          </div>
          <div className="toolbar" role="toolbar" aria-label="Recept acties">
            <label htmlFor="recipeSelect" className="toolbar-label">
              Recept:
            </label>
            <select
              id="recipeSelect"
              value={library.currentId || ""}
              onChange={handleSelectRecipe}
            >
              {(library.items || []).map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleNew}>
              Nieuw
            </button>
            <button type="button" onClick={handleDuplicate}>
              Dupliceer
            </button>
            <button type="button" onClick={handleRename}>
              Hernoem
            </button>
            <button type="button" onClick={handleDelete}>
              Verwijder
            </button>
            <span className="toolbar-spacer" aria-hidden="true" />
            <button type="button" onClick={handleEmail}>
              E‑mail
            </button>
            <button type="button" onClick={handleShare}>
              Deel
            </button>
            <button type="button" onClick={handleImportClick}>
              Importeer
            </button>
            <button type="button" onClick={handleExportRecipe}>
              Exporteer
            </button>
            <button type="button" onClick={handleExportLibrary} title="Exporteer alle recepten">
              Exporteer all
            </button>
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              accept="application/json"
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </header>

      <main className="wrap main-grid">
        <section className="grid stats-grid">
          {stats.map(({ title, value, sub }) => (
            <div key={title} className="card pad">
              <div className="stat-title">{title}</div>
              <div className="stat-val">{value}</div>
              <div className="stat-sub">{sub}</div>
            </div>
          ))}
        </section>

        <section className="card summary-card">
          <div className="pad summary-header">
            <div className="summary-title">Samenvatting ingrediënten (na consolidatie)</div>
            <div className="subtle">
              Voordeeg en starter automatisch in totalen meegeteld. Dit is wat er écht in het deeg
              zit.
            </div>
          </div>
          <div className="pad">
            <table>
              <thead>
                <tr>
                  <th scope="col">Ingrediënt</th>
                  <th scope="col" className="numeric">
                    Totaal (g)
                  </th>
                </tr>
              </thead>
              <tbody>
                {consolidatedRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td className="numeric">{fmt(row.grams)}</td>
                  </tr>
                ))}
                <tr className="tr-strong">
                  <td>Totaal deeg</td>
                  <td className="numeric">{fmt(computed.doughTotal, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="cols">
          <div className="block">
            <div className="block-h">Hoofddeeg</div>
            <div>
              {mainBlocks.flatMap((block) =>
                (block.items || []).map((item, index) => (
                  <div key={`${block.name}-${index}`} className="row">
                    <div className="row-info">
                      <div className="row-label">{item.label}</div>
                      <div className="badge">
                        🔗 gelinkt als “{item.canonical || resolveCanonical(item.label, currentRecipe.canonicalMap)}”
                      </div>
                    </div>
                    <div className="row-value">{fmt(item.grams)} g</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="block">
            <div className="block-h">Voordeeg + Starter</div>
            <div>
              {prefermentBlocks.length === 0 && otherBlocks.length === 0 && (
                <div className="pad subtle">Nog geen voordeeg</div>
              )}
              {[...prefermentBlocks, ...otherBlocks].map((block, blockIndex) => {
                const mass =
                  block.mass ||
                  (block.items || []).reduce((sum, item) => sum + (Number(item.grams) || 0), 0);
                return (
                  <React.Fragment key={`${block.name}-${blockIndex}`}>
                    <div className="well">
                      <strong>{block.name}</strong> · Massa: {fmt(mass)} g
                    </div>
                    {(block.items || []).map((item, index) => (
                      <div key={`${block.name}-${index}`} className="row">
                        <div className="row-info">
                          <div className="row-label">{item.label}</div>
                          <div className="badge">
                            🔗 gelinkt als “
                            {item.canonical || resolveCanonical(item.label, currentRecipe.canonicalMap)}”
                          </div>
                        </div>
                        <div className="row-value">{fmt(item.grams)} g</div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <details className="adv" open>
            <summary>Geavanceerd · JSON &amp; koppelingen</summary>
            <div className="editor">
              <div className="card">
                <div className="pad editor-header">
                  <div className="editor-title">Ingrediënt‑koppelingen (per recept)</div>
                  <div className="subtle">
                    Link invoerregels aan een canonieke naam ("Tarwemeel De Vriendschap" →
                    "Tarwemeel").
                  </div>
                </div>
                <div className="pad maps">
                  {Object.keys(currentRecipe.canonicalMap || {}).length === 0 ? (
                    <div className="subtle">Nog geen koppelingen</div>
                  ) : (
                    Object.entries(currentRecipe.canonicalMap || {})
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([key, value]) => (
                        <div key={key} className="row map-row">
                          <div className="map-key">{key}</div>
                          <div className="subtle">
                            Canoniek: <strong>{value}</strong>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
              <div className="json-editor">
                <textarea value={jsonDraft} onChange={handleJsonChange} aria-label="Recept JSON" />
                <div className="sub json-status" role="status">
                  {jsonError}
                </div>
              </div>
            </div>
          </details>
        </section>
      </main>
    </div>
  );
}

export default App;
