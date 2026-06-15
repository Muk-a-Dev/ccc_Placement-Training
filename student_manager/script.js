const studentForm = document.getElementById("studentForm");
const studentIndexInput = document.getElementById("studentIndex");
const nameInput = document.getElementById("name");
const rollNoInput = document.getElementById("rollNo");
const courseInput = document.getElementById("course");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("searchInput");
const studentList = document.getElementById("studentList");
const emptyState = document.getElementById("emptyState");
const studentCount = document.getElementById("studentCount");
const clearBtn = document.getElementById("clearBtn");

let students = [];

function showStudents() {
	const searchText = searchInput.value.toLowerCase();
	let rows = "";

	for (let i = 0; i < students.length; i++) {
		const student = students[i];
		const text = (student.name + student.rollNo + student.course + student.email).toLowerCase();

		if (text.indexOf(searchText) === -1) {
			continue;
		}

		rows += "<tr>";
		rows += "<td>" + student.name + "</td>";
		rows += "<td>" + student.rollNo + "</td>";
		rows += "<td>" + student.course + "</td>";
		rows += "<td>" + student.email + "</td>";
		rows += "<td>";
		rows += "<button class='action-btn' onclick='editStudent(" + i + ")'>Edit</button>";
		rows += "<button class='action-btn' onclick='deleteStudent(" + i + ")'>Delete</button>";
		rows += "</td>";
		rows += "</tr>";
	}

	studentList.innerHTML = rows;
	studentCount.textContent = students.length;

	if (students.length === 0) {
		emptyState.textContent = "No student data available.";
		emptyState.style.display = "block";
	} else if (rows === "") {
		emptyState.textContent = "No matching student found.";
		emptyState.style.display = "block";
	} else {
		emptyState.style.display = "none";
	}
}

function clearForm() {
	studentForm.reset();
	studentIndexInput.value = "";
}

function addStudent(event) {
	event.preventDefault();

	const student = {
		name: nameInput.value,
		rollNo: rollNoInput.value,
		course: courseInput.value,
		email: emailInput.value,
	};

	if (studentIndexInput.value === "") {
		students.push(student);
	} else {
		students[studentIndexInput.value] = student;
	}

	clearForm();
	showStudents();
}

function editStudent(index) {
	const student = students[index];

	studentIndexInput.value = index;
	nameInput.value = student.name;
	rollNoInput.value = student.rollNo;
	courseInput.value = student.course;
	emailInput.value = student.email;
}

function deleteStudent(index) {
	students.splice(index, 1);
	clearForm();
	showStudents();
}

studentForm.addEventListener("submit", addStudent);
searchInput.addEventListener("input", showStudents);
clearBtn.addEventListener("click", clearForm);

window.editStudent = editStudent;
window.deleteStudent = deleteStudent;

showStudents();
