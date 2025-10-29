
const img = document.getElementById('myImage');

  img.addEventListener('click', () => {
    location.reload(); // sahifani yangilaydi
  });


window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("show"); // kirishda sekin chiqadi
});

document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", e => {
    const url = link.getAttribute("href");
    if (!url.startsWith("#") && !link.target) {
      e.preventDefault();
      document.body.classList.remove("show");
      setTimeout(() => {
        window.location.href = url;
      }, 600); // CSSdagi transition bilan bir xil
    }
  });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


const fadeElements = document.querySelectorAll('.fade-in-element');

function checkVisibility() {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect().top;

    if (rect < triggerBottom) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}


window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


window.addEventListener("load", function(){
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
});


window.addEventListener("load", function() {
  let loader = document.getElementById("preloader");
  loader.style.opacity = "0";    
  setTimeout(() => {
    loader.style.display = "none";
    loader.classList.add("hide"); 
     
  }, 1000); 
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.about-btn1') || document.getElementById('about-bnt1');
  const modal = document.getElementById('myModal');
  const closeBtn = modal ? modal.querySelector('.close') : null;

  if (!btn) {
    console.error('Tugma topilmadi: selector ".about-bnt1" yoki "#about-bnt1" ishlatilmoqda. Class/ID nomini tekshir.');
    return;
  }
  if (!modal) {
    console.error('Modal topilmadi: #myModal elementi sahifada borligini tekshir.');
    return;
  }
  if (!closeBtn) {
    console.error('Close tugmasi yo‘q: .close elementi mavjudligini tekshiring.');
  }

  function openModal() {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // scroll bloklash (ixtiyoriy)
  }
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // ESC bilan ham yopish
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});

window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const achievement = document.getElementById("achievement");
const sound = document.getElementById("achievement-sound");
let achievementShown = false;

window.addEventListener("scroll", () => {
  if (!achievementShown && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    achievementShown = true;
    achievement.classList.add("active");

    // audio play user interaction bilan trigger bo‘lishi uchun
    const playAudio = () => {
      sound.play().catch(e => console.log("Audio play blocked:", e));
      window.removeEventListener("click", playAudio);
    };

    // agar foydalanuvchi scroll qilsa va click qilgan bo‘lsa, ishlaydi
    window.addEventListener("click", playAudio);

    setTimeout(() => {
      achievement.classList.add("hide");
    }, 3100);
  }
});


const overlay = document.getElementById("overlay");
const progresses = document.querySelectorAll(".progress");

function openPopup() {
  overlay.classList.add("active");
  progresses.forEach(bar => {
    let value = bar.getAttribute("data-value");
    bar.style.width = value + "%";
  });
}

function closePopup() {
  overlay.classList.remove("active");
  progresses.forEach(bar => {
    bar.style.width = "0";
  });
}


const authOverlay = document.getElementById("auth-overlay");
const authPopup = document.getElementById("auth-popup");
const authTitle = document.getElementById("auth-title");
const authForm = document.getElementById("auth-form");

let signedUp = false;
let loggedIn = false;

// Signup popup ochish
function openSignupPopup() {
  if (signedUp && loggedIn) {
    // Agar signup va login bo'lgan bo'lsa → Achievements ochiladi
    goToAchievementsPopup();
    return;
  }

  authOverlay.style.display = "flex";
  authPopup.style.animation = "authFadeIn 0.3s ease";
  authTitle.innerText = "Sign Up";

  authForm.innerHTML = `
    <input type="text" placeholder="Username" required>
    <input type="email" placeholder="Email" required>
    <input type="password" placeholder="Password" required>
    <button class="auth-btn" type="button" onclick="goToLoginPopup()">Sign Up</button>
  `;
}

// Login popup
function goToLoginPopup() {
  if (signedUp) return; // qayta signup qilish yo'q
  signedUp = true;

  authTitle.innerText = "Login";
  authForm.innerHTML = `
    <input type="text" placeholder="Username" required>
    <input type="password" placeholder="Password" required>
    <button class="auth-btn" type="button" onclick="goToAchievementsPopup()">Login</button>
  `;
}

// Achievements popup
function goToAchievementsPopup() {
  if (!loggedIn) loggedIn = true;

  authOverlay.style.display = "flex";
  authTitle.innerText = "Login successfully";
  authForm.innerHTML = `
  
  `;
}

// Popup yopish
function closeAuthPopup() {
  authPopup.style.animation = "authFadeOut 0.3s ease";
  setTimeout(() => {
    authOverlay.style.display = "none";
    authPopup.style.animation = "authFadeIn 0.3s ease";
  }, 300);
}


window.onload = () => {
  if (!localStorage.getItem("redirected")) {
    localStorage.setItem("redirected", "true");
    window.location.href = "index.html";
  } else {
    localStorage.removeItem("redirected");
  }
};


// bu kodni body oxiriga yoz
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href").split("/").pop();
  if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
    link.classList.add("active");
  }
});

  const nameInput = document.getElementById("nameInput");
    const commentInput = document.getElementById("commentInput");
    const submitBtn = document.getElementById("submitBtn");
    const popup = document.getElementById("commentPopup");
    const viewBtn = document.querySelector(".view-comments");
    const closeBtn = document.querySelector(".close-popup");
    const commentsList = document.getElementById("commentsList");

    // LocalStorage'dan kommentlarni olish
    let comments = JSON.parse(localStorage.getItem("commentsData")) || [];

    function saveComments() {
      localStorage.setItem("commentsData", JSON.stringify(comments));
    }

    function checkInput() {
      const active = nameInput.value.trim() && commentInput.value.trim();
      submitBtn.disabled = !active;
      submitBtn.classList.toggle("active", active);
    }

    nameInput.addEventListener("input", checkInput);
    commentInput.addEventListener("input", checkInput);

    submitBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const text = commentInput.value.trim();
      if (name && text) {
        const now = new Date();
        const time = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth()+1).padStart(2, '0')}.${now.getFullYear()} | ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        comments.push({ name, text, likes: 0, time });
        saveComments();
        nameInput.value = "";
        commentInput.value = "";
        checkInput();
        alert("Komment yuborildi ✅");
      }
    });

    viewBtn.addEventListener("click", () => {
      popup.style.display = "flex";
      renderComments();
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    function renderComments() {
      if (comments.length === 0) {
        commentsList.innerHTML = `<p style="text-align:center;color:#999;">Kommentlar yo‘q 😔</p>`;
        return;
      }

      commentsList.innerHTML = comments.map((c, index) => `
        <div class="comment">
          <div class="comment-left">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="img-comment">
            <div class="comment-info">
              <h4>${c.name}</h4>
              <p>${c.text}</p>
              <div class="comment-time">${c.time}</div>
            </div>
          </div>
          <button class="like-btn" onclick="likeComment(${index})">
            ❤️ <span class="like-count">${c.likes}</span>
          </button>
        </div>
      `).join("");
    }

    window.likeComment = function(index) {
      comments[index].likes++;
      saveComments();
      renderComments();
    };