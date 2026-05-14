document.addEventListener('DOMContentLoaded', () => {
    console.log("Website Loaded Successfully");

    const createBtns = document.querySelectorAll('.hover-animate');
    createBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Action Triggered');
        });
    });
});

// auth.js - Sign Up & Login Logic
document.addEventListener('DOMContentLoaded', () => {
    const authOverlay = document.getElementById('authOverlay');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    
    const gotoLogin = document.getElementById('gotoLogin');
    const gotoSignup = document.getElementById('gotoSignup');

    const myAccountBtn = document.querySelector('.my-account');
    const triggerBtns = [myAccountBtn].filter(btn => btn !== null);

    let isUserLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    triggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isUserLoggedIn) {
                authOverlay.classList.remove('hidden');
                signupForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            } else {
                alert("YOU ARE LOGGED IN 😊");
            }
        });
    });

    gotoLogin.addEventListener('click', () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        resetErrors();
    });

    gotoSignup.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        resetErrors();
    });
 
    authOverlay.addEventListener('click', (e) => {
        if (e.target === authOverlay) {
            authOverlay.classList.add('hidden');
            resetErrors();
        }
    });

    function validateEmail(inputElement) {
        const val = inputElement.value.trim();
        if (!val.endsWith('@gmail.com')) {
            inputElement.value = '';
            inputElement.classList.add('error');
            inputElement.placeholder = 'email invalid';
            return false;
        }
        return true;
    }

    function validatePhone(inputElement) {
        const val = inputElement.value.trim();
        const isNum = /^\d+$/.test(val);
        if (!isNum || val.length !== 10) {
            inputElement.value = '';
            inputElement.classList.add('error');
            inputElement.placeholder = 'phone number invalid';
            return false;
        }
        return true;
    }

    document.querySelectorAll('.input-container input').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                if (this.id.includes('Name')) this.placeholder = 'Name';
                if (this.id.includes('Email')) this.placeholder = 'Email';
                if (this.id.includes('Phone')) this.placeholder = 'Phone no';
            }
        });
    });

    function resetErrors() {
        document.querySelectorAll('.input-container input').forEach(input => {
            input.value = '';
            input.classList.remove('error');
            if (input.id.includes('Name')) input.placeholder = 'Name';
            if (input.id.includes('Email')) input.placeholder = 'Email';
            if (input.id.includes('Phone')) input.placeholder = 'Phone no';
        });
    }

    document.getElementById('signupBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('signupName');
        const emailInput = document.getElementById('signupEmail');
        const phoneInput = document.getElementById('signupPhone');

        let isValid = true;
        if (nameInput.value.trim() === '') isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePhone(phoneInput)) isValid = false;

        if (isValid) {
            const userData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim()
            };
            
            localStorage.setItem(userData.email, JSON.stringify(userData));
            alert('Sign up successful 🫡! You can Login now .');
            gotoLogin.click(); 
        }
    });

    document.getElementById('loginBtn').addEventListener('click', () => {
        const emailInput = document.getElementById('loginEmail');
        const phoneInput = document.getElementById('loginPhone');

        let isValid = true;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePhone(phoneInput)) isValid = false;

        if (isValid) {
            const enteredEmail = emailInput.value.trim();
            const enteredPhone = phoneInput.value.trim();
            const savedDataString = localStorage.getItem(enteredEmail);

            if (savedDataString) {
                const savedData = JSON.parse(savedDataString);
                if (savedData.phone === enteredPhone) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    isUserLoggedIn = true;
                    authOverlay.classList.add('hidden');
                    alert(`THANK YOU FOR CHOOSING US , ${savedData.name}!`);
                } else {
                    alert('Incorrect Phone Number for this Email!');
                }
            } else {
                alert('where are you ! make sure you are signed up.');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ലോഗിൻ ലോജിക്
    const createBtn = document.querySelector('.btn-create');
    const startCreatingBtn = document.querySelector('.btn-start');

    if(createBtn || startCreatingBtn) {
        [createBtn, startCreatingBtn].forEach(btn => {
            if(btn) {
                btn.addEventListener('click', (e) => {
                    let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
                    if (isLoggedIn) {
                        e.stopPropagation();
                        document.getElementById('discover-section').scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });
    }
});

// പുതിയ എച്ച്ടിഎംഎൽ സിസ്റ്റത്തിന് അനുസരിച്ച് പേജ് ഓപ്പൺ ചെയ്യാനുള്ള ഫങ്ക്ഷൻ
function openProductPage(id) {
    const page = document.getElementById('productPage');
    const title = document.getElementById('pageTitle');

    // എല്ലാ ഗ്രിഡുകളും ഹൈഡ് ചെയ്യുന്നു
    const allGrids = document.querySelectorAll('.product-grid-container');
    allGrids.forEach(grid => grid.classList.add('hidden'));

    // സെലക്ട് ചെയ്ത കാറ്റഗറി ഗ്രിഡ് മാത്രം കാണിക്കുന്നു
    const selectedGrid = document.getElementById('grid-' + id);
    if (selectedGrid) {
        selectedGrid.classList.remove('hidden');
        title.innerText = selectedGrid.getAttribute('data-title');
    } else {
        alert("Details coming soon!");
        return;
    }

    document.body.style.overflow = 'hidden'; 
    page.classList.remove('hidden');
    page.scrollTop = 0; 
}

// പേജ് ക്ലോസ് ചെയ്യുന്ന ഫങ്ക്ഷൻ
function closeProductPage() {
    document.getElementById('productPage').classList.add('hidden');
    document.body.style.overflow = 'auto'; 
}

document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.querySelector('.btn-create');
    const startCreatingBtn = document.querySelector('.btn-start');

    const navigateToProducts = (e) => {
        e.preventDefault();
        let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            document.getElementById("loader").style.display = "flex";
            setTimeout(() => {
                window.location.href = "product-view.html";
            }, 2000); 
        } else {
            const authOverlay = document.getElementById('authOverlay');
            if (authOverlay) {
                authOverlay.classList.remove('hidden');
                document.getElementById('signupForm').classList.remove('hidden');
                document.getElementById('loginForm').classList.add('hidden');
            }
        }
    };

    if (createBtn) createBtn.addEventListener('click', navigateToProducts);
    if (startCreatingBtn) startCreatingBtn.addEventListener('click', navigateToProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    const discoverLink = document.querySelector('.discover-link');
    const discoverSection = document.getElementById('discover-section');

    if (discoverLink && discoverSection) {
        discoverLink.addEventListener('click', (e) => {
            e.preventDefault();
            discoverSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

window.addEventListener("load", function() {
    document.getElementById("loader").style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    const howItWorksLinks = document.querySelectorAll('.how-it-works-link');
    
    howItWorksLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const tooltip = link.nextElementSibling; 
            tooltip.classList.toggle('show');
            document.querySelectorAll('.tooltip-content').forEach(tt => {
                if (tt !== tooltip) tt.classList.remove('show');
            });
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tooltip-container')) {
            document.querySelectorAll('.tooltip-content').forEach(tt => {
                tt.classList.remove('show');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.tooltip-content').forEach(tt => {
                tt.classList.remove('show');
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const customisedLink = document.querySelector('.customised-design-link');
    const targetSection = document.getElementById('discover-section');

    if (customisedLink && targetSection) {
        customisedLink.addEventListener('click', (e) => {
            e.preventDefault();
            targetSection.scrollIntoView({ 
                behavior: 'auto',
                block: 'start' 
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryBoxes = document.querySelectorAll('.category-box');
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                categoryBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('animate');
                    }, index * 120); 
                });
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const discoverSection = document.getElementById('discover-section');
    if (discoverSection) {
        observer.observe(discoverSection);
    }
});

document.querySelector('.customised-design-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('discover-section').scrollIntoView({ 
        behavior: 'auto' 
    });
});
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function(e) {
        const imgSrc = this.querySelector('img').src;
        const name = this.querySelector('.item-name').innerText;
        
        const overlay = document.getElementById('product-overlay');
        document.getElementById('overlay-img').src = imgSrc;
        document.getElementById('overlay-name').innerText = name;
        
        // സൈഡിൽ നിന്ന് വരാൻ 'active' ക്ലാസ് ചേർക്കുന്നു
        overlay.style.display = 'flex'; 
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    });
});

function closeOverlay() {
    const overlay = document.getElementById('product-overlay');
    overlay.classList.remove('active');
    
    // ആനിമേഷൻ കഴിഞ്ഞ ശേഷം മാത്രം ഡിസ്പ്ലേ മാറ്റുക
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}