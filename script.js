/*
 * Handles smooth section scrolling and rotating the gear icon.
 * Each scroll of the mouse wheel triggers a rotation of the gear
 * by one tooth (calculated as 360° divided by the number of teeth)
 * and scrolls the viewport to the next or previous section.
 */

document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('section'));
    const gearImage = document.getElementById('gear');

    // Rotation increment per scroll (in degrees).  One scroll rotates the
    // gear by this fixed amount regardless of how many teeth appear in the
    // artwork. Adjust this value to change the rotation speed.
    const ROTATION_INCREMENT = 45;

    let currentSectionIndex = 0;
    let currentRotation = 0;
    let isAnimating = false;

    /**
     * Scrolls smoothly to a given section index and rotates the gear.
     * @param {number} newIndex The index of the section to scroll to.
     * @param {number} rotationDelta The change in rotation in degrees.
     */
    function performScroll(newIndex, rotationDelta) {
        if (newIndex < 0 || newIndex >= sections.length) {
            return;
        }
        isAnimating = true;
        currentSectionIndex = newIndex;
        currentRotation += rotationDelta;

        // Apply rotation to gear
        gearImage.style.transform = `rotate(${currentRotation}deg)`;

        // Scroll to the target section
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

        // Delay resetting the flag until the scroll animation has likely completed
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    /**
     * Handles wheel events to determine scroll direction and rotate the gear.
     * @param {WheelEvent} event The wheel event fired by the browser.
     */
    function handleWheel(event) {
        // Prevent default scrolling to maintain control over navigation
        event.preventDefault();
        if (isAnimating) {
            return;
        }
        const delta = event.deltaY;
        if (delta > 0) {
            // Scroll down to next section
            performScroll(currentSectionIndex + 1, ROTATION_INCREMENT);
        } else if (delta < 0) {
            // Scroll up to previous section
            performScroll(currentSectionIndex - 1, -ROTATION_INCREMENT);
        }
    }

    // Attach the wheel event listener to the main container
    const mainContainer = document.getElementById('fullpage');
    mainContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Ensure the page starts at the first section on load
    sections[0].scrollIntoView();
});

document.addEventListener('DOMContentLoaded', () => {
    // existing code…

    // Make project items expandable
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            // close other open items if desired
            projectItems.forEach(el => {
                if (el !== item) el.classList.remove('open');
            });
            item.classList.toggle('open');
        });
    });
});
