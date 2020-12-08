//wordlist
const wordList = document.querySelector(".words");
const setupWords = (data) => {

    if (data.length) {
        let html = "";
        data.forEach(doc => {
            const word = doc.data();
            const li = `
        <li>
          <div class="center-align grey lighten-4" style="margin-bottom: 5px; padding: 10px; font-size: 30px">${word.keyword}</div>
        </li>
        `;
            html += li
        })

        wordList.innerHTML = html;
    } else {
        wordList.innerHTML = '<h4 class="center-align" style="padding: 10px"> Login to Review Products</h4>'
    }

}


//modals
document.addEventListener(`DOMContentLoaded`, function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
})


const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const ui = (user) => {
    if (user) {
        //user info
        const html = `
          <div> Logged in as ${user.email}</div>
        `;
        accountDetails.innerHTML = html;
        loggedInLinks.forEach(item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
    } else {
        accountDetails.innerHTML = "";
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
    }
}