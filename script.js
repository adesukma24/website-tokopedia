/* ==========================================================
   TOKOPEDIA STORE V2.0
   SCRIPT.JS

/* ===========================
   INISIALISASI
=========================== */

let keranjang =
JSON.parse(localStorage.getItem("keranjang")) || [];

let totalHarga = 0;

/* ===========================
   SIMPAN LOCAL STORAGE
=========================== */

function simpanKeranjang(){

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );

}

/* ===========================
   FORMAT RUPIAH
=========================== */

function formatRupiah(angka){

    return "Rp " +
    angka.toLocaleString("id-ID");

}

/* ===========================
   TAMBAH PRODUK
=========================== */

function tambahKeranjang(nama,harga){

    let produk = {

        id:Date.now(),

        nama:nama,

        harga:harga

    };

    keranjang.push(produk);

    simpanKeranjang();

    renderKeranjang();

    tampilToast(
        nama + " berhasil ditambahkan."
    );

}

/* ===========================
   HAPUS PRODUK
=========================== */

function hapusProduk(id){

    keranjang =
    keranjang.filter(function(item){

        return item.id != id;

    });

    simpanKeranjang();

    renderKeranjang();

}

/* ===========================
   KOSONGKAN KERANJANG
=========================== */

function kosongkanKeranjang(){

    if(keranjang.length==0){

        alert("Keranjang masih kosong.");

        return;

    }

    if(confirm("Kosongkan keranjang?")){

        keranjang=[];

        simpanKeranjang();

        renderKeranjang();

    }

}

/* ===========================
   RENDER KERANJANG
=========================== */

