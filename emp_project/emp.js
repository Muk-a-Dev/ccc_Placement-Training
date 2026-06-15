let employees = [];
let empId = 1;

function addEmployee() {
    let name = document.getElementById("empName").value.trim();
    let age = document.getElementById("empAge").value;
    let department = document.getElementById("empDepartment").value;
    let salary = document.getElementById("empSalary").value;

    if (!name || !age || !department || !salary) {
        alert("Please fill all fields");
        return;
    }

    let employee = {
        id: empId++,
        name,
        age,
        department,
        salary
    };

    employees.push(employee);
    displayEmployees(employees);

    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("empDepartment").value = "";
    document.getElementById("empSalary").value = "";
}

function displayEmployees(data) {
    let table = document.getElementById("employeeTable");
    table.innerHTML = "";

    data.forEach((emp, index) => {
        table.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.age}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
                    <button onclick="editEmployee(${index})">Edit</button>
                    <button onclick="deleteEmployee(${index})" 
                            style="background:red;">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees(employees);
}

function editEmployee(index) {
    let emp = employees[index];

    document.getElementById("empName").value = emp.name;
    document.getElementById("empAge").value = emp.age;
    document.getElementById("empDepartment").value = emp.department;
    document.getElementById("empSalary").value = emp.salary;

    employees.splice(index, 1);
    displayEmployees(employees);
}

function searchEmployee() {
    let searchText = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchText) ||
        emp.department.toLowerCase().includes(searchText)
    );

    displayEmployees(filtered);
}