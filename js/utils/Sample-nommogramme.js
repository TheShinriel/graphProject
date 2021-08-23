import { createEl } from '../utils/Dom.js'

export function createSample(inputHandler) {
    const wrapper = createEl("div", { className: "sample_interval_container" })
    const inputInterval = createEl("input", { className: "interval_after_ingestion", type: "number", oninput: inputHandler });
    const inputConcentration = createEl("input", { className: "interval_paracetamol_concentration", oninput: inputHandler });

    wrapper.appendChild(inputInterval);
    wrapper.appendChild(inputConcentration);

    return wrapper
}