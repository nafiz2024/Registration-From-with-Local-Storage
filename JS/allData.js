class Allstudent {
    constructor(firstName, lastName, roll, studentClass, mobileNo, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roll = roll;
        this.studentClass = studentClass;
        this.mobileNo = mobileNo;
        this.email = email;
    }
}

let currentPage = 1;
const rowsPerPage = 10;
let students = []; // Store the students globally
let filteredStudents = []; // Store filtered students globally

function fetchStudents(searchQuery = "") {
    // Retrieve students from local storage and store in global variable
    students = JSON.parse(localStorage.getItem("students")) || [];

    // Filter students based on the search query
    filteredStudents = students.filter(studentData =>
        studentData.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentData.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentData.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentData.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentData.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentData.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset currentPage to 1 if the search query is empty
    if (searchQuery === "") {
        currentPage = 1;
    }

    displayStudents();
}

function displayStudents() {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";

    paginatedStudents.forEach((studentData, index) => {
        const student = new Allstudent(
            studentData.firstName,
            studentData.lastName,
            studentData.roll,
            studentData.studentClass,
            studentData.mobileNo,
            studentData.email
        );

        const row = `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.roll}</td>
                <td>${student.studentClass}</td>
                <td>${student.mobileNo}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-outline-danger" onclick="deleteStudent(${startIndex + index})"><i class="fa-solid fa-trash-can"></i></button>
                </td>
                <td>
                    <button class="btn btn-outline-info" onclick="updateStudentData(${startIndex + index})"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>
        `;
        studentTableBody.innerHTML += row;
    });

    setupPagination(totalPages);
}

function setupPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Create Previous Button
    const prevBtn = document.createElement('li');
    prevBtn.className = "page-item" + (currentPage === 1 ? " disabled" : "");
    prevBtn.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prevBtn);

    // Calculate the range of pages to display
    const startPage = Math.max(1, currentPage - 1); // show current page - 1
    const endPage = Math.min(totalPages, currentPage + 1); // show current page + 1

    // Create Page Number Buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = "page-item" + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    // Create Next Button
    const nextBtn = document.createElement('li');
    nextBtn.className = "page-item" + (currentPage === totalPages ? " disabled" : "");
    nextBtn.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Next</a>`;
    pagination.appendChild(nextBtn);
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    if (page < 1 || page > totalPages) return; // Don't allow out of bounds
    currentPage = page;
    displayStudents();
}

function filterStudents() {
    const searchQuery = document.getElementById("searchBar").value;
    fetchStudents(searchQuery);
}

function deleteStudent(index) {
    students.splice(index, 1); // Delete from the original students array
    localStorage.setItem("students", JSON.stringify(students)); // Update local storage
    fetchStudents(); // Refresh the list
}

function updateStudentData(id) {
    window.location = `update.html?Id=${id}`;
}

window.onload = function () {
    fetchStudents(); // Load all students on page load

    // Add event listener for the search bar
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", function() {
        filterStudents(); // Call filterStudents whenever the input changes
    });
};
