function printHighscores() {
    // this will either get our scores from the localstorage or set to empty array
    let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    for (var i = 0; i < highscores.length; i += 1) {
      // this creates list items for each high score
      let createLi = document.createElement('li');
      createLi.textContent = highscores[i].initials + ' --- ' + highscores[i].score;

  
      // this will append each list item
      let olEl = document.getElementById('highscores');
      olEl.appendChild(createLi);

    }
  }
  
  function clearHighscores() {
    //this will allow the user to clear scores in local storage
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }

  let clearEl = document.getElementById('clear');
  clearEl.addEventListener('click',clearHighscores )
  
  printHighscores();