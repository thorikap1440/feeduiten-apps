import "./App.css";
import React from "react";
import ModalCreate from "./components/ModalCreate"; // import modalcreate component yang akan digunakan pada file ini

// Menggunakan Class Component
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [
        // {
        //   deskripsi: "Menerima Gaji",
        //   tanggal: "1 July 2022",
        //   nominal: 10000,
        //   category: "IN",
        // },
        // {
        //   deskripsi: "Menerima Gaji 2",
        //   tanggal: "1 July 2022",
        //   nominal: 10000,
        //   category: "IN",
        // },
        // {
        //   deskripsi: "Makan Nasi Padang",
        //   tanggal: "2 July 2022",
        //   nominal: 10000,
        //   category: "OUT",
        // },
      ],
    };

    this.tampilkanItem = this.tampilkanItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  // Menampilkan item yang di isikan pada form ke website
  tampilkanItem(objek) {
    let newData = [...this.state.summary, objek];
    // Uang Masuk
    let dataUangIn = newData.filter((item) => item.category === "IN");
    let nominalUang = dataUangIn.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0);

    // Uang Keluar
    let dataUangOUT = newData.filter((item) => item.category === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    this.setState({
      pemasukanUang: jumlahUangIN,
      transaksiIN: nominalUang.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persentaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
      summary: newData,
    });
  }

  // Logika perhitungan pada sistem form supaya tampil pada website
  fnHitung() {
    // Uang Masuk
    let dataUangIn = this.state.summary.filter(
      (item) => item.category === "IN"
    );
    let nominalUang = dataUangIn.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num);

    // Uang Keluar
    let dataUangOUT = this.state.summary.filter(
      (item) => item.category === "OUT"
    );
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num);

    this.setState({
      pemasukanUang: jumlahUangIN,
      transaksiIN: nominalUang.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persentaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
    });
  }

  componentDidMount() {
    if (this.state.summary.length < 1) {
      console.log("ok");
    } else {
      this.fnHitung();
    }
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fw-bold">FEEDUITEN APPS</h1>
              <hr className="w-75 mx-auto" />
              <h2 className="fw-bold">Rp. {this.state.sisaUang},-</h2>
              <span className="title-md">
                Sisa uang kamu tersisa {this.state.persentaseUang}% lagi
              </span>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <div className="card-wrapper p-4 shadow-lg">
                <div className="icon-wrapper-in mb-1">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title-sm">Pemasukan</span>
                <h3>Rp. {this.state.pemasukanUang},-</h3>
                <div>
                  <span className="title-sm text-ungu">
                    {this.state.transaksiIN}
                  </span>
                  <span className="title-sm"> Transaksi</span>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card-wrapper p-4 shadow-lg">
                <div className="icon-wrapper-in mb-1">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className="title-sm">Pengeluaran</span>
                <h3>Rp. {this.state.pengeluaranUang},-</h3>
                <div>
                  <span className="title-sm text-ungu">
                    {this.state.transaksiOUT}
                  </span>
                  <span className="title-sm"> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h2 className="title-transaksi">Ringkasan Transaksi</h2>
              <div className="button-wrapper">
                <ModalCreate
                  action={this.tampilkanItem}
                  category="IN"
                  variant="button btn-ungu me-2"
                  text="Pemasukan"
                  icon="bi bi-plus-circle-fill"
                  modalHeading="Tambahkan Pemasukan"
                />
                <ModalCreate
                  action={this.tampilkanItem}
                  category="OUT"
                  variant="button btn-pink"
                  text="Pengeluaran"
                  icon="bi bi-dash-circle-fill"
                  modalHeading="Tambahkan Pengeluaran"
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {this.state.summary.length < 1 && <Alert />}
            {this.state.summary.map((sum, index) => {
              return (
                <div
                  key={index}
                  className="col-12 d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        sum.category === "IN"
                          ? "icon-wrapper-in"
                          : "icon-wrapper-out"
                      }
                      style={{ padding: 20 }}
                    >
                      <i
                        className={
                          sum.category === "IN"
                            ? "bi bi-wallet2"
                            : "bi bi-bag-dash"
                        }
                      ></i>
                    </div>

                    <div className="transaction d-flex flex-column ms-3">
                      <h6 style={{ color: 454545, fontWeight: 600 }}>
                        {sum.deskripsi}
                      </h6>
                      <span className="title-sm">{sum.tanggal}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.category === "IN" ? "text-money-in" : "text-money-out"
                    }
                  >
                    Rp. {sum.nominal}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

class Alert extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <h1 className="fw-bold text-center mt-5">Data Masih Kosong</h1>;
  }
}

export default App;
