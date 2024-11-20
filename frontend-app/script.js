const promptTemplate = document.getElementById('prompts-overview-template');
const promptOverview = document.getElementById('prompts-overview');
const promptTitleElement = document.getElementById('prompt-title');
const promptFragmentTemplate = document.getElementById('prompt-fragment-template');
const promptFragmentsOverview = document.getElementById('prompt-fragments-overview');
const authorOptionTemplate = document.getElementById('author-option-template');
const authorSelect = document.getElementById('prompt-fragment-add-author');
const promptFragmentAddFrom = document.getElementById('prompt-fragment-add');
const askPromptButton = document.getElementById('ask-prompt-button');
let selectedPromptId;


const selectPrompt = (promptId) => {
    fetch(`http://localhost:8000/composite_prompts/${promptId}/expanded`)
        .then(response => response.json())
        .then(prompt => {
            selectedPromptId = prompt.id;
            clearPromptFragments();
            prompt.fragments.forEach(fragment => {
                addFragmentToOverview(fragment);
            })
        });
}

fetch(`http://localhost:8000/composite_prompts`)
    .then(response => response.json())
    .then(composite_prompts => {
        for (const composite_prompt of composite_prompts) {
            addPromptToOverview(composite_prompt);
        }
    });

fetch(`http://localhost:8000/authors`)
    .then(response => response.json())
    .then(authors => {
        for (const author of authors) {
            addAuthorToOptions(author);
        }
    });

addAuthorToOptions = (author) => {
    const template = authorOptionTemplate.content.cloneNode(true);
    template.querySelector('option').innerText = author.name;
    template.querySelector('option').value = author.id;
    authorSelect.appendChild(template);
}

promptFragmentAddFrom.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = event.target.querySelector('textarea').value;
    const authorId = event.target.querySelector('select').value;
    const description = event.target.querySelector('input#prompt-fragment-add-description').value;

    const newFragment = await fetch('http://localhost:8000/prompt_fragments', {
        method: 'POST',
        body: JSON.stringify({
            author_id: authorId,
            content: content,
            description: description,
        }),
    }).then(response => response.json());

    const order_index = event.target.querySelector('input#order-index').value;
    
    fetch(`http://localhost:8000/composite_prompts/${selectedPromptId}/fragments/${newFragment.id}`,
        {
            method: 'POST',
            body: JSON.stringify({
                order_index: order_index,
            })
        }
    );

    addFragmentToOverview(newFragment);
});

askPromptButton.addEventListener('click', async () => {
    let collectedPrompt = '';
    document.querySelectorAll('.prompt-fragment-content')
        .forEach((element) => {
            collectedPrompt += element.innerText;
        })
    fetch(`http://localhost:11434/api/generate`, {
        method: 'POST',
        body: JSON.stringify({
            "model": "llama3.2",
            "prompt": collectedPrompt,
            "stream": false
        })
    })
        .then(response => response.json())
        .then(data => {
            const responseElement = document.getElementById('prompt-response');
            responseElement.innerText = data.response;
        });
});


function addPromptToOverview(prompt) {
    const template = promptTemplate.content.cloneNode(true);
    template.querySelector('details summary').innerText = prompt.title;
    template.querySelector('details span').innerText = prompt.description;
    template.querySelector('button').addEventListener('click', () => {selectPrompt(prompt.id)});
    promptOverview.appendChild(template);
}

function addFragmentToOverview(fragment) {
    const template = promptFragmentTemplate.content.cloneNode(true);
    template.querySelector('.prompt-fragment-content').innerText = fragment.content;
    template.querySelector('button').addEventListener('click', (event) => {
        deletePromptFragment(fragment.id);
        event.target.parentElement.remove();
    });
    promptFragmentsOverview.appendChild(template);
}

function clearPromptFragments() {
    promptFragmentsOverview.innerHTML = '';
}

function deletePromptFragment(fragmentId) {
    fetch(`http://localhost:8000/prompt_fragments/${fragmentId}`, {
        method: 'DELETE',
    });
}

