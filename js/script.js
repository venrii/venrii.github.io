document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");
    const unlockBtn = document.getElementById("unlock-btn");
    const codeInput = document.getElementById("code-input");
    const overlay = document.getElementById("overlay");
    const content = document.getElementById("content");
    const typedText = document.getElementById("typed-text");

    const correctCode = "073125"; // Set your static code here
    const message = 
`Hey <span style="color: red;">Thea</span>,\n\n Happy Valentine’s Day! 
I wanted to tell you how much I appreciate you so here's a website I quickly made! 
Honestly, I’m glad for you every day, but today is a good excuse to actually say it. 
Looking back at how we met, I just added you in <span style="color: lightblue;">Mic Up</span> and we eventually got in touch again in <span style="color: lightgreen;">Evade</span>, it's pretty silly honestly. 
But being completely honest, I have no clue how I managed to get to this point and let's just say I'm glad it did. 
Remembering the time you <span style="color: brown;">messed up cooking Adobo</span> while I was quite literally telling you that you didn't need to put salt was one of my earliest and funniest memories with you. 
One of my favorite memories are definitely all the <span style="color: gold;">acting we do in VRChat</span>—the amount of funny, serious, or even random scenarios we did was incredibly memorable and hard to forget. 
Even though we’re just online for now, you have this way of making things more fun and less stressful just by being there. 
I’m genuinely excited for all the stuff we haven’t done yet and all the memories we still have to make. 
Thank you for being there for me, for all the laughs we've shared, and for making me feel like the luckiest person. 
I would always choose you and only you. Just wanted you to know that you're loved—way more than I can even code and program into these kinds of text.\n 
Forever yours,\n\n 
<span style="color: purple;">Venri</span>`;
    
    const typingSound = new Audio("sfx/typewriter.mp3"); // Load typing sound
    typingSound.volume = 0.02; // Adjust volume if necessary

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
    
                        let delay = 100; // Default typing speed
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
