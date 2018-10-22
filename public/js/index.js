const startingtime = 9
const lessonduration = 1
const lunchtime = 13
const lunchduration = 1
const timeslices = 8
const table = document.querySelector('#calendar')
const headcols = document.querySelectorAll('#calendartable thead tr th')

let currtime = startingtime
for(i = 0; i < timeslices + lunchduration; i++) {
    let tr = document.createElement('tr')
    tr.setAttribute("id", "" + i)

    for(j = 0; j < headcols.length; j++) {
        if(j == 0) {
            tr.innerHTML += `<td id = "${i}-${j}">${currtime} - ${currtime + lessonduration}</td>`
        } else {
            tr.innerHTML += `<td class = "goodmoment" id = "${i}-${j}" onclick = "setClassOpt(${i}, ${j});"><p class = "classname">Process Control</p><p class = "where">Aula A2</p></td>`
        }
    }
    if(currtime == lunchtime || (currtime > lunchtime && currtime < lunchtime + lunchduration)) {
        tr.classList.add("lunch");
    }
    currtime += lessonduration;
    table.appendChild(tr)
}

function setClassOpt(slice, day) {
    let cell = $(`#${slice}-${day}`)

    let classname = cell.find('.classname').html()
    let where = cell.find('.where').html()
    $('#classnameinput').val(classname)
    $('#whereinput').val(where)
    $('#day').val("" + day)
    $('#slice').val("" + slice)
    $('#modal').modal('open')
}

$('#setclassform').on('submit', (e) => {
    
    var formData = new FormData(e.target);
    var classdata = {};
    formData.forEach(function(value, key){
        classdata[key] = value;
    });
    console.log(classdata)

    fetch('/lesson', {
    method: 'post',
    headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(classdata)
    }).then(res=>res.json())
    .then(res => console.log(res));
    $('#setclassform input').each(function( index ) {
        $( this ).val("")
      })
    $('#modal').modal('close'); 
    e.preventDefault()
})