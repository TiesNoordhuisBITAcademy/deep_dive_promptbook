import { getCompositePrompts } from './promptbook.js'

const state = {
    compositePrompts: [],
    selectPrompt: null,
};

getCompositePrompts().then(updateCompositePrompts);

function updateCompositePrompts(compositePrompts) {
    state.compositePrompts = compositePrompts;
    renderCompositePrompts();
}

function renderCompositePrompts() {
    document.querySelector('#composite-prompts-list').innerHTML = '';

    for (const compositePrompt of state.compositePrompts) {
        addPromptToOverview(compositePrompt);
    }
}

function addPromptToOverview(compositePrompt) {
    const template = document.querySelector('#composite-prompt-list-item-template').content.cloneNode(true);
    template.querySelector('.composite-prompt-title').innerText = compositePrompt.title;
    template.querySelector('.composite-prompt-description').innerText = compositePrompt.description;
    template.querySelector('.composite-prompt-detail-button')
        .addEventListener('click', () => {selectPrompt(compositePrompt.id)});
    document.querySelector('#composite-prompts-list').appendChild(template);
}