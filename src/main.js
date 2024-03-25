// Get all the navigation links
const navLinks = Array.from(document.querySelectorAll('#navList a'));

// Get all the content divs
const contentDivs = Array.from(document.querySelectorAll('.content'));

// Function to hide all content divs
function hideAllContent() {
    contentDivs.forEach(div => {
        div.style.display = 'none';
    });
}

// Function to handle click event on a navigation link
function handleNavLinkClick(event) {
    // Prevent the default action of the link
    event.preventDefault();

    // Hide all content divs
    hideAllContent();

    // Get the href attribute of the clicked link
    const targetId = event.target.getAttribute('href').substring(1);

    // Show the content div that corresponds to the clicked link
    document.getElementById(targetId).style.display = 'block';
}

// Add the click event handler to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
});