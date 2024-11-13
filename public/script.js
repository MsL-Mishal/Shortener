document.getElementById("shortenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url").value;
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: urlInput }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.innerHTML = `<p>Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>`;
    } else {
      resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
