document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");
    const unlockBtn = document.getElementById("unlock-btn");
    const codeInput = document.getElementById("code-input");
    const overlay = document.getElementById("overlay");
    const content = document.getElementById("content");
    const typedText = document.getElementById("typed-text");

    const correctCode = "123456"; // Set your static code here
    const message = 
`Hey <span style="color: red;">love</span>,\n\n
Happy Valentine’s Day! I apologize for being late but I just wanted to take a moment to tell you how much I appreciate you—not just today, but every single day.
Thinking back to how we first met, it’s funny how things played out. A <span style="color: lightblue;">karaoke game</span> brought us together, and even though it was kinda awkward at first,
I wouldn’t change a thing. Then came that <span style="color: lightgreen;">silly cooking game</span>, and somehow, between the chaos and laughter, we just clicked.
Looking back, I think that’s when I realized how easy it was to be around you—how fun, how natural. And then came <span style="color: gold;">Rise to Royalty</span>.
Hours upon hours of grinding money by sitting on stalls and delivering letters—whether by foot or on horseback. It sounds exhausting when I say it like that, but somehow, with you,
it was never boring. And of course, how could I forget our playful little titles? “<span style="color: lightblue;">My Count</span>” and “<span style="color: lightblue;">My Countess</span>”—just another thing that made our time together feel special.
Then we stumbled upon <span style="color: darkred;">Pillar Chase</span>, and, well… that was a whole new level of chaos. Running around, desperately trying to survive, all while goofing off and somewhat bullying random people (just a little).
But through that, we also met new people, laughed way too much, and somehow made even a horror game feel more fun than scary. It’s just another reminder that no matter what we’re doing,
as long as I’m with you, it’s always a good time. And the best part? This is just the beginning.
We’ve already been through so much, but I know there are still so many more adventures waiting for us—new games to discover, new stories to create, and countless more moments to share.
And I can’t wait to experience them all with you. Thank you for being you. For your patience, your kindness, and for always making me feel like I’m the happiest person in the world.
I love our moments together, big and small, and I wouldn't trade them for anything. So, on this (supposed) Valentine’s Day (and every day after),
just know that you are loved—so much more than words can say.\n 
Forever yours, \n\n 
<span style="color: purple;">Venri</span>`;
    
    const typingSound = new Audio("sfx/typewriter.mp3"); // Load typing sound
    typingSound.volume = 0.1; // Adjust volume if necessary

    function checkCode() {
        if (codeInput.value === correctCode) {
            // Play unlock sound
            let unlockSound = new Audio("sfx/unlock.mp3");
            unlockSound.play();

            // Fade out overlay
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
                content.style.display = "block";
                typeSentence(message, typedText);
            }, 1500); // Adjust timing to match cinematic fade
        } else {
            alert("Wrong code. Try again.");
        }
    }

    function typeSentence(sentence, element) {
        element.innerHTML = ""; // Clear previous text
    
        let index = 0;
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = sentence; // Convert string to HTML
    
        let nodes = Array.from(tempDiv.childNodes); // Convert child nodes to an array
        function typeNextNode(nodeIndex = 0) {
            if (nodeIndex < nodes.length) {
                let node = nodes[nodeIndex];
    
                if (node.nodeType === Node.TEXT_NODE) {
                    typeText(node.textContent, () => typeNextNode(nodeIndex + 1), element);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    let newElement = document.createElement(node.tagName);
                    Array.from(node.attributes).forEach(attr => newElement.setAttribute(attr.name, attr.value));
                    element.appendChild(newElement);
                    typeText(node.textContent, () => typeNextNode(nodeIndex + 1), newElement);
                }
            }
        }
    
        function typeText(text, callback, parent) {
            let j = 0;
            function typeChar() {
                if (j < text.length) {
                    let char = text.charAt(j);
                    if (char === "\n") {
                        parent.appendChild(document.createElement("br"));
                        setTimeout(typeChar, 1); // 2s delay for new lines
                    } else {
                        parent.innerHTML += char;
    
                        // Play typing sound
                        typingSound.currentTime = 0; // Restart sound
                        typingSound.play();
    
                        let delay = 1000; // Default typing speed
                        if (char === ".") delay = 2000; // 2s delay for periods
                        else if (char === ",") delay = 600; // 1s delay for commas
                        else if (char === "-") delay = 600;
                        else if (char === "!") delay = 1000;
    
                        setTimeout(typeChar, delay);
                    }
                    j++;
                } else {
                    callback();
                }
            }
            typeChar();
        }
    
        typeNextNode();
    }
    
    

    unlockBtn.addEventListener("click", checkCode);
});
