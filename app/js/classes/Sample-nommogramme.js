import { createEl } from '../classes/Dom.js'

export function createSample() {
    const wrapper = createEl("div", { className: "sample_interval_container" })
    const inputInterval = createEl("input", { className: "interval_after_ingestion", type: "number" });
    const inputConcentration = createEl("input", { className: "interval_paracetamol_concentration" });

    wrapper.appendChild(inputInterval);
    wrapper.appendChild(inputConcentration);

    return wrapper
}