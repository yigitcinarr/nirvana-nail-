// Verileri saklamak için basit bir array (ileride database bağlanabilir)
let customers = [];

// Formu seç
const form = document.getElementById('customerForm');

// Müşteri ekleme formu gönderildiğinde çalışacak
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Form verilerini al
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const lastVisit = document.getElementById('lastVisit').value;
    const interval = parseInt(document.getElementById('interval').value);

    // Sonraki randevu tarihini hesapla
    let nextDate = new Date(lastVisit);
    nextDate.setDate(nextDate.getDate() + interval);

    // Yeni müşteri nesnesi
    const newCustomer = {
        name,
        phone,
        service,
        lastVisit,
        interval,
        nextDate: nextDate.toISOString().split('T')[0]
    };

    // Listeye ekle
    customers.push(newCustomer);

    // Listeyi güncelle
    updateCustomerTable();
    updateUpcomingList();

    // Formu sıfırla
    form.reset();

    alert("✅ Müşteri eklendi!");
});

// Müşteri Listesi Tablosunu Güncelle
function updateCustomerTable() {
    const tableBody = document.querySelector("#customerTable tbody");
    tableBody.innerHTML = "";

    customers.forEach(cust => {
        const row = `
            <tr>
                <td>${cust.name}</td>
                <td>${cust.phone}</td>
                <td>${cust.service}</td>
                <td>${cust.lastVisit}</td>
                <td>${cust.nextDate}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Yaklaşan Randevular Listesini Güncelle
function updateUpcomingList() {
    const upcomingList = document.getElementById("upcomingList");
    upcomingList.innerHTML = "";

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingCustomers = customers.filter(cust => {
        const nd = new Date(cust.nextDate);
        return nd >= today && nd <= nextWeek;
    });

    if (upcomingCustomers.length === 0) {
        upcomingList.innerHTML = "<li>Önümüzdeki 7 gün içinde randevusu yaklaşan müşteri yok.</li>";
        return;
    }

    upcomingCustomers.forEach(cust => {
        const li = `
            <li>
                <strong>${cust.name}</strong> - ${cust.service} 
                <br> 📅 <em>${cust.nextDate}</em>
            </li>
        `;
        upcomingList.innerHTML += li;
    });
}

// Bölümler arası geçiş için fonksiyon
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}
