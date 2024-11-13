const promptTemplate = document.getElementById('prompt-option');
const promptOptionsDisplay = document.getElementById('prompt-options-display');
const customPrompt = document.getElementById('custom-prompt');
const goToChatGPT = document.getElementById('custom-prompt-submit');

const selectPrompt = (promptId) => {
    fetch(`http://localhost:8000/composite_prompts/${promptId}/expanded`)
        .then(response => response.json())
        .then(prompt => {
            const promptText = prompt.fragments.reduce((acc, fragment) => {
                return `${acc} \n\n${fragment.content}`;
            }, '');
            customPrompt.value = promptText;
        });
}

fetch(`http://localhost:8000/composite_prompts`)
    .then(response => response.json())
    .then(composite_prompts => {
        for (const composite_prompt of composite_prompts) {
            const template = promptTemplate.content.cloneNode(true);
            template.querySelector('h2').innerText = composite_prompt.title;
            template.querySelector('p').innerText = composite_prompt.description;
            template.querySelector('button').addEventListener('click', () => {selectPrompt(composite_prompt.id)});
            promptOptionsDisplay.appendChild(template);
        }
    });

goToChatGPT.addEventListener('click', () => {
    document.location.href = `https://chatgpt.com/?q=${customPrompt.value}`;
});