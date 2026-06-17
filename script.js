// Variabel jumlah barang dalam keranjang
let jumlah = 0;

// Fungsi menambah jumlah keranjang
function tambahKeranjang() {

    jumlah++;

    document.getElementById("cart").innerHTML = jumlah;
}

// Fungsi pencarian produk
function cariProduk() {

    let input =
        document.getElementById("search").value.toLowerCase();

    let produk =
        document.querySelectorAll(".card");

    produk.forEach(function(item) {

        let nama =
            item.innerText.toLowerCase();

        if (nama.includes(input)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";
        }

    });
}