function renderKeranjang(){

    let list =
    document.getElementById("cart-list");

    let badge =
    document.getElementById("cart");

    let total =
    document.getElementById("totalHarga");

    let checkoutTotal =
    document.getElementById("checkoutTotal");

    let checkoutProduk =
    document.getElementById("checkoutProduk");

    list.innerHTML="";

    totalHarga=0;

    if(keranjang.length==0){

        list.innerHTML=`

        <p class="empty-cart">

        Keranjang masih kosong.

        </p>

        `;

        badge.innerHTML=0;

        total.innerHTML="Rp0";

        checkoutTotal.innerHTML="Rp0";

        checkoutProduk.innerHTML=
        "Belum ada produk dipilih.";

        return;

    }

    keranjang.forEach(function(item){

        totalHarga += item.harga;

        list.innerHTML += `

        <div class="cart-item">

            <div class="cart-info">

                <h4>

                    ${item.nama}

                </h4>

                <p>

                    ${formatRupiah(item.harga)}

                </p>

            </div>

            <button
            onclick="hapusProduk(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    badge.innerHTML=
    keranjang.length;

    total.innerHTML=
    formatRupiah(totalHarga);

    checkoutTotal.innerHTML=
    formatRupiah(totalHarga);

    let html="";

    keranjang.forEach(function(item,index){

        html +=

        (index+1)+". "

        +item.nama+

        " - "

        +formatRupiah(item.harga)

        +"<br>";

    });

    checkoutProduk.innerHTML=html;

}

/* ===========================
   LOAD SAAT WEBSITE DIBUKA
=========================== */

window.onload=function(){

    renderKeranjang();

};

/* ===========================
   PENCARIAN PRODUK
=========================== */

function cariProduk(){

    let keyword =
    document
    .getElementById("search")
    .value
    .toLowerCase();

    let card =
    document.querySelectorAll(".card");

    card.forEach(function(item){

        let nama =
        item.querySelector("h3")
        .innerText
        .toLowerCase();

        if(nama.includes(keyword)){

            item.style.display="block";

        }else{

            item.style.display="none";

        }

    });

}

/* ===========================
   TOAST NOTIFICATION
=========================== */

function tampilToast(pesan){

    let toast =
    document.getElementById("toast");

    toast.innerHTML=pesan;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2500);

}

/* ===========================
   LOADING SCREEN
=========================== */

function tampilLoading(){

    document
    .getElementById("loading")
    .style.display="flex";

}

function sembunyiLoading(){

    document
    .getElementById("loading")
    .style.display="none";

}

/* ===========================
   BACK TO TOP
=========================== */

window.addEventListener("scroll",function(){

    let tombol =
    document.getElementById("btnTop");

    if(window.scrollY>300){

        tombol.style.display="block";

    }else{

        tombol.style.display="none";

    }

});

/* ===========================
   SCROLL KE ATAS
=========================== */

function scrollKeAtas(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ===========================
   SCROLL OTOMATIS
=========================== */

function scrollKe(id){

    document
    .getElementById(id)
    .scrollIntoView({

        behavior:"smooth"

    });

}

/* ===========================
   EFEK LOADING SAAT PINDAH
=========================== */

function bukaSection(id){

    tampilLoading();

    setTimeout(function(){

        sembunyiLoading();

        scrollKe(id);

    },600);

}

/* ===========================
   ANIMASI CARD
=========================== */

const semuaCard =
document.querySelectorAll(".card");

const observer =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

semuaCard.forEach(function(card){

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=".6s";

    observer.observe(card);

});

/* ===========================
   ANIMASI SECTION
=========================== */

const semuaSection =
document.querySelectorAll("section");

const sectionObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.15
});

semuaSection.forEach(function(section){

    section.style.opacity="0";

    section.style.transform="translateY(40px)";

    section.style.transition=".8s";

    sectionObserver.observe(section);

});

/* ===========================
   LOADING SAAT WEBSITE DIBUKA
=========================== */

window.addEventListener("load",function(){

    tampilLoading();

    setTimeout(function(){

        sembunyiLoading();

    },800);

});

/* ===========================
   REGISTER
=========================== */

function registerUser(event){

    event.preventDefault();

    let nama =
    document.getElementById("regNama").value.trim();

    let email =
    document.getElementById("regEmail").value.trim();

    let password =
    document.getElementById("regPassword").value;

    if(nama==="" || email==="" || password===""){

        alert("Semua data harus diisi.");

        return;

    }

    let akun={

        nama:nama,

        email:email,

        password:password

    };

    localStorage.setItem(
        "akun",
        JSON.stringify(akun)
    );

    tampilToast("Registrasi berhasil.");

    document.querySelector("#register form").reset();

    scrollKe("login");

}

/* ===========================
   LOGIN
=========================== */

function loginUser(event){

    event.preventDefault();

    let email =
    document.getElementById("loginEmail").value.trim();

    let password =
    document.getElementById("loginPassword").value;

    let akun =
    JSON.parse(localStorage.getItem("akun"));

    if(!akun){

        alert("Silakan register terlebih dahulu.");

        return;

    }

    if(
        email===akun.email &&
        password===akun.password
    ){

        localStorage.setItem(
            "login",
            "true"
        );

        tampilToast(
            "Selamat datang, " + akun.nama
        );

        tampilProfil();

        document.querySelector("#login form").reset();

        scrollKe("checkout");

    }else{

        alert("Email atau Password salah.");

    }

}

/* ===========================
   TAMPILKAN PROFIL
=========================== */

function tampilProfil(){

    let akun =
    JSON.parse(localStorage.getItem("akun"));

    if(!akun){

        return;

    }

    document.getElementById("profileNama").innerHTML =
    akun.nama;

    document.getElementById("profileEmail").innerHTML =
    akun.email;

}

/* ===========================
   BUKA MODAL
=========================== */

function bukaModal(){

    tampilProfil();

    document.getElementById("profileModal")
    .style.display="flex";

}

/* ===========================
   TUTUP MODAL
=========================== */

function tutupModal(){

    document.getElementById("profileModal")
    .style.display="none";

}

/* ===========================
   LOGOUT
=========================== */

function logoutUser(){

    if(confirm("Yakin ingin logout?")){

        localStorage.removeItem("login");

        tutupModal();

        tampilToast("Logout berhasil.");

        setTimeout(function(){

            location.reload();

        },800);

    }

}

/* ===========================
   STATUS LOGIN
=========================== */

function cekLogin(){

    let status =
    localStorage.getItem("login");

    let akun =
    JSON.parse(localStorage.getItem("akun"));

    let tombolLogin =
    document.querySelector(".menu-kanan button:nth-child(1)");

    if(status==="true" && akun){

        tombolLogin.innerHTML =
        "Halo, " + akun.nama;

        tombolLogin.onclick =
        bukaModal;

    }

}

/* ===========================
   TAMPILKAN NAMA USER
=========================== */

function tampilNamaHero(){

    let status =
    localStorage.getItem("login");

    let akun =
    JSON.parse(localStorage.getItem("akun"));

    if(status==="true" && akun){

        let hero =
        document.querySelector(".hero h1");

        hero.innerHTML =
        "Selamat Datang, " + akun.nama;

    }

}

/* ===========================
   TUTUP MODAL
   SAAT KLIK AREA GELAP
=========================== */

window.onclick=function(event){

    let modal =
    document.getElementById("profileModal");

    if(event.target===modal){

        modal.style.display="none";

    }

}

/* ===========================
   LOAD USER
=========================== */

window.addEventListener("load",function(){

    tampilProfil();

    cekLogin();

    tampilNamaHero();

});

/* ===========================
   CHECKOUT
=========================== */

function checkoutWA(event){

    event.preventDefault();

    if(keranjang.length===0){

        alert("Keranjang masih kosong.");

        return;

    }

    let nama =
    document.getElementById("nama").value.trim();

    let alamat =
    document.getElementById("alamat").value.trim();

    let hp =
    document.getElementById("hp").value.trim();

    if(nama==="" || alamat==="" || hp===""){

        alert("Lengkapi data checkout.");

        return;

    }

    let daftarProduk="";

    keranjang.forEach(function(item,index){

        daftarProduk +=

        (index+1)+". "

        +item.nama+

        " - "

        +formatRupiah(item.harga)

        +"\n";

    });

    let pesan =

`Halo Admin Tokopedia Store

Saya ingin melakukan pemesanan.

========================

Nama :
${nama}

Alamat :
${alamat}

Nomor HP :
${hp}

========================

Produk :

${daftarProduk}

========================

Jumlah Produk :
${keranjang.length}

Total Belanja :
${formatRupiah(totalHarga)}

Terima kasih.`;

    /* GANTI DENGAN NOMOR WHATSAPP ANDA */

    let nomor = "6282291911193";

    let url =

    "https://wa.me/"

    + nomor +

    "?text=" +

    encodeURIComponent(pesan);

    simpanPesanan({

        tanggal:new Date().toLocaleString("id-ID"),

        nama:nama,

        alamat:alamat,

        hp:hp,

        produk:keranjang,

        total:totalHarga

    });

    tampilToast("Pesanan berhasil dibuat.");

    window.open(url,"_blank");

    keranjang=[];

    simpanKeranjang();

    renderKeranjang();

    document
    .querySelector("#checkout form")
    .reset();

}

/* ===========================
   SIMPAN RIWAYAT
=========================== */

function simpanPesanan(data){

    let riwayat =

    JSON.parse(

    localStorage.getItem("riwayat")

    ) || [];

    riwayat.push(data);

    localStorage.setItem(

        "riwayat",

        JSON.stringify(riwayat)

    );

}

/* ===========================
   TAMPILKAN RIWAYAT
=========================== */

function lihatRiwayat(){

    let riwayat =

    JSON.parse(

    localStorage.getItem("riwayat")

    ) || [];

    if(riwayat.length===0){

        alert("Belum ada riwayat pesanan.");

        return;

    }

    let teks="RIWAYAT PESANAN\n\n";

    riwayat.forEach(function(item,index){

        teks +=

        (index+1)+

        ". "

        +item.nama+

        " | "

        +item.tanggal+

        "\n"

        +"Total : "

        +formatRupiah(item.total)

        +"\n\n";

    });

    alert(teks);

}

/* ===========================
   RESTORE WEBSITE
=========================== */

function restoreData(){

    renderKeranjang();

    tampilProfil();

    cekLogin();

    tampilNamaHero();

}

/* ===========================
   SHORTCUT KEYBOARD
=========================== */

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        tutupModal();

    }

});

/* ===========================
   CEGAH SUBMIT KOSONG
=========================== */

document.querySelectorAll("form")

.forEach(function(form){

    form.addEventListener("submit",function(e){

        let valid=true;

        form.querySelectorAll("input,textarea")

        .forEach(function(input){

            if(input.hasAttribute("required")){

                if(input.value.trim()===""){

                    valid=false;

                }

            }

        });

        if(!valid){

            e.preventDefault();

            alert("Mohon lengkapi semua data.");

        }

    });

});

/* ===========================
   INISIALISASI WEBSITE
=========================== */

window.addEventListener("load",function(){

    restoreData();

    sembunyiLoading();

});

/* ===========================
   SELESAI
=========================== */

console.log(

"Tokopedia Store v2.0 berhasil dijalankan."

);
