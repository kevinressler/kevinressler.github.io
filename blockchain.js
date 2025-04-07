function calculateHash(data, previousHash, nonce) {
  return CryptoJS.SHA256(data + previousHash + nonce).toString();
}

function updateBlockHash(blockDiv) {
    const data = blockDiv.querySelector(".data").value;
    const nonce = blockDiv.querySelector(".nonce").value;
    const prevHash = blockDiv.querySelector(".prevHash")?.value || "";
    const hash = calculateHash(data, prevHash, nonce);

    const hashInput = blockDiv.querySelector(".hash");
    hashInput.value = hash;
  
    // Color based on validity
    hashInput.style.backgroundColor = hash.startsWith("0000") ? "#c8f7c5" : "#f8c8c8";
}


document.querySelectorAll(".block").forEach((blockDiv, index, blocks) => {
    const dataInput = blockDiv.querySelector(".data");
    const nonceInput = blockDiv.querySelector(".nonce");
    const prevHashInput = blockDiv.querySelector(".prevHash");
    if (index === 0) {
        prevHashInput.value = "0000000000000000000000000000000000000000000000000000000000000000"; // custom genesis prevHash
    }
    const mineButton = blockDiv.querySelector(".mine");
    
    mineButton.addEventListener("click", () => {
        mineBlock(blockDiv);
    });
    
    // Update hash when user types in data or nonce
    [dataInput, nonceInput].forEach(input => {
      input.addEventListener("input", () => {
        updateBlockHash(blockDiv);

        let i = index + 1;
        while (i < blocks.length) {
          const prevBlock = blocks[i - 1];
          const currentHash = prevBlock.querySelector(".hash").value;
          const nextBlock = blocks[i];
          nextBlock.querySelector(".prevHash").value = currentHash;
          updateBlockHash(nextBlock);
          i++;
        }
      });
    });
  
    // Initial hash calculation on page load
    mineBlock(blockDiv);
    
});

function mineBlock(blockDiv) {
    const data = blockDiv.querySelector(".data").value;
    const prevHash = blockDiv.querySelector(".prevHash")?.value || "";
    let nonce = 0;
    let hash = "";
  
    while (true) {
      hash = calculateHash(data, prevHash, nonce);
      if (hash.startsWith("0000")) break;
      nonce++;
    }
  
    blockDiv.querySelector(".nonce").value = nonce;
    blockDiv.querySelector(".hash").value = hash;
    blockDiv.querySelector(".hash").style.backgroundColor = "#c8f7c5";
  
    // If there's a next block, update its prevHash + hash
    const allBlocks = document.querySelectorAll(".block");
    const index = Array.from(allBlocks).indexOf(blockDiv);

    if (index + 1 < allBlocks.length) {
      const nextBlock = allBlocks[index + 1];
      nextBlock.querySelector(".prevHash").value = hash;
    //   updateBlockHash(nextBlock);
    }
  }