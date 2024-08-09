document.addEventListener('DOMContentLoaded', function () {
    const datetime = document.getElementById('datetime');
    const dataForm = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');

    let currentEditItem = null;

    function updateDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        datetime.innerHTML = `Fecha: ${formattedDate} | Hora: ${formattedTime}`;
    }

    setInterval(updateDateTime, 1000);

    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const gender = document.getElementById('gender').value;
        const maritalStatus = document.getElementById('maritalStatus').value;
        const email = document.getElementById('email').value;

        const formData = {
            name,
            lastname,
            gender,
            maritalStatus,
            email
        };

        if (currentEditItem) {
            updateDataItem(currentEditItem, formData);
            currentEditItem = null;
            dataForm.querySelector('button[type="submit"]').innerText = 'Guardar';
        } else {
            addDataToList(formData);
        }

        dataForm.reset();
    });

    function addDataToList(data) {
        const li = document.createElement('li');
        li.innerHTML = `${data.name} ${data.lastname} - ${data.gender} - ${data.maritalStatus} - ${data.email} 
                        <button class="edit">Editar</button> 
                        <button class="delete">Eliminar</button>`;
        dataList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', function () {
            dataList.removeChild(li);
        });

        li.querySelector('.edit').addEventListener('click', function () {
            editDataItem(li, data);
        });
    }

    // Editar datos
    function editDataItem(li, data) {
        document.getElementById('name').value = data.name;
        document.getElementById('lastname').value = data.lastname;
        document.getElementById('gender').value = data.gender;
        document.getElementById('maritalStatus').value = data.maritalStatus;
        document.getElementById('email').value = data.email;

        currentEditItem = li;
        dataForm.querySelector('button[type="submit"]').innerText = 'Modificar';
    }

    function updateDataItem(li, data) {
        li.innerHTML = `${data.name} ${data.lastname} - ${data.gender} - ${data.maritalStatus} - ${data.email} 
                        <button class="edit">Editar</button> 
                        <button class="delete">Eliminar</button>`;

        li.querySelector('.delete').addEventListener('click', function () {
            dataList.removeChild(li);
        });

        li.querySelector('.edit').addEventListener('click', function () {
            editDataItem(li, data);
        });
    }
});
