/* Student Registration JS Code */
    class Student {
        constructor(firstName, lastName, roll, studentClass, mobileNo, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.roll = roll;
            this.studentClass = studentClass;
            this.mobileNo = mobileNo;
            this.email = email;
        }

        toJson() {
            return {
                firstName: this.firstName,
                lastName: this.lastName,
                roll: this.roll,
                studentClass: this.studentClass,
                mobileNo: this.mobileNo,
                email: this.email,
            }
        }
    }

    document.getElementById("studentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let roll = document.getElementById("roll").value;
    let studentClass = document.getElementById("studentClass").value;
    let mobileNo = document.getElementById("mobileNo").value;
    let email = document.getElementById("email").value;

    let student = new Student (firstName, lastName, roll, studentClass, mobileNo, email)

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student.toJson());
    localStorage.setItem("students", JSON.stringify(students));

    /* Clear the Form Data */
    document.getElementById("studentForm").reset();
    alert('Student Registered successfully!');
})





