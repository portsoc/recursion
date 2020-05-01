function showMessage(msg) {
  console.log(msg);
}

function showThreeMessages() {
  for (let i = 1; i <= 3; i += 1) {
    showMessage(`hi number ${i}`);
  }
}

showThreeMessages();
