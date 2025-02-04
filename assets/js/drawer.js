let drawer = function () {
    /**
     * Element.closest() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
     */
    if (!Element.prototype.closest) {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;
        }
        Element.prototype.closest = function (s) {
            let el = this;
            let ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return null;
        };
    }

    // Trap Focus
    // https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
    //
    function trapFocus(element) {
        let focusableEls = element.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        let firstFocusableEl = focusableEls[0];
        let lastFocusableEl = focusableEls[focusableEls.length - 1];
        let KEYCODE_TAB = 9;
        element.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
            if (!isTabPressed) {
                return;
            }
            if (e.shiftKey) {
                /* shift + tab */ if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } /* tab */ else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }

    //
    // Settings
    //
    let settings = {
        speedOpen: 50,
        speedClose: 350,
        activeClass: "is-active",
        visibleClass: "is-visible",
        selectorTarget: "[data-drawer-target]",
        selectorTrigger: "[data-drawer-trigger]",
        selectorClose: "[data-drawer-close]"
    };

    //
    // Methods
    //

    // Toggle accessibility
    let toggleAccessibility = function (event) {
        if (event.getAttribute("aria-expanded") === "true") {
            event.setAttribute("aria-expanded", false);
        } else {
            event.setAttribute("aria-expanded", true);
        }
    };

    // Modify openDrawer function to handle submenu opening
    let openDrawer = function (trigger) {
        // Close any currently open drawers
        let openDrawers = document.querySelectorAll(`.${settings.activeClass}`);
        openDrawers.forEach((drawer) => {
            closeDrawer(drawer.querySelector(settings.selectorClose));
        });

        // Find target
        let target = document.getElementById(trigger.getAttribute("aria-controls"));

        // If target is a submenu, open it
        if (target.classList.contains("submenu")) {
            toggleSubmenu(trigger);
        } else {
            // Otherwise, open the drawer
            // Make it active
            target.classList.add(settings.activeClass);
            // Make body overflow hidden so it's not scrollable
            document.documentElement.style.overflow = "hidden";
            // Toggle accessibility
            toggleAccessibility(trigger);
            // Make it visible
            setTimeout(function () {
                target.classList.add(settings.visibleClass);
                trapFocus(target);
            }, settings.speedOpen);
        }
    };

    // Close Drawer
    let closeDrawer = function (event) {
        // Find target
        let closestParent = event.closest(settings.selectorTarget),
            childrenTrigger = document.querySelector(
                '[aria-controls="' + closestParent.id + '"'
            );
        // Make it not visible
        closestParent.classList.remove(settings.visibleClass);
        // Remove body overflow hidden
        document.documentElement.style.overflow = "";
        // Toggle accessibility
        toggleAccessibility(childrenTrigger);
        // Make it not active
        setTimeout(function () {
            closestParent.classList.remove(settings.activeClass);
        }, settings.speedClose);
    };

    // Click Handler
    let clickHandler = function (event) {
        // Find elements
        let toggle = event.target,
            open = toggle.closest(settings.selectorTrigger),
            close = toggle.closest(settings.selectorClose);
        // Open drawer when the open button is clicked
        if (open) {
            openDrawer(open);
        }
        // Close drawer when the close button (or overlay area) is clicked
        if (close) {
            closeDrawer(close);
        }
        // Prevent default link behavior
        if (open || close) {
            event.preventDefault();
        }
    };

    // Keydown Handler, handle Escape button
    let keydownHandler = function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            // Find all possible drawers
            let drawers = document.querySelectorAll(settings.selectorTarget),
                i;
            // Find active drawers and close them when escape is clicked
            for (i = 0; i < drawers.length; ++i) {
                if (drawers[i].classList.contains(settings.activeClass)) {
                    closeDrawer(drawers[i]);
                }
            }
        }
    };

    //
    // Inits & Event Listeners
    //
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keydown", keydownHandler, false);
};

drawer();

function openCity(evt, cityName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

// Function to toggle submenu visibility
function toggleSubmenu(event) {
    const submenu = document.querySelector(".submenu");
    submenu.classList.toggle("submenu-open");
}

// Event listener for submenu toggling
document.querySelectorAll(".submenu-toggle").forEach((item) => {
    item.addEventListener("click", function (event) {
        toggleSubmenu(event.target);
    });
});

// Function to handle back button click
let goBack = function () {
    // Slide the drawer content back to its original position
    document.getElementById("original-drawer-content").style.transform =
        "translateX(0)";
    // Close the submenu
    document.querySelectorAll(".submenu-open").forEach((item) => {
        item.classList.remove("submenu-open");
    });
};

document.querySelector(".drawer-back").addEventListener("click", goBack);