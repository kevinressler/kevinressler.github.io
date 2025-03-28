let i=0, j=0, k=0;
const text1 = "Hi,"
const text2 = "I'm Kevin"
const text3 = "CS Student @Pitt"
const speed = 80;


function typeLine1() {
    if(i < text1.length) {
        document.getElementById("line1").textContent += text1.charAt(i);
        i++;
        setTimeout(typeLine1, speed)
    }
    else {
        document.getElementById("line1").style.borderRight = "none"
        document.getElementById("line2").style.borderRight = "3px solid #1D2437"
        setTimeout(typeLine2, speed)
    }
}

function typeLine2() {
    if(j < text2.length) {
        document.getElementById("line2").textContent += text2.charAt(j);
        j++
        setTimeout(typeLine2, speed)
    }
    else {
        document.getElementById("line2").style.borderRight = "none"
        document.getElementById("line3").style.borderRight = "3px solid #1D2437"
        setTimeout(typeLine3, speed)
    }
}

function typeLine3() {
    if(k < text3.length) {
        document.getElementById("line3").textContent += text3.charAt(k);
        k++
        setTimeout(typeLine3, speed)
    }
    else {
        const icons = document.querySelector(".socialIcons");
        setTimeout(() => {
            icons.classList.add("show") 
            document.getElementById("line3").classList.add("blinking")
            setTimeout(() => {
                document.getElementById("line3").style.borderRight = "none"
            }, 6000)
            
            
        }, 500);
    }
}
