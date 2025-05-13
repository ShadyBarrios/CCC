const method = [[String.fromCharCode(83),String.fromCharCode(72),String.fromCharCode(65)].join(''), [String.fromCharCode(50),String.fromCharCode(53),String.fromCharCode(54)].join('')].join(String.fromCharCode(45))

async function compute(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(method, data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
}

const secretButton = document.getElementById("secret_button");
const password = ["3e363b34340421", "3688a1", "c7eb4e6df", "4e", "1ce2ff7", "", "fc0be3960b15ea237811"].join(String.fromCharCode(99));

if(secretButton){
    secretButton.addEventListener("click", async() =>
    {
        const input = prompt("what is the code...");

        if(!input) return;

        const result = await compute(input);

        if(result === password){
            setTimeout(() => window.location.href = "secret.html", 500);
        }
        else{
            alert("Incorrect password");
        }
    })
}