function search() {
    const dayOfWeekInput = document.getElementById('dayOfWeekInput').value.toLowerCase();
    // const imgElement = document.createElement('img');

    // imgElement.src = myImage.toURL();
    // document.body.appendChild(imgElement)
    window.location.href = `/${dayOfWeekInput}`;
}

function mainPage() {
    window.location.href = `/`;
}
