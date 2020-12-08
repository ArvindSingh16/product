//user state
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.uid == "I41zWxEIeCPTAZqhD7OZDcW9cHY2") {
            //db connect
            db.collection("keywords").onSnapshot(snapshot => {
                setupWords(snapshot.docs);
            }, err => {
                console.log(err.message)
            });

        }
        ui(user);

    } else {
        ui();
        setupWords([]);
    }
})


//sign-up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signup user by firebase
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err => {
        window.alert(err.message);
    })
})


//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //login using firebase
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err => {
        window.alert(err.message);
    })
})


//logout
const logoutX = document.querySelector("#logout-x");
const logoutM = document.querySelector("#logout-m");
logoutX.addEventListener("click", (e) => {
    e.preventDefault();

    //logout using firebase
    auth.signOut();
})
logoutM.addEventListener("click", (e) => {
    e.preventDefault();

    //logout using firebase
    auth.signOut();
})

//add keyword
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection('keywords').add({
        keyword: createForm['title'].value
    }).then(() => {
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        window.alert(err.message);
    })
})