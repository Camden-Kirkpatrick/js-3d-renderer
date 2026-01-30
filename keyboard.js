document.addEventListener("keydown", function(event)
{
    console.log("Key pressed:", event.key);
    console.log("Physical key code:", event.code);

    if (event.key == 'p')
    {
        paused = !paused;
    }
});