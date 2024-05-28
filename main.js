var players = {};
var welcomeShown = false;

window.onload = function () {
    var savedPlayersData = localStorage.getItem("playersData");
    if (savedPlayersData) {
        players = JSON.parse(savedPlayersData);
        for (var playerName in players) {
            addToList(playerName);
        }
    }

    // Periksa apakah elemen "welcome" masih ada, jika ya, hapus
    if (Object.keys(players).length > 0 && !welcomeShown) {
        var welcomeElement = document.getElementById("welcome");
        if (welcomeElement) {
            welcomeElement.remove();
            welcomeShown = true;
        }
    }

    // Set initial dark mode state from localStorage
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
    document.body.classList.toggle("dark-mode", darkModeEnabled);
    document.getElementById("darkModeSwitch").checked = darkModeEnabled;
};

function addPlayer() {
    var playerCount = Object.keys(players).length;
    if (playerCount >= 4) {
        ons.notification.toast("Maksimal 4 pemain sudah tercapai", {
            timeout: 1000
        });
        return;
    }

    ons.notification
        .prompt({
            message: "Masukkan Nama Pemain",
            title: "Tambah Pemain",
            buttonLabels: ["OK", "Cancel"],
            primaryButtonIndex: 0
        })
        .then(function (input) {
            if (input !== null && input !== "") {
                var name = input.trim();

                if (players[name]) {
                    ons.notification.toast("Nama pemain sudah ada", {
                        timeout: 1000
                    });
                    return;
                }

                players[name] = 0;

                localStorage.setItem("playersData", JSON.stringify(players));

                if (!welcomeShown) {
                    var welcomeElement = document.getElementById("welcome");
                    if (welcomeElement) {
                        welcomeElement.remove();
                    }
                    welcomeShown = true;
                }

                ons.notification.toast(name + " berhasil ditambahkan", {
                    timeout: 1000
                });

                addToList(name);
            } else if (input === null) {
                ons.notification.toast("Aksi dibatalkan", { timeout: 1000 });
            } else {
                ons.notification.toast("Silahkan masukkan nama pemain", {
                    timeout: 1000
                });
            }
        });
}

function addToList(name) {
    var list = document.getElementById("playerList");
    var listItem = document.createElement("ons-list-item");

    let rightDiv = document.createElement("div");
    rightDiv.classList.add("right");
    let addButton = document.createElement("ons-button");
    addButton.textContent = "Skor";
    addButton.onclick = function () {
        addScore(name, listItem);
    };
    rightDiv.appendChild(addButton);
    listItem.appendChild(rightDiv);

    var playerName = document.createElement("ons-list-item");
    playerName.textContent = name + " ";
    listItem.appendChild(playerName);

    var skorElement = document.createElement("span");
    skorElement.classList.add("skor");
    skorElement.textContent = "-Skor: " + players[name];
    playerName.appendChild(skorElement);

    list.appendChild(listItem);
}

function addScore(name, listItem) {
    ons.notification
        .prompt({
            message: "Masukkan skor pemain " + name + " (hanya kelipatan 5)",
            title: "Ubah skor pemain",
            buttonLabels: ["OK", "Cancel"],
            primaryButtonIndex: 0
        })
        .then(function (input) {
            if (input !== null && input !== "") {
                var skorInput = parseInt(input);
                if (skorInput % 5 === 0) {
                    players[name] += skorInput;

                    localStorage.setItem(
                        "playersData",
                        JSON.stringify(players)
                    );

                    var skorElement = listItem.querySelector(".skor");
                    if (skorElement) {
                        skorElement.textContent = "-Skor: " + players[name];
                    }

                    ons.notification.toast(
                        "Skor berhasil ditambahkan untuk " +
                            name +
                            ": " +
                            input,
                        { timeout: 1000 }
                    );
                } else {
                    ons.notification.toast(
                        "Harap masukkan bilangan bulat kelipatan 5",
                        { timeout: 1000 }
                    );
                }
            } else if (input === null) {
                ons.notification.toast("Aksi dibatalkan", { timeout: 1000 });
            } else {
                ons.notification.toast("Silahkan masukkan nilai skor", {
                    timeout: 1000
                });
            }
        });
}

function clearData() {
    ons.notification.confirm({
        message: "Apakah Anda yakin ingin menghapus data?",
        buttonLabels: ["Cancel", "OK"],
        callback: function (index) {
            if (index === 1) {
                localStorage.clear();
                players = {};
                ons.notification.toast("Data berhasil dihapus.", {
                    timeout: 2000
                });
                window.location.reload(); // Refresh halaman setelah data dihapus
            } else {
                ons.notification.toast("Aksi dibatalkan.", { timeout: 2000 });
            }
        }
    });
}

function toggleDarkMode() {
    const darkModeEnabled = document.getElementById("darkModeSwitch").checked;
    document.body.classList.toggle("dark-mode", darkModeEnabled);
    localStorage.setItem("darkModeEnabled", darkModeEnabled);
}
