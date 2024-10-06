/* Student Data Update JS Code */

document.addEventListener("DOMContentLoaded", (event) => {
    const url = new URLSearchParams(window.location.search);
    const studentId = url.get("Id");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[studentId];


    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('roll').value = student.roll;
    document.getElementById('studentClass').value = student.studentClass;
    document.getElementById('mobileNo').value = student.mobileNo;
    document.getElementById('email').value = student.email;

    document.getElementById('updateForm').addEventListener('submit', function (event) {
        event.preventDefault();

        student.firstName = document.getElementById('firstName').value;
        student.lastName = document.getElementById('lastName').value;
        student.roll = document.getElementById('roll').value;
        student.studentClass = document.getElementById('studentClass').value;
        student.email = document.getElementById('email').value;
        student.mobileNo = document.getElementById('mobileNo').value;

        students[studentId] = student;
        localStorage.setItem("students", JSON.stringify(students));

        window.location = 'AllData.html'
    })
})