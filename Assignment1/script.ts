interface User {
    firstName: string;
    middleName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    role: string;
    address?: string;
    createdOn?: string;
    modifiedOn?: string;
}

const originalUsers: User[] = [
    {
        firstName: "Manvendra",
        middleName: "Singh",
        lastName: "Chauhan",
        email: "manvendrarc007@gmail.com",
        phoneNumber: "xxxxxxx",
        role: "Admin",
        address: "123 Main St",
        createdOn: "2024-07-16",
        modifiedOn: "2024-07-17"
    },
    {
        firstName: "Manvendra",
        middleName: "Singh",
        lastName: "Chauhan",
        email: "manvendrarc007@gmail.com",
        phoneNumber: "xxxxxxx",
        role: "Admin",
        address: "123 Main St",
        createdOn: "2024-07-16",
        modifiedOn: "2024-07-17"
    }
];
let users: User[] = [...originalUsers]; 

const loadButton = document.getElementById('loadButton') as HTMLButtonElement;
const userTable = document.getElementById('userTable') as HTMLTableElement;
const tableBody = userTable.querySelector('tbody') as HTMLTableSectionElement;

loadButton.addEventListener('click', () => {
    userTable.classList.remove('hidden');
    loadButton.textContent = 'Refresh data';
    loadUserData();
});

function loadUserData() {
    tableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.middleName ?? ''}</td>
            <td>${user.lastName ?? ''}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber ?? ''}</td>
            <td>${user.role}</td>
            <td>${user.address ?? ''}</td>
            <td>${user.createdOn ?? ''}</td>
            <td>${user.modifiedOn ?? ''}</td>
            <td>
                <button onclick="editRow(${index})">Edit</button>
                <button onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editRow(index: number) {
    const row = tableBody.rows[index];
    const cells = row.cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const cell = cells[i];
        const input = document.createElement('input');
        input.value = cell.textContent || '';
        cell.innerHTML = '';
        cell.appendChild(input);
    }

    const actionsCell = cells[cells.length - 1];
    actionsCell.innerHTML = `
        <button onclick="saveRow(${index})">Save</button>
        <button onclick="cancelEdit(${index})">Cancel</button>
    `;
}

function saveRow(index: number) {
    const row = tableBody.rows[index];
    const cells = row.cells;
    const updatedUser: Partial<User> = {};

    for (let i = 0; i < cells.length - 1; i++) {
        const input = cells[i].querySelector('input') as HTMLInputElement;
        const value = input.value;

        // Check mandatory fields
        if (i === 0 && !value.trim()) {
            alert("First Name is mandatory.");
            return;
        }
        if (i === 3 && !value.trim()) {
            alert("Email is mandatory.");
            return;
        }
        if (i === 5 && !value.trim()) {
            alert("Role is mandatory.");
            return;
        }

        cells[i].textContent = value;

        switch (i) {
            case 0: updatedUser.firstName = value; break;
            case 1: updatedUser.middleName = value; break;
            case 2: updatedUser.lastName = value; break;
            case 3: updatedUser.email = value; break;
            case 4: updatedUser.phoneNumber = value; break;
            case 5: updatedUser.role = value; break;
            case 6: updatedUser.address = value; break;
            case 7: updatedUser.createdOn = value; break;
            case 8: updatedUser.modifiedOn = value; break;
        }
    }

    users[index] = { ...users[index], ...updatedUser };

    const actionsCell = cells[cells.length - 1];
    actionsCell.innerHTML = `
        <button onclick="editRow(${index})">Edit</button>
        <button onclick="deleteRow(${index})">Delete</button>
    `;
}

function cancelEdit(index: number) {
    loadUserData();
}

function deleteRow(index: number) {
    users.splice(index, 1);
    loadUserData();
}

function refreshData() {
    users = [...originalUsers]; // Restore original data
    loadUserData();
}

loadButton.addEventListener('click', () => {
    if (loadButton.textContent === 'Refresh data') {
        refreshData();
    } else {
        loadUserData();
    }
});

(window as any).editRow = editRow;
(window as any).saveRow = saveRow;
(window as any).cancelEdit = cancelEdit;
(window as any).deleteRow = deleteRow;