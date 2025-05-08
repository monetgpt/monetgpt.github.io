const placesData = {
    1: {
      description: "Adobe5k",
      order: ["source", "ours", "expert"]
    },
    // 2: {
    //   description: "Golden Gate Bridge, San Francisco",
    //   order: ["source", "expert", "ours"]
    // },
    // 3: {
    //   description: "Stonehenge",
    //   order: ["source", "ours", "expert"]
    // },
    // 4: {
    //   description: "Sydney Opera House",
    //   order: ["source", "expert", "ours"]
    // },
    // 5: {
    //   description: "Cathedral of Santa Maria del Fiore",
    //   order: ["source", "ours", "expert"]
    // }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');
  
    // Build cards for each place
    Object.entries(placesData).forEach(([key, data]) => {
      const sourcePath = `./data/quiz/source/${key}.png`;
      const oursPath   = `./data/quiz/ours/${key}.png`;
      const expertPath = `./data/quiz/expert/${key}.png`;
  
      // Map type -> actual image path
      const imagePaths = data.order.map(type => {
        if (type === "source") return sourcePath;
        if (type === "ours")   return oursPath;
        if (type === "expert") return expertPath;
      });
  
      // Add cards for each image in the specified order
      imagePaths.forEach((imagePath, index) => {
        // Decide label
        const label = data.order[index] === "source"
            ? data.description
            : data.order[index].toUpperCase();
  
        const card = createCard(imagePath, label);
        gridContainer.appendChild(card);
      });
    });
  });
  
  function createCard(imagePath, label) {
    // Outer card
    const card = document.createElement('div');
    card.className = 'card';
  
    // Inner container: front + back
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
  
    // Front side
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
  
    const frontImg = document.createElement('img');
    frontImg.src = imagePath;
    frontImg.alt = label;
  
    cardFront.appendChild(frontImg);
  
    // Back side
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
  
    const backText = document.createElement('p');
    backText.textContent = label;
  
    cardBack.appendChild(backText);
  
    // Assemble .card-inner
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
  
    // Put .card-inner into card
    card.appendChild(cardInner);
  
    // On click, flip for 2.5s
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
      setTimeout(function() {
        card.classList.remove('flipped');
      }, 2500);
    });
  
    return card;
  }
  