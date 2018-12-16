document.getElementById('create-story-btn').addEventListener('click', () => {
    window.location.href = "../pages/new_story.php";
})

export const removeCreateStoryFAB = () => {
	document.getElementById('create-story-btn').remove();
}