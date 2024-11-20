/**
 * Fetches a list of prompt fragments.
 *
 * @async
 * @function getPromptFragments
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of prompt fragments.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * Each prompt fragment object includes:
 * @property {number} id - The unique identifier of the fragment (read-only).
 * @property {number} author_id - The ID of the author who created the fragment.
 * @property {string} content - The content of the fragment.
 * @property {string} description - A description of the fragment.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function getPromptFragments() {
    const response = await fetch('http://localhost:8000/prompt_fragments');
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Creates a prompt fragment.
 *
 * @async
 * @function createPromptFragment
 * @param {Object} promptFragment - The prompt fragment object to create.
 * @param {number} promptFragment.author_id - The ID of the author who created the fragment.
 * @param {string} promptFragment.content - The content of the fragment.
 * @param {string} promptFragment.description - A description of the fragment.
 * @returns {Promise<Object>} A promise that resolves to the created prompt fragment object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The prompt fragment object includes:
 * @property {number} id - The unique identifier of the fragment (read-only).
 * @property {number} author_id - The ID of the author who created the fragment.
 * @property {string} content - The content of the fragment.
 * @property {string} description - A description of the fragment.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function createPromptFragment(promptFragment) {
    if (
        !promptFragment.author_id
        || !promptFragment.content
        || !promptFragment.description
    ) {
        throw new Error('Prompt fragment must have an author ID, content, and description');
    }
    const response = await fetch('http://localhost:8000/prompt_fragments', {
        method: 'POST',
        body: JSON.stringify(promptFragment),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Updates a prompt fragment.
 *
 * @async
 * @function updatePromptFragment
 * @param {Object} promptFragment - The prompt fragment object to update.
 * @param {number} promptFragment.id - The ID of the prompt fragment.
 * @param {number} promptFragment.author_id - The ID of the author who created the fragment.
 * @param {string} promptFragment.content - The content of the fragment.
 * @param {string} promptFragment.description - A description of the fragment.
 * @returns {Promise<Object>} A promise that resolves to the updated prompt fragment object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The prompt fragment object includes:
 * @property {number} id - The unique identifier of the fragment (read-only).
 * @property {number} author_id - The ID of the author who created the fragment.
 * @property {string} content - The content of the fragment.
 * @property {string} description - A description of the fragment.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function updatePromptFragment(promptFragment) {
    if (
        !promptFragment.id
        || !promptFragment.author_id
        || !promptFragment.content
        || !promptFragment.description
    ) {
        throw new Error('Prompt fragment must have an ID, author ID, content, and description');
    }
    const response = await fetch(`http://localhost:8000/prompt_fragments/${promptFragment.id}`, {
        method: 'PUT',
        body: JSON.stringify(promptFragment),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Deletes a prompt fragment.
 *
 * @async
 * @function deletePromptFragment
 * @param {Object} promptFragment - The prompt fragment object to delete.
 * @param {number} promptFragment.id - The ID of the prompt fragment.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function deletePromptFragment(promptFragment) {
    if (!promptFragment.id) {
        throw new Error('Prompt fragment must have an ID');
    }
    const response = await fetch(`http://localhost:8000/prompt_fragments/${promptFragment.id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

/**
 * Fetches a prompt fragment with tags.
 * 
 * @async
 * @function getPromptFragmentWithTags
 * @param {number} id - The ID of the prompt fragment.
 * @returns {Promise<Object>} A promise that resolves to a prompt fragment object with tags.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The prompt fragment object includes:
 * @property {number} id - The unique identifier of the fragment (read-only).
 * @property {number} author_id - The ID of the author who created the fragment.
 * @property {string} content - The content of the fragment.
 * @property {string} description - A description of the fragment.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 * @property {Array<Object>} tags - An array of tag objects associated with the fragment.
 * Each tag object includes:
 * @property {number} id - The unique identifier of the tag (read-only).
 * @property {string} name - The name of the tag.
 */
