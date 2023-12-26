var bookmarkName = document.getElementById("bookmarkName")
var bookmarkURL = document.getElementById("bookmarkURL")
var markitem = [];
var alertName = document.getElementById("alertName")
var alertUrl = document.getElementById("alertUrl")
var regexName = /^[A-Za-z]{1,20}[0-9]{0,4}$/
var regexURL = /^((https?|ftp|smtp):\/\/)(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
if (localStorage.getItem("mark") !== null) {
    markitem = JSON.parse(localStorage.getItem("mark"))
    displaydate()
}

function addInbut() {
    if (valid(regexName, bookmarkName) == true && valid(regexURL, bookmarkURL) == true) {
        var bookMark = {
            name: bookmarkName.value,
            url: bookmarkURL.value,
        }
        markitem.push(bookMark)
        displaydate()
        cleardate()
        localStorage.setItem("mark", JSON.stringify(markitem))
        document.querySelector(".layer").classList.add('d-none')
        document.querySelector(".modal-dialog").classList.add('d-none')

    }
    else if (valid(regexName, bookmarkName) == false || valid(regexURL, bookmarkURL) == false) {
        document.querySelector(".modal-dialog").classList.remove('d-none')
        document.querySelector(".layer").classList.remove('d-none')

    }

}
function displaydate() {
    var temp = ""
    for (var i = 0; i < markitem.length; i++) {
        temp += `
       <tr>
       <td>`+ i + `</td>
       <td>`+ markitem[i].name + `</td>
       <td><a href="`+ markitem[i].url + `" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>
       <td><button onclick="deletedate(`+ i + `)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
     </tr>`
    }
    document.getElementById("tableContent").innerHTML = temp
}
function cleardate() {
    bookmarkName.value = ""
    bookmarkURL.value = ""
}
function deletedate(index) {
    markitem.splice(index, 1)
    localStorage.setItem("mark", JSON.stringify(markitem))
    displaydate()
}
bookmarkName.addEventListener('change', function () {

    valid(regexName, bookmarkName)
   
})
bookmarkURL.addEventListener('change', function () {

    valid(regexURL, bookmarkURL)
})
function valid(regex, inbut) {
    if (regex.test(inbut.value) == true) {
        inbut.classList.add('is-valid')
        inbut.classList.remove('is-invalid')
        return true
    } else {
        inbut.classList.remove('is-valid')
        inbut.classList.add('is-invalid')
        return false
    }
}
function x() {
    document.querySelector(".layer").classList.add('d-none')
    document.querySelector(".modal-dialog").classList.add('d-none')
}