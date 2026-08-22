const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const task = document.getElementById("task").value.trim();
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("status").value;
    const editIndex = document.getElementById("editIndex").value;

    const taskData = {
        subject: subject,
        task: task,
        deadline: deadline,
        status: status
    };


    if (editIndex === "") {
        tasks.push(taskData);
        alert("Task added successfully!");
    }

    else {
        tasks[editIndex] = taskData;
        alert("Task updated successfully!");
    }

    displayTasks();
    clearForm();
});

function displayTasks() {

    taskTable.innerHTML = "";

    tasks.forEach(function(task, index) {

        let statusClass = "";

        if (task.status === "Pending") {
            statusClass = "status-pending";
        } else if (task.status === "In Progress") {
            statusClass = "status-progress";
        } else if (task.status === "Completed") {
            statusClass = "status-completed";
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.subject}</td>
            <td>${task.task}</td>
            <td>${task.deadline}</td>
            <td class="${statusClass}">
                ${task.status}
            </td>
            <td>
                <button
                    class="edit-btn"
                    onclick="editTask(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>
            </td>
        `;

        taskTable.appendChild(row);
    });
}

function editTask(index) {

    const task = tasks[index];

    document.getElementById("subject").value = task.subject;
    document.getElementById("task").value = task.task;
    document.getElementById("deadline").value = task.deadline;
    document.getElementById("status").value = task.status;

    document.getElementById("editIndex").value = index;

    submitBtn.textContent = "Update Task";
}


function deleteTask(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {

        tasks.splice(index, 1);

        displayTasks();

        alert("Task deleted successfully!");
    }
}


function clearForm() {

    taskForm.reset();

    document.getElementById("editIndex").value = "";

    submitBtn.textContent = "Add Task";
}

clearBtn.addEventListener("click", clearForm);
