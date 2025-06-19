document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate_prompt');
    const resetButton = document.getElementById('reset_button');
    const promptIndonesia = document.getElementById('prompt_indonesia');
    const promptInggris = document.getElementById('prompt_inggris');

    const inputIds = [
        'deskripsi_karakter',
        'detail_pakaian',
        'pose_karakter',
        'ekspresi_karakter',
        'latar_belakang',
        'pencahayaan',
        'kamera_foto',
        'posisi_kamera',
        'detail_visual'
    ];

    generateButton.addEventListener('click', async () => {
        let fullPrompt = "Buatlah gambar dari seorang karakter dengan detail sebagai berikut: ";
        
        const deskripsi_karakter = document.getElementById('deskripsi_karakter').value.trim();
        if (deskripsi_karakter) {
            fullPrompt += `Karakter utama adalah ${deskripsi_karakter}. `;
        }

        const detail_pakaian = document.getElementById('detail_pakaian').value.trim();
        if (detail_pakaian) {
            fullPrompt += `Pakaian yang dikenakan adalah ${detail_pakaian}. `;
        }

        const pose_karakter = document.getElementById('pose_karakter').value.trim();
        if (pose_karakter) {
            fullPrompt += `Pose karakter ${pose_karakter}. `;
        }

        const ekspresi_karakter = document.getElementById('ekspresi_karakter').value.trim();
        if (ekspresi_karakter) {
            fullPrompt += `Ekspresi wajahnya ${ekspresi_karakter}. `;
        }

        const latar_belakang = document.getElementById('latar_belakang').value.trim();
        if (latar_belakang) {
            fullPrompt += `Berlatar di ${latar_belakang}. `;
        }

        const pencahayaan = document.getElementById('pencahayaan').value.trim();
        if (pencahayaan) {
            fullPrompt += `Dengan pencahayaan ${pencahayaan}. `;
        }

        const kamera_foto = document.getElementById('kamera_foto').value.trim();
        if (kamera_foto) {
            fullPrompt += `Gaya foto menyerupai hasil ${kamera_foto}. `;
        }

        const posisi_kamera = document.getElementById('posisi_kamera').value.trim();
        if (posisi_kamera) {
            fullPrompt += `Sudut pengambilan gambar dari ${posisi_kamera}. `;
        }

        const detail_visual = document.getElementById('detail_visual').value.trim();
        if (detail_visual) {
            fullPrompt += `Detail visual tambahan: ${detail_visual}. `;
        }
        
        const negative_prompt = document.getElementById('negative_prompt').value.trim();
        if (negative_prompt) {
            fullPrompt += `Negative Prompt: ${negative_prompt}.`;
        }

        promptIndonesia.value = fullPrompt.trim();

        try {
            const translatedText = await translate(fullPrompt, { to: 'en', engine: 'google' });
            promptInggris.value = translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            promptInggris.value = 'Translation failed. Please check your internet connection or API key.';
        }
    });

    resetButton.addEventListener('click', () => {
        inputIds.forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('negative_prompt').value = '';
        promptIndonesia.value = '';
        promptInggris.value = '';
    });

    // Helper function for translation
    async function translate(text, options) {
        // This is a placeholder for a real translation API call.
        // Using a free, client-side library for this example.
        // You would replace this with a call to a proper translation service for production.
        const { to, engine } = options;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                return data[0].map(item => item[0]).join('');
            }
            return 'Translation failed';
        } catch (error) {
            console.error('Translation fetch error:', error);
            return 'Translation failed';
        }
    }
}); 