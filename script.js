
let customers = [
    {
        id: 1,
        name: "Nguyễn Văn An",
        phone: "0901234567",
        email: "an@gmail.com",
        address: "Quy Nhơn"
    },
    {
        id: 2,
        name: "Trần Thị Bình",
        phone: "0912345678",
        email: "binh@gmail.com",
        address: "Gia Lai"
    }
];

let rooms = [
    {
        id: 1,
        name: "P101",
        type: "Phòng đơn",
        price: 300000,
        status: "Trống"
    },
    {
        id: 2,
        name: "P102",
        type: "Phòng đôi",
        price: 500000,
        status: "Đang sử dụng"
    },
    {
        id: 3,
        name: "P103",
        type: "Phòng VIP",
        price: 1000000,
        status: "Bảo trì"
    }
];

let editingCustomerId = null;
let editingRoomId = null;

function showPage(page) {
    document.querySelectorAll(".page").forEach(item => {
        item.classList.add("hidden");
    });

    document.getElementById(page).classList.remove("hidden");

    updateDashboard();
}

function renderCustomers() {
    const keyword = document.getElementById("searchCustomer")
        .value.toLowerCase();

    const list = document.getElementById("customerList");
    list.innerHTML = "";

    customers
        .filter(c => c.name.toLowerCase().includes(keyword) ||
                     c.phone.includes(keyword))
        .forEach((c, index) => {
            list.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>KH${String(c.id).padStart(3, "0")}</td>
                    <td>${c.name}</td>
                    <td>${c.phone}</td>
                    <td>${c.email}</td>
                    <td>${c.address}</td>
                    <td>
                        <button class="edit"
                            onclick="editCustomer(${c.id})">
                            Sửa
                        </button>
                        <button class="delete"
                            onclick="deleteCustomer(${c.id})">
                            Xóa
                        </button>
                    </td>
                </tr>
            `;
        });
}

function openCustomerForm() {
    editingCustomerId = null;
    document.getElementById("customerFormTitle").innerText =
        "Thêm khách hàng";

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("customerAddress").value = "";

    document.getElementById("customerModal")
        .classList.remove("hidden");
}

function closeCustomerForm() {
    document.getElementById("customerModal")
        .classList.add("hidden");
}

function saveCustomer() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !email || !address) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (editingCustomerId !== null) {
        const customer = customers.find(c => c.id === editingCustomerId);

        customer.name = name;
        customer.phone = phone;
        customer.email = email;
        customer.address = address;

    } else {
        customers.push({
            id: Date.now(),
            name,
            phone,
            email,
            address
        });
    }

    closeCustomerForm();
    renderCustomers();
    updateDashboard();
}

function editCustomer(id) {
    const c = customers.find(item => item.id === id);

    editingCustomerId = id;

    document.getElementById("customerFormTitle").innerText =
        "Cập nhật khách hàng";

    document.getElementById("customerName").value = c.name;
    document.getElementById("customerPhone").value = c.phone;
    document.getElementById("customerEmail").value = c.email;
    document.getElementById("customerAddress").value = c.address;

    document.getElementById("customerModal")
        .classList.remove("hidden");
}

function deleteCustomer(id) {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
        customers = customers.filter(c => c.id !== id);
        renderCustomers();
        updateDashboard();
    }
}

function renderRooms() {
    const keyword = document.getElementById("searchRoom")
        .value.toLowerCase();

    const list = document.getElementById("roomList");
    list.innerHTML = "";

    rooms
        .filter(r => r.name.toLowerCase().includes(keyword) ||
                     r.type.toLowerCase().includes(keyword))
        .forEach((r, index) => {

            let statusClass = "";

            if (r.status === "Đang sử dụng") {
                statusClass = "busy";
            }

            if (r.status === "Bảo trì") {
                statusClass = "maintenance";
            }

            list.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>P${String(r.id).padStart(3, "0")}</td>
                    <td>${r.name}</td>
                    <td>${r.type}</td>
                    <td>${Number(r.price).toLocaleString("vi-VN")} VNĐ</td>
                    <td>
                        <span class="status ${statusClass}">
                            ${r.status}
                        </span>
                    </td>
                    <td>
                        <button class="edit"
                            onclick="editRoom(${r.id})">
                            Sửa
                        </button>
                        <button class="delete"
                            onclick="deleteRoom(${r.id})">
                            Xóa
                        </button>
                    </td>
                </tr>
            `;
        });
}

function openRoomForm() {
    editingRoomId = null;

    document.getElementById("roomFormTitle").innerText =
        "Thêm phòng";

    document.getElementById("roomName").value = "";
    document.getElementById("roomType").value = "Phòng đơn";
    document.getElementById("roomPrice").value = "";
    document.getElementById("roomStatus").value = "Trống";

    document.getElementById("roomModal")
        .classList.remove("hidden");
}

function closeRoomForm() {
    document.getElementById("roomModal")
        .classList.add("hidden");
}

function saveRoom() {
    const name = document.getElementById("roomName").value.trim();
    const type = document.getElementById("roomType").value;
    const price = Number(document.getElementById("roomPrice").value);
    const status = document.getElementById("roomStatus").value;

    if (!name || !Number.isFinite(price) || price <= 0) {
        alert("Vui lòng nhập tên phòng và giá phòng hợp lệ!");
        return;
    }

    if (editingRoomId !== null) {
        const room = rooms.find(r => r.id === editingRoomId);

        room.name = name;
        room.type = type;
        room.price = price;
        room.status = status;

    } else {
        rooms.push({
            id: Date.now(),
            name,
            type,
            price,
            status
        });
    }

    closeRoomForm();
    renderRooms();
    updateDashboard();
}

function editRoom(id) {
    const r = rooms.find(item => item.id === id);

    editingRoomId = id;

    document.getElementById("roomFormTitle").innerText =
        "Cập nhật phòng";

    document.getElementById("roomName").value = r.name;
    document.getElementById("roomType").value = r.type;
    document.getElementById("roomPrice").value = r.price;
    document.getElementById("roomStatus").value = r.status;

    document.getElementById("roomModal")
        .classList.remove("hidden");
}

function deleteRoom(id) {
    if (confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
        rooms = rooms.filter(r => r.id !== id);
        renderRooms();
        updateDashboard();
    }
}

function updateDashboard() {
    document.getElementById("totalCustomers").innerText =
        customers.length;

    document.getElementById("totalRooms").innerText =
        rooms.length;

    document.getElementById("emptyRooms").innerText =
        rooms.filter(r => r.status === "Trống").length;
}

renderCustomers();
renderRooms();

document.getElementById("customer").classList.remove("hidden");
document.getElementById("room").classList.add("hidden");