const textBox = document.getElementById('text-input');
const maxLengthOfTextBox = textBox.maxLength;

const charCount = document.getElementById('char-count');
const modesSelect = document.getElementById('mode-select');
const runBtn = document.getElementById('run-btn');
const apiKey = document.getElementById('api-key');
const loader = document.getElementById('loader');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const errorMSG = document.getElementById('error-msg');

const helpBtn = document.getElementById('help-procedure-toggler');
const closeBtn = document.getElementById('close-btn');
const popover = document.getElementById('popover');

// Adding an event listener to the textarea
textBox.addEventListener('input', (e) => {
    let textLength = textBox.value.length;
    charCount.innerText = `${textLength}/${maxLengthOfTextBox}`;
});

// Open popover
helpBtn.addEventListener('click', () => {
  popover.style.display = 'flex';
});

// Close popover
closeBtn.addEventListener('click', () => {
  popover.style.display = 'none';
});

// Close popover when clicking outside
popover.addEventListener('click', (e) => {
  if (e.target === popover) {
    popover.style.display = 'none';
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popover.style.display = 'none';
  }
});

// Function that will return the prompt based on the mode the user has selected:
function buildPrompt(pastedText, mode) {
    if (mode === 'summarize') {
        return `Summarize the following text in a clear, concise way. Use bullet points if the text is long. Keep the most important ideas only. Text: ${pastedText}`;
    }

    else if (mode === 'fix-grammar') {
        return `Fix all grammar, spelling, and punctuation errors in the text below. Do not change the meaning, tone, or structure — only fix mistakes. Return only the corrected text, nothing else. Text: ${pastedText}`;
    }

    else if (mode === 'rewrite-formal') {
        return `Rewrite the following text in a professional and formal tone. Use proper vocabulary, avoid slang or casual language. Keep the original meaning intact.Text: ${pastedText}`;
    }

    else if (mode === 'rewrite-casual') {
        return `Rewrite the following text in a casual, friendly, and conversational tone. Make it sound natural and relaxed, like texting a friend. Keep the original meaning intact. Text: ${pastedText}`;
    }

    else if (mode === 'translate') {
        return `Detect the language of the following text and translate it to English. If it is already in English, translate it to Urdu. Return only the translated text, nothing else. Text: ${pastedText}`;
    }

    else {
        return `Extract the key points from the following text. Present them as a numbered list. Each point should be one clear, standalone sentence. Text: ${pastedText}`;
    }
}

async function runAI() {
    const textOfTextBox = textBox.value;
    const selectedMode = modesSelect.value;
    const apiKeyValue = apiKey.value;

    // Validity Checks: If text or apikey field is empty, throw an error msg:
    if (textOfTextBox == '') {
        errorMSG.innerText = 'Please enter some text';
        errorMSG.removeAttribute('hidden');
        return;
    }
    if (apiKeyValue == '') {
        errorMSG.innerText = 'Please enter the API key';
        errorMSG.hidden = false;
        return;
    }

    // Making the run button disabled once clicked, and loader visible
    runBtn.disabled = true;
    loader.classList.remove('hidden');

    // Clearing previous Output and error msgs if any:
    output.innerText = '';
    errorMSG.innerText = '';

    // Calling the prompt function with inputText and Mode selected:
    const prompt = buildPrompt(textOfTextBox, selectedMode);

    // Making the fetch(POST) call:
    try {
        const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

        const response = await fetch(URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKeyValue
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            }
        );

        // Handling the response:

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data.candidates[0].content.parts[0].text);

        // Actual text(result we got from the API):
        const result = data.candidates[0].content.parts[0].text;

        if (result) {
            output.innerHTML = marked.parse(result);
            // Trigger animation (remove and re-add class to restart it)
            output.classList.remove('fade-in');
            void output.offsetWidth; // Trigger reflow to restart animation
            output.classList.add('fade-in');
        } else {
            errorMSG.innerText = 'No response from API';
            errorMSG.removeAttribute('hidden');
        }

    } catch (error) {
        errorMSG.innerText = `Error: ${error.message}`;
        errorMSG.removeAttribute('hidden');
    } finally {
        loader.classList.add('hidden');
        runBtn.disabled = false;
    }
}

// Copying the result: adding an event listener to copy btn
copyBtn.addEventListener('click', (e) => {
    const textToCopy = output.innerText.trim();
    if (textToCopy && textToCopy !== 'Your result will appear here.') {
        navigator.clipboard.writeText(textToCopy);
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied ✓';
        copyBtn.classList.add('success');
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    }
})

// Adding an event listener to run button:
runBtn.addEventListener("click", (e) => {
    runAI();
});