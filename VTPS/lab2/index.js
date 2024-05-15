var modal = document.getElementById("myModal");
var modalTeacher = document.getElementById("modalTeacher");
var span = document.querySelectorAll(".close");

window.onclick = function(event) {

    if (event.target === modalTeacher || event.target===modal) {

        modal.style.display = "none";
        modalTeacher.style.display = "none";
    }
}


document.querySelectorAll(".teacher_click").forEach(btn => {
    btn.addEventListener('click',()=>{
        console.log(btn)
        modalTeacher.style.display = "block";
    })
})

document.querySelectorAll(".modal-toggle").forEach(btn => {
    btn.addEventListener('click',()=>{
        modal.style.display = "block";
    })
})


span.forEach(close => close.addEventListener( "click",
    () => {
        modal.style.display = "none";
        modalTeacher.style.display = "none";
    }
))

