const startingtime = 9
const lessonduration = 1
const lunchtime = 13
const lunchduration = 1
const timeslices = 8
const table = document.querySelector('#calendar')
const headcols = document.querySelectorAll('#calendartable thead tr th')

let currtime = startingtime
let dwschedule = new Array()
var lessons = new Array()
fetch('/lesson')
    .then(res=>res.json())
    .then((res) => {
        for(i = 0; i < timeslices + lunchduration; i++) {
            let tr = document.createElement('tr')
            tr.setAttribute("id", "" + i)
        
            for(j = 0; j < headcols.length; j++) {
                if(j == 0) {
                    tr.innerHTML += `<td id = "${i}-${j}">${currtime} - ${currtime + lessonduration}</td>`
                } else {
                    let nameto = ""
                    let whereto = ""
                    res.forEach((obj) => {
                        if(obj.slice == i && obj.day == j) {
                            nameto = obj.name
                            whereto = obj.where
                        }
                    })
                    tr.innerHTML += `<td class = "goodmoment" id = "${i}-${j}" onclick = "setClassOpt(${i}, ${j});"><p class = "classname">${nameto}</p><p class = "where">${whereto}</p></td>`
                }
            }
            if(currtime == lunchtime || (currtime > lunchtime && currtime < lunchtime + lunchduration)) {
                tr.classList.add("lunch");
            }
            currtime += lessonduration;
            table.appendChild(tr)
        }
        $('#preload-container').hide()
    })

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

    let cell = $(`#${classdata.slice}-${classdata.day}`) 
    const classnametxt = cell.find('.classname')
    const wheretxt = cell.find('.where')
    
    if((!wheretxt[0].html) && (!classnametxt[0].html)) {
        console.log("post")
        fetch('/lesson', {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(classdata)
            }).then(res=>res.json())
            .then(res => console.log(res))  
    } else {
        console.log("put")
        fetch('/lesson', {
            method: 'put',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(classdata)
            }).then(res=>res.json())
            .then(res => console.log(res))
        
    }
    
    classnametxt.html(classdata.name)
    wheretxt.html(classdata.where)

    $('#setclassform input').each(function( index ) {
        $( this ).val("")
      })
    $('#modal').modal('close'); 
    e.preventDefault()
})