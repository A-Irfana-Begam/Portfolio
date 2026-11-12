
document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation
    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector(".navbar nav");

    if (navbar && nav && !document.querySelector(".menu-toggle")) {
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Toggle navigation");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = "<span></span><span></span><span></span>";

        navbar.insertBefore(menuButton, nav);

        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("nav-open");

            menuButton.classList.toggle("menu-active", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("nav-open");
                menuButton.classList.remove("menu-active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Active navigation link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }

    // Prevent accidental empty link jumps
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
        });
    });

});
