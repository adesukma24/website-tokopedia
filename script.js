// ======================================
// TOKOPEDIA STORE
// Script Lengkap
// ======================================

// ================================
// KERANJANG BELANJA
// ================================

let jumlah = 0;
let daftarProduk = [];
let totalHarga = 0;

function tambahKeranjang(namaProduk, harga) {

    jumlah++;

    document.getElementById("cart").innerHTML = jumlah;

    daftarProduk.push(namaProduk);

    totalHarga += harga;

    alert(namaProduk + " berhasil ditambahkan ke keranjang.");
}

// ================================
// PENCARIAN PRODUK
// ================================

function cariProduk() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let produk = document.querySelectorAll(".card");

    produk.forEach(function(item){

        let nama = item.innerText.toLowerCase();

        if(nama.includes(input)){

            item.style.display="block";

        }else{

            item.style.display="none";

        }

    });

}

// ================================
// REGISTER
// ================================

function registerUser(event){

    event.preventDefault();

    let nama =
    document.getElementById("regNama").value;

    let email =
    document.getElementById("regEmail").value;

    let password =
    document.getElementById("regPassword").value;

    localStorage.setItem("nama",nama);
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);

    alert("Registrasi berhasil.");

    document.getElementById("login")
    .scrollIntoView({
        behavior:"smooth"
    });

}

// ================================
// LOGIN
// ================================

function loginUser(event){

    event.preventDefault();

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let emailDB =
    localStorage.getItem("email");

    let passwordDB =
    localStorage.getItem("password");

    if(email===emailDB && password===passwordDB){

        alert("Login berhasil.");

        document.getElementById("checkout")
        .scrollIntoView({
            behavior:"smooth"
        });

    }else{

        alert("Email atau Password salah.");

    }

}

// ================================
// CHECKOUT
// ================================

function checkoutWA(event){

    event.preventDefault();

    if(jumlah==0){

        alert("Keranjang masih kosong.");

        return;

    }

    let nama =
    document.getElementById("nama").value;

    let alamat =
    document.getElementById("alamat").value;

    let hp =
    document.getElementById("hp").value;

    let daftar="";

    daftarProduk.forEach(function(item,index){

        daftar += (index+1)+". "+item+"\n";

    });

    let pesan =
`Halo Admin Tokopedia Store

Saya ingin memesan produk.

Nama :
${nama}

Alamat :
${alamat}

Nomor HP :
${hp}

Produk yang dipesan :

${daftar}

Jumlah Produk :
${jumlah}

Total Harga :
Rp ${totalHarga.toLocaleString("id-ID")}

Mohon diproses.

Terima kasih.`;

    // GANTI DENGAN NOMOR WHATSAPP ANDA
    let nomor="6282291911193";

    let url=
    "https://wa.me/"+nomor+
    "?text="+encodeURIComponent(pesan);

    window.open(url,"_blank");

}
