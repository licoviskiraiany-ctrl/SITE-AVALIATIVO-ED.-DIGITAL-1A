// --- GESTÃO DE DADOS (DATA OBJECTS) ---
const socialData = [
    { title: "Desigualdade de Renda", text: "Os 1% mais ricos detêm quase metade da riqueza global." },
    { title: "Educação", text: "O acesso à educação de qualidade ainda é segregado por níveis econômicos." },
    { title: "Saúde", text: "A expectativa de vida varia drasticamente entre diferentes bairros da mesma cidade." }
];

const accordionData = [
    { title: "Fator Histórico", content: "A herança colonial e sistemas de castas influenciam a estrutura atual." },
    { title: "Políticas Públicas", content: "A falta de investimento em infraestrutura básica perpetua o ciclo da pobreza." }
];

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderAccordion();
    initAccessibility();
    initScrollReveal();
});

// --- RENDERIZAÇÃO DINÂMICA ---
function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = socialData.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </article>
    `).join('');
}

function renderAccordion() {
    const container = document.getElementById('accordion-container');
    container.innerHTML = accordionData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                ${item.title}
            </button>
            <div class="accordion-content">
                <p style="padding: 15px;">${item.content}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: TAMANHO DA FONTE ---
let currentFontSize = 100;
function initAccessibility() {
    document.getElementById('btn-font-increase').addEventListener('click', () => {
        currentFontSize += 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        currentFontSize -= 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
    });

    // Alto Contraste
    document.getElementById('btn-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
}

// --- ACORDEÃO LOGIC ---
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    const target = contents[index];
    const isExpanded = target.style.maxHeight !== '0px' && target.style.maxHeight !== '';
    
    target.style.maxHeight = isExpanded ? '0px' : '200px';
}

// --- SCROLL REVEAL (ANIMAÇÃO) ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

// --- LÓGICA SIMPLIFICADA DO CARROSSEL ---
let currentSlide = 0;
document.querySelector('.next').addEventListener('click', () => {
    const track = document.getElementById('carousel-track');
    currentSlide = (currentSlide + 1) % 3; // Exemplo com 3 itens
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
});
