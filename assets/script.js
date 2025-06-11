document.getElementById("pseudoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const pseudo = document.getElementById("pseudoInput").value.trim();
  if (pseudo) {
    window.location.href = `user.html?u=${encodeURIComponent(pseudo)}`;
  }
});
