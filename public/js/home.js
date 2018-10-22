fetch('/calendar')
    .then(res=>res.json())
    .then((res) => {
        const list = document.getElementById('calendarslist')
        res.forEach((calendar) => {
            $(list).append(`<li><a class="collection-item" href = /calendar.html?id=${calendar._id}>Vai</a></li>`)
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
            $(list).append(`<li><a class="collection-item" href = /calendar.html?id=${res._id}>Vai</a></li>`)
        })
    }