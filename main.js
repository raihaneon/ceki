let body = document.body;

function addPlayer() {
    let nama = prompt("Nama Player");
    if (nama) {
        let playerList = document.getElementById("playerList");

        let card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <h5>${nama} - Skor: 0</h5>
            <button class="btn btn-primary btn-sm mt-2" onclick="addScore(this)">Tambah Skor</button>
        `;

        playerList.appendChild(card);

        let cards = document.querySelectorAll(".player-card");
        if (cards.length >= 4) {
            document.getElementById("tambahPlayer").style.display = "none";
            document.getElementById("tambahSkor").style.display = "block";
        }
    }
}

function addScore(button) {
    let card = button.closest(".player-card");
    let nama = card.querySelector("h5").textContent.split(" - ")[0];
    let skorSekarang = parseInt(card.querySelector("h5").textContent.split(" - ")[1].split(": ")[1]);
    let skorBaru = parseInt(prompt(`Tambah Skor untuk ${nama}:`), 10);
    if (!isNaN(skorBaru)) {
        let skorTotal = skorSekarang + skorBaru;
        card.querySelector("h5").textContent = `${nama} - Skor: ${skorTotal}`;
    } else {
        alert("Skor harus berupa angka.");
    }
}