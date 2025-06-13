document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const form = document.getElementById('prompt-form');

    // --- Element Selectors ---
    const elements = {
        judulScene: document.getElementById('judul-scene'),
        deskripsiKarakter: document.getElementById('deskripsi-karakter'),
        suaraKarakter: document.getElementById('suara-karakter'),
        aksiKarakter: document.getElementById('aksi-karakter'),
        ekspresiKarakter: document.getElementById('ekspresi-karakter'),
        latar: document.getElementById('latar'),
        gerakanKamera: document.getElementById('gerakan-kamera'),
        visualTambahanText: document.getElementById('visual-tambahan-text'),
        suasana: document.getElementById('suasana'),
        suaraLingkungan: document.getElementById('suara-lingkungan'),
        dialog: document.getElementById('dialog'),
        negativePrompt: document.getElementById('negative-prompt'),
        outputId: document.getElementById('output-id'),
        outputEn: document.getElementById('output-en')
    };

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generatePrompts);
    resetBtn.addEventListener('click', resetForm);

    // --- Main Functions ---

    function generatePrompts() {
        const inputs = getFormValues();
        
        // Generate Indonesian Prompt
        const promptId = createIndonesianPrompt(inputs);
        elements.outputId.value = promptId;

        // Generate English Prompt
        const promptEn = createEnglishPrompt(inputs);
        elements.outputEn.value = promptEn;
    }

    function resetForm() {
        form.reset();
        elements.outputId.value = '';
        elements.outputEn.value = '';
    }

    // --- Helper Functions ---

    function getFormValues() {
        return {
            judul: elements.judulScene.value.trim(),
            karakter: elements.deskripsiKarakter.value.trim(),
            suara: elements.suaraKarakter.value.trim(),
            aksi: elements.aksiKarakter.value.trim(),
            ekspresi: elements.ekspresiKarakter.value.trim(),
            latar: elements.latar.value.trim(),
            kamera: elements.gerakanKamera.value,
            visual: elements.visualTambahanText.value.trim(),
            suasana: elements.suasana.value.trim(),
            ambience: elements.suaraLingkungan.value.trim(),
            dialog: elements.dialog.value.trim(),
            negative: elements.negativePrompt.value.trim()
        };
    }

    function createIndonesianPrompt(data) {
        let prompt = `Judul Scene: ${data.judul}\n\n`;
        prompt += `Deskripsi Prompt Lengkap:\n`;
        
        let characterDesc = `Seorang karakter utama, yaitu ${data.karakter}. `;
        characterDesc += `Karakter ini ${data.aksi} dengan ekspresi ${data.ekspresi}. `;
        
        let settingDesc = `Berlatar di ${data.latar}. `;
        settingDesc += `Suasana keseluruhan adalah ${data.suasana}. `;
        
        let visualDesc = `Gaya visualnya adalah cinematic realistis, kualitas 4K. `;
        if (data.kamera) {
            visualDesc += `Gerakan kamera utama adalah ${data.kamera}. `;
        }
        if (data.visual) {
             visualDesc += `Detail visual tambahan mencakup: ${data.visual}. `;
        }

        let audioDesc = `Terdengar ${data.ambience}. Detail suara karakter adalah: ${data.suara}.`;

        prompt += `${characterDesc}${settingDesc}${visualDesc}${audioDesc}\n\n`;

        if (data.dialog) {
             prompt += `Dialog:\n${data.dialog}\n\n`;
        }

        prompt += `Negative Prompt:\n${data.negative}`;

        return prompt;
    }

    function createEnglishPrompt(data) {
        let prompt = `Scene Title: ${data.judul}\n\n`;
        prompt += `Full Prompt Description:\n`;
        
        let characterDesc = `A main character, who is ${data.karakter}. `;
        characterDesc += `This character ${data.aksi} with an expression of ${data.ekspresi}. `;
        
        let settingDesc = `The setting is ${data.latar}. `;
        settingDesc += `The overall atmosphere is ${data.suasana}. `;
        
        let visualDesc = `The visual style is cinematic realism, 4K quality. `;
        if (data.kamera) {
            visualDesc += `The main camera movement is a ${data.kamera}. `;
        }
        if (data.visual) {
             visualDesc += `Additional visual details include: ${data.visual}. `;
        }

        let audioDesc = `The ambient sound consists of ${data.ambience}. The character's voice details are: ${data.suara}.`;
        
        prompt += `${characterDesc}${settingDesc}${visualDesc}${audioDesc}\n\n`;

        if (data.dialog) {
             // As requested, the dialog is not translated.
             prompt += `Dialogue (in Indonesian):\n${data.dialog}\n\n`;
        }

        prompt += `Negative Prompt:\n${data.negative}`;
        
        return prompt;
    }
}); 