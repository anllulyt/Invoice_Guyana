let index = 1
let date = new Date();

// genera el PDF
function generatePDF() {
  const db = jsPDFInvoiceTemplate.default(props);
  console.log(db)
}

// cargo la infor para el pdf
function cargaData() {
  props = {
    outputType: jsPDFInvoiceTemplate.OutputType.Save,
    returnJsPDFDocObject: false,
    fileName: Invoicenumber,
    orientationLandscape: true,
    compress: false,
    logo: {
      src: "../img/logo.png",
      margin: {
        top: 0,
        left: 0
      }
    },
    stamp: {
      inAllPages: false, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0 //negative or positive num, from the current position
      }
    },
    business: {
      name: `Invoice Number: ${Invoicenumber}`,
      address: `Invoice Date: ${InvoiceDate}`,
      phone: `Account Number: ${Accountnumber}`,
    },
    contact: {
      // label: "Datos de cliente:",
      // name: "dataFactura.nombre"
      //  address: dataFactura.calle + ', ' + dataFactura.provincia + ', ' + dataFactura.postal,
      //   phone: dataFactura.telefono,
      //   dni: dataFactura.dni
    },
    invoice: {
      label: "",
      //num: `000000100${index++}`,
      invDate: "", //+ date.toLocaleDateString(),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" }
      ],
      table: data.map(item => ([
        `Ship Date: ${convertDateFormat(item.Shipdate)}\nPayor: ${item.PaymentTypeDescription}\nReference: ${item.Reference.trim()}`,

        `Air Waybill: ${item.AWBnumber}\nService/Pak: ${item.ServicePakDescription.trim()}\nOrig/Dest: ${item.RouteRoutecodeINOUT}\nPieces: ${item.Piecescount}\nWeight: ${item.RatedWeight} ${item.CustomerPreferredWeightType}\nDelivered: ${(convertDateFormat(item.PODdate)).trim()} ${(item.PODtime).trim()}\nSigned by:   ${item.PodConsigneesignature}`,

        `SENDER: ${(item.Shippercompanyname).trim()} ${(item.ShipperAddress1).trim()} ${(item.ShipperAddress2).trim()} ${(item.ShipperCity).trim()} ${(item.Shipperstatecode).trim()} ${(item.Shipperpostalcode).trim()} ${(item.Shippercountrycode).trim()}`,

        `RECIPIENT: ${(item.Consigneename).trim()} ${(item.Consigneecompanyname).trim()} ${(item.Consigneeaddress1).trim()} ${(item.Consigneeaddress2).trim()} ${(item.ConsigneeCity).trim()} ${(item.Consigneestatecode).trim()} ${(item.Consigneepostalcode).trim()} ${(item.Consigneecountrycode).trim()}`,

        `Transportation Charges: ${item.AmountTransportationCharges}\nDiscount: ${item.AmountDiscount}\nShip & Save: ${item.AmountShipSave}\nFuel Surcharge: ${item.AmountFuelSurcharge}\nPeak Surcharge: ${item.AmountPeakSurcharge}\nSubtotal: ${item.CurrencyCode} ${item.NetCharges}`
      ]))
    },
    pageEnable: true,
    pageLabel: "Page ",
  }
}

const btn = document.querySelector('.generar')

btn.addEventListener("click", () => {
  cargaData()
  generatePDF()

  console.log(data[0])

  data.map(item => ([
    console.log(item.Discount)
  ]))

})