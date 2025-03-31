document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name');
    const saveNameButton = document.getElementById('save-name');
    const nameStatus = document.getElementById('name-status');

    // Load saved name if it exists
    const savedName = localStorage.getItem('playerName'); // JS object that stores key-value pairs in the clients browser. method getItem() just retrieves the value. Key is playerName I made up.
    if (savedName) {
        playerNameInput.value = savedName;
        nameStatus.textContent = `Welcome back, ${savedName}!`;
    }

    // Save name on button click
    saveNameButton.addEventListener('click', () => {
        const name = playerNameInput.value();
        if (name) {
            localStorage.setItem('playerName', name);
            nameStatus.textContent = `Welcome ${name}.`;
        } else {
            nameStatus.textContent = 'Please enter a name!';
        }
    });
});