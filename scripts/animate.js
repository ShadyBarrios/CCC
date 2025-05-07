const fastTexts = document.querySelectorAll(".flicker-fast");

function flicker_fast() {
    fastTexts.forEach(text =>
    {
        const randomOpacity = Math.random() * (1 - 0.3) + 0.3;  
        text.style.opacity = randomOpacity;
    }
    )

    const randomInterval = Math.random() * (150 - 50) + 50;
    setTimeout(flicker_fast, randomInterval);
}

const slowTexts = document.querySelectorAll(".flicker-slow");

function flicker_slow(){
    slowTexts.forEach(text =>
        {
            const randomOpacity = Math.random() * (1 - 0.3) + 0.3;  
            text.style.opacity = randomOpacity;
        }
        )
    
        const randomInterval = Math.random() * (450-150)+150;
        setTimeout(flicker_slow, randomInterval);
}

flicker_fast();
flicker_slow();
