fetch('/calendar')
    .then(res=>res.json())
    .then((res) => {
        const list = document.getElementById('calendarslist')
        res.forEach((calendar) => {
            $(list).append(`<li id = "${calendar._id}" class="collection-item"><div><a href = /calendar.html?id=${calendar._id}>Vai<span style = "color: black; font-size: 0.8em"> - ${calendar._id}</span></a><button style = "background: none; border: none; cursor: pointer; color: red" onclick = "deleteCalendar('${calendar._id}');" class="secondary-content"><i class="material-icons">delete</i></button></div></li>`)
        })
        $('#preload-container').hide()
    })

    function addCalendar() {
        fetch('/calendar', {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then((res) => {
            const list = document.getElementById('calendarslist')
            $(list).append(`<li id = "${res._id}" class="collection-item"><div><a href = /calendar.html?id=${res._id}>Vai<span style = "color: black; font-size: 0.8em"> - ${res._id}</span></a><button style = "background: none; border: none; cursor: pointer; color: red" onclick = "deleteCalendar('${res._id}');" class="secondary-content"><i class="material-icons">delete</i></button></div></li>`)
        })
    }

    function deleteCalendar(_id) {
        fetch('/calendar', {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: _id })
        })
        .then(res=>res.json())
        .then((res) => {
            const list = document.getElementById('calendarslist')
            $(`#${_id}`).remove()
        })
    }