async function getPromptFragmentWithTags(id) {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${id}/with_tags`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetches a list of composite prompts.
 *
 * @async
 * @function getCompositePrompts
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of composite prompts.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * Each composite prompt object includes:
 * @property {number} id - The unique identifier of the composite prompt (read-only).
 * @property {number} author_id - The ID of the author who created the composite prompt.
 * @property {string} title - The title of the composite prompt.
 * @property {string} description - A description of the composite prompt.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function getCompositePrompts() {
    const response = await fetch('http://localhost:8000/composite_prompts');
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Creates a composite prompt.
 *
 * @async
 * @function createCompositePrompt
 * @param {Object} compositePrompt - The composite prompt object to create.
 * @param {number} compositePrompt.author_id - The ID of the author who created the composite prompt.
 * @param {string} compositePrompt.title - The title of the composite prompt.
 * @param {string} compositePrompt.description - A description of the composite prompt.
 * @returns {Promise<Object>} A promise that resolves to the created composite prompt object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The composite prompt object includes:
 * @property {number} id - The unique identifier of the composite prompt (read-only).
 * @property {number} author_id - The ID of the author who created the composite prompt.
 * @property {string} title - The title of the composite prompt.
 * @property {string} description - A description of the composite prompt.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function createCompositePrompt(compositePrompt) {
    if (
        !compositePrompt.author_id
        || !compositePrompt.title
    ) {
        throw new Error('Composite prompt must have an author ID and title');
    }
    const response = await fetch('http://localhost:8000/composite_prompts', {
        method: 'POST',
        body: JSON.stringify(compositePrompt),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Updates a composite prompt.
 *
 * @async
 * @function updateCompositePrompt
 * @param {Object} compositePrompt - The composite prompt object to update.
 * @param {number} compositePrompt.id - The ID of the composite prompt.
 * @param {number} compositePrompt.author_id - The ID of the author who created the composite prompt.
 * @param {string} compositePrompt.title - The title of the composite prompt.
 * @param {string} compositePrompt.description - A description of the composite prompt.
 * @returns {Promise<Object>} A promise that resolves to the updated composite prompt object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The composite prompt object includes:
 * @property {number} id - The unique identifier of the composite prompt (read-only).
 * @property {number} author_id - The ID of the author who created the composite prompt.
 * @property {string} title - The title of the composite prompt.
 * @property {string} description - A description of the composite prompt.
 * @property {string} created_at - The creation timestamp (read-only, ISO 8601 format).
 * @property {string} updated_at - The last updated timestamp (read-only, ISO 8601 format).
 */
async function updateCompositePrompt(compositePrompt) {
    if (
        !compositePrompt.id
        || !compositePrompt.author_id
        || !compositePrompt.title
    ) {
        throw new Error('Composite prompt must have an ID, author ID, and title');
    }
    const response = await fetch(`http://localhost:8000/composite_prompts/${compositePrompt.id}`, {
        method: 'PUT',
        body: JSON.stringify(compositePrompt),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Deletes a composite prompt.
 *
 * @async
 * @function deleteCompositePrompt
 * @param {Object} compositePrompt - The composite prompt object to delete.
 * @param {number} compositePrompt.id - The ID of the composite prompt.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function deleteCompositePrompt(compositePrompt) {
    if (!compositePrompt.id) {
        throw new Error('Composite prompt must have an ID');
    }
    const response = await fetch(`http://localhost:8000/composite_prompts/${compositePrompt.id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

/**
 * Links a prompt fragment to a composite prompt.
 *
 * @async
 * @function linkPromptFragmentToCompositePrompt
 * @param {Object} promptFragment - The prompt fragment object to link.
 * @param {number} promptFragment.id - The ID of the prompt fragment.
 * @param {Object} compositePrompt - The composite prompt object to link to.
 * @param {number} compositePrompt.id - The ID of the composite prompt.
 * @param {number} orderIndex - The order index of the prompt fragment in the composite prompt.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function linkPromptFragmentToCompositePrompt(promptFragment, compositePrompt, orderIndex) {
    if (!promptFragment.id || !compositePrompt.id) {
        throw new Error('Prompt fragment and composite prompt must have IDs');
    }
    const response = await fetch(
        `http://localhost:8000/composite_prompts/${compositePrompt.id}/fragments/${promptFragment.id}`,
        {
            method: 'POST',
            body: JSON.stringify({
                order_index: orderIndex,
            }),
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

/**
 * Unlinks a prompt fragment from a composite prompt.
 *
 * @async
 * @function unlinkPromptFragmentFromCompositePrompt
 * @param {Object} promptFragment - The prompt fragment object to unlink.
 * @param {number} promptFragment.id - The ID of the prompt fragment.
 * @param {Object} compositePrompt - The composite prompt object to unlink from.
 * @param {number} compositePrompt.id - The ID of the composite prompt.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function unlinkPromptFragmentFromCompositePrompt(promptFragment, compositePrompt) {
    if (!promptFragment.id || !compositePrompt.id) {
        throw new Error('Prompt fragment and composite prompt must have IDs');
    }
    const response = await fetch(
        `http://localhost:8000/composite_prompts/${compositePrompt.id}/fragments/${promptFragment.id}`,
        {
            method: 'DELETE',
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

/**
 * Updates the order index of a prompt fragment in a composite prompt.
 *
 * @async
 * @function updatePromptFragmentOrderIndex
 * @param {Object} promptFragment - The prompt fragment object to update.
 * @param {number} promptFragment.id - The ID of the prompt fragment.
 * @param {Object} compositePrompt - The composite prompt object containing the fragment.
 * @param {number} compositePrompt.id - The ID of the composite prompt.
 * @param {number} orderIndex - The new order index of the prompt fragment in the composite prompt.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function updatePromptFragmentOrderIndex(promptFragment, compositePrompt, orderIndex) {
    if (!promptFragment.id || !compositePrompt.id) {
        throw new Error('Prompt fragment and composite prompt must have IDs');
    }
    const response = await fetch(
        `http://localhost:8000/composite_prompts/${compositePrompt.id}/fragments/${promptFragment.id}`,
        {
            method: 'PUT',
            body: JSON.stringify({
                order_index: orderIndex,
            }),
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

/**
 * Fetches a list of authors.
 *
 * @async
 * @function getAuthors
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of authors.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * Each author object includes:
 * @property {number} id - The unique identifier of the author (read-only).
 * @property {string} name - The name of the author.
 */
async function getAuthors() {
    const response = await fetch('http://localhost:8000/authors');
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Creates an author.
 *
 * @async
 * @function createAuthor
 * @param {Object} author - The author object to create.
 * @param {string} author.name - The name of the author.
 * @returns {Promise<Object>} A promise that resolves to the created author object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The author object includes:
 * @property {number} id - The unique identifier of the author (read-only).
 * @property {string} name - The name of the author.
 */
async function createAuthor(author) {
    if (!author.name) {
        throw new Error('Author must have a name');
    }
    const response = await fetch('http://localhost:8000/authors', {
        method: 'POST',
        body: JSON.stringify(author),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Updates an author.
 *
 * @async
 * @function updateAuthor
 * @param {Object} author - The author object to update.
 * @param {number} author.id - The ID of the author.
 * @param {string} author.name - The name of the author.
 * @returns {Promise<Object>} A promise that resolves to the updated author object.
 * @throws {Error} Throws an error if the fetch request fails.
 * 
 * The author object includes:
 * @property {number} id - The unique identifier of the author (read-only).
 * @property {string} name - The name of the author.
 */
async function updateAuthor(author) {
    if (!author.id || !author.name) {
        throw new Error('Author must have an ID and name');
    }
    const response = await fetch(`http://localhost:8000/authors/${author.id}`, {
        method: 'PUT',
        body: JSON.stringify(author),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Deletes an author.
 *
 * @async
 * @function deleteAuthor
 * @param {Object} author - The author object to delete.
 * @param {number} author.id - The ID of the author.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function deleteAuthor(author) {
    if (!author.id) {
        throw new Error('Author must have an ID');
    }
    const response = await fetch(`http://localhost:8000/authors/${author.id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
}

export {
    getPromptFragments,
    createPromptFragment,
    updatePromptFragment,
    deletePromptFragment,
    getPromptFragmentWithTags,
    getCompositePrompts,
    createCompositePrompt,
    updateCompositePrompt,
    deleteCompositePrompt,
    linkPromptFragmentToCompositePrompt,
    unlinkPromptFragmentFromCompositePrompt,
    updatePromptFragmentOrderIndex,
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};