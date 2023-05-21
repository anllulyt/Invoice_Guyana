const element = document.getElementById("invoice");
element.innerHTML = "";

const contentinvoice = `
<div class="flex-column firstinfo">
    <div class="d-flex align-items-end flex-column ">
        <div class="col firstdatadiv">
        </div>
    </div>
    <div class="d-flex align-items-start flex-column">
        <div class="col seconddatadiv">
        </div>
    </div>
    <div class="d-flex align-items-center flex-column InvoiceN">
        <div class="col thirddatadiv ">
        </div>
    </div>
    <div class="d-flex align-items-end flex-column ">
        <div class="col fourthdatadiv">

        </div>
    </div>
</div>
<!--      </div> -->

<h1>Invoice Summary
</h1>
<hr class="border border-black border-2 opacity-100">
<br>

<h2>Transportation Charges</h2>
<div>
<div class="d-flex justify-content-between">

<div class="text-body1">
    <table class="table1 ">
        <thead class="thead1 ">
            <tr class="thead-dark trthead1 ">
                <th></th>
                <th> </th>

            </tr>
        </thead>
        <tbody class="tbody1">
        </tbody>
    </table>
</div>

<div class="col offset-md-1 nota1">
    <table class="table md-3">
        <thead class="">
            <tr class="thead-dark">
                <th>
                    <h2>Consignee's Address Verification</h2>
                    <p class="nota">Before preparing your shipment, please make sure you have the
                        correct
                        and complete address information written on the air waybill; otherwise your
                        account will be charged with an additional address correction fee.</p>
                    <br>
                    <h2>Is your destination address correct?
                    </h2>
                    <p class="nota">This is a friendly reminder to double-check your recipient's
                        address
                        to make sure it is correct and complete. If it is incorrect or incomplete,
                        a special handling fee will be assessed. Please contact Customer Service
                        regarding the fee and required recipient information.</p>
                </th>
            </tr>
        </thead>
    </table>
</div>
</div>

<div class="d-flex align-items-end flex-column divtotal1">
<div class="col divtOTAL">
</div>
</div>

<div class="divSave"></div>

<br>

</div>


<div class="container justify-content-center divh4">
<h4>Please detach here </h4>
</div>
<br><br><br>
<img src="./img/logo.png" alt="" class="img">

<div class="d-flex justify-content-between">
<div class="infobotton">
<p class="inforem1">To ensure proper credit, please return
    this portion with
    your payment to FedEx
</p>
<p class="inforem1">Please do not staple or fold.</p>
<p class="inforem">Remittance Advice</p>
<p class="inforem2">Transportation Charges</p>

</div>
<div class="text">
<p class="pdatepay"></p>
<table class="table table-bordered table2">
    <thead class=" ">
        <tr class="thead-dark  ">
            <th class="thtext">Invoice Number</th>
            <th class="thtext">Account Number </th>
            <th class="thtext1">Amount Due </th>
            <th class="thtext">Amount Paid </th>

        </tr>
    </thead>
    <tbody class="tbody2 thead-dark">

    </tbody>
</table>
</div>
</div>

<div class="divimg2">
<img src="./img/Screenshot_2.png" alt="" class="img2">
</div>

<div class="d-flex justify-content-between">
<p class="lastinf">
CAMEX LTD.
TERRENCE CAMPBELL
125-D BARRACK STREET
GEORGETOWN
GUYANA
</p>

<p class="lastinfFedex">FEDERAL EXPRESS CORPORATION
8240 N.W. 52ND TERRACE, SUITE #300
MIAMI, FL 33166 USA</p>
</div>
`;

element.innerHTML = contentinvoice;

const data = [];
let onlyitems = [];
let onlyitemsdict = [];
let endLine = [];

function convertDateFormat(i) {
  return moment(i).format("DD MMM YYYY");
}

function addCommas(nStr) {
  nStr += "";
  let x = nStr.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

let items = [];
let input = myForm.myInput;
let reader = new FileReader();
const tbody = document.querySelector(".tbody");
const tbody1 = document.querySelector(".tbody1");
const tbody2 = document.querySelector(".tbody2");
const firstdatadiv = document.querySelector(".firstdatadiv");
const seconddatadiv = document.querySelector(".seconddatadiv");
const thirddatadiv = document.querySelector(".thirddatadiv");
const fourthdatadiv = document.querySelector(".fourthdatadiv");
const thead = document.querySelector(".thead");
const Charges = document.querySelector(".Charges");
const divSave = document.querySelector(".divSave");
const divtOTAL = document.querySelector(".divtOTAL");

input.addEventListener("change", onChange);

function onChange(event) {
  let file = event.target.files[0];
  reader.readAsText(file);
  reader.onload = onLoad;
}

const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

function onLoad() {
  /* Obtengo el texto*/
  let result = reader.result;

  let lineas = result.split("\n");

  tbody.innerHTML = "";
  tbody1.innerHTML = "";
  tbody2.innerHTML = "";
  thead.innerHTML = "";
  divSave.innerHTML = "";
  divtOTAL.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("container");
  //div.id = "invoice"

  const firstdata = document.createElement("div");
  firstdata.classList = "col firstdata";

  const seconddata = document.createElement("div");
  seconddata.classList = "col seconddata";

  const thirddata = document.createElement("div");
  thirddata.classList = "col thirddata align-text-bottom";
  thirddata.id = "idNumInvoice";

  const fourthdata = document.createElement("div");
  fourthdata.classList = "col fourthdata";

  Invoicenumber = `${result.substring(47, 48)}-${result.substring(
    48,
    51
  )}-${result.substring(51, 56)}`;
  Accountnumber = `${result.substring(0, 4)}-${result.substring(
    4,
    8
  )}-${result.substring(8, 9)}`;
  InvoiceDate = result.substring(39, 47);

  firstdata.innerHTML = `<p class="InvoiceN"> Invoice Number:  ${Invoicenumber} </p>
                          <p class="InvoiceN1"> Invoice Date:  ${convertDateFormat(
                            InvoiceDate
                          )}</p >
                          <p class="InvoiceN1"> Account Number:  ${Accountnumber}</p>`;
  firstdatadiv.append(firstdata);

  seconddata.innerHTML = `<p>CAMEX LTD.
  TERRENCE CAMPBELL
  125-D BARRACK STREET
  GEORGETOWN
  GUYANA</p>`;
  seconddatadiv.append(seconddata);

  thirddata.innerHTML = `<p class="pInvoicen align-text-bottom">  ${Invoicenumber} </p>`;
  thirddatadiv.append(thirddata);

  fourthdata.innerHTML = `<p class="Questions"> Questions? </p>
                          <p>Phone: (305) 718-2194</p>
                          <p>Fax: </p>
                          <p>Internet: www.fedex.com </p>`;
  fourthdatadiv.append(fourthdata);

  for (let linea of lineas) {
    // console.log(linea.length);
    if (linea.length > 0) {
      let eitem3 = "";
      let eitem3Amount = 0;
      let eitem4 = "";
      let eitem4Amount = 0;
      let eitem5 = "";
      let eitem5Amount = 0;
      let eitem6 = "";
      let eitem6Amount = 0;

      if (linea.trim().length > 1117) {
        eitem3 = linea.substring(1117, 1157);
        eitem3Amount = Number(
          `${linea.substring(1157, 1167)}.${linea.substring(1167, 1169)}`
        );
      }

      if (linea.trim().length > 1172) {
        eitem4 = linea.substring(1172, 1212);
        eitem4Amount = Number(
          `${linea.substring(1212, 1222)}.${linea.substring(1222, 1224)}`
        );
      }

      if (linea.trim().length > 1227) {
        eitem5 = linea.substring(1227, 1267);
        eitem5Amount = Number(
          `${linea.substring(1267, 1277)}.${linea.substring(1277, 1279)}`
        );
      }

      if (linea.trim().length > 1282) {
        eitem6 = linea.substring(1282, 1322);
        eitem6Amount = Number(
          `${linea.substring(1322, 1332)}.${linea.substring(1332, 1334)}`
        );
      }
      //   console.log(endLine);
      data.push({
        Shipdate: linea.substring(114, 122),
        PaymentTypeDescription: linea.substring(538, 553),
        Reference: linea.substring(134, 173),
        AWBnumber: linea.substring(122, 134),
        ServicePakDescription: linea.substring(487, 537).substring(0, 6),
        RouteRoutecodeINOUT: `${linea.substring(581, 584)}/${linea.substring(
          584,
          587
        )}`,
        Piecescount: linea.substring(471, 476),
        RatedWeight: Number(
          `${linea.substring(476, 483)}.${linea.substring(483, 485)}`
        ),
        CustomerPreferredWeightType: linea.substring(900, 903),
        PODdate: linea.substring(569, 577),
        PODtime: `${linea.substring(577, 579)}:${linea.substring(579, 581)}`,
        PodConsigneesignature: linea.substring(554, 569),
        Shippername: linea.substring(173, 203),
        Shippercompanyname: linea.substring(203, 233),
        ShipperAddress1: linea.substring(233, 263),
        ShipperAddress2: linea.substring(263, 293),
        ShipperCity: linea.substring(293, 308),
        Shipperstatecode: linea.substring(308, 310),
        Shipperpostalcode: linea.substring(310, 320),
        Shippercountrycode: linea.substring(320, 322),
        Consigneename: linea.substring(322, 352),
        Consigneecompanyname: linea.substring(352, 382),
        Consigneeaddress1: linea.substring(382, 412),
        Consigneeaddress2: linea.substring(412, 442),
        ConsigneeCity: linea.substring(442, 457),
        Consigneestatecode: linea.substring(457, 459),
        Consigneepostalcode: linea.substring(459, 469),
        Consigneecountrycode: linea.substring(469, 471),
        OriginCurrency: linea.substring(938, 941),
        NetCharges: Number(
          `${linea.substring(992, 1000)}.${linea.substring(1000, 1002)}`
        ),
        item1: linea.substring(1007, 1047).trim(),
        item1Amount: Number(
          `${linea.substring(1047, 1057)}.${linea.substring(1057, 1059)}`
        ),
        item2: linea.substring(1062, 1102).trim(),
        item2Amount: Number(
          `${linea.substring(1102, 1112)}.${linea.substring(1112, 1114)}`
        ),
        item3: eitem3.trim(),
        item3Amount: eitem3Amount,
        item4: eitem4.trim(),
        item4Amount: eitem4Amount,
        item5: eitem5.trim(),
        item5Amount: eitem5Amount,
        item6: eitem6.trim(),
        item6Amount: eitem6Amount,
      });
    }
  }
  //console.log(data);
  data.forEach((elemento) => {
    if (!onlyitems.includes(elemento.item1.trim()) && elemento.item1 != "") {
      onlyitems.push(elemento.item1.trim());
    }
    if (!onlyitems.includes(elemento.item2.trim()) && elemento.item2 != "") {
      onlyitems.push(elemento.item2.trim());
    }
    if (!onlyitems.includes(elemento.item3.trim()) && elemento.item3 != "") {
      onlyitems.push(elemento.item3.trim());
    }
    if (!onlyitems.includes(elemento.item4.trim()) && elemento.item4 != "") {
      onlyitems.push(elemento.item4.trim());
    }
    if (!onlyitems.includes(elemento.item5.trim()) && elemento.item5 != "") {
      onlyitems.push(elemento.item5.trim());
    }
    if (!onlyitems.includes(elemento.item6.trim()) && elemento.item6 != "") {
      if (elemento.item6.length > 0.001) {
        onlyitems.push(elemento.item6.trim());
      }
    }
  });
  //console.log(onlyitems)
  let dataAndAmount = [];

  for (i = 0; i < onlyitems.length; i++) {
    data.forEach((el) => {
      // console.log(onlyitems[i] + " " + el.item1 +"  "+ ((!el.item1)) )
      if (onlyitems[i] === el.item1) {
        let amount1 = el.item1Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount1,
        });
      } else if (onlyitems[i] === el.item2) {
        let amount2 = el.item2Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount2,
        });
      } else if (onlyitems[i] === el.item3) {
        let amount3 = el.item3Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount3,
        });
      } else if (onlyitems[i] === el.item4) {
        let amount4 = el.item4Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount4,
        });
      } else if (onlyitems[i] === el.item5) {
        let amount5 = el.item5Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount5,
        });
      } else if (onlyitems[i] === el.item6) {
        let amount6 = el.item6Amount;
        dataAndAmount.push({
          Id: el.AWBnumber,
          Name: onlyitems[i],
          Amount: amount6,
        });
      }
    });
  }
  //console.log(dataAndAmount)
  const trthead = document.createElement("tr");
  trthead.classList = "thead-dark trthead";
  Total = [];

  for (i = 0; i < onlyitems.length; i++) {
    if (onlyitems[i]) {
      //  console.log(onlyitems[i]);
      Total.push({ Name: onlyitems[i].trim(), Amount: 0 });
    }
  }
  //console.log(dataAndAmount);
  dataAndAmount.forEach((el) => {
    // console.log(el);

    let index = Total.findIndex((i) => i.Name == el.Name);
    //console.log(index)
    if (Total[index].Amount == 0) {
      Total[index].Amount = Total[index].Amount + el.Amount;
    } else {
      Total[index].Amount = Total[index].Amount + el.Amount;
    }
  });

  let TotalNet = 0;
  let TSave = 0;

  let content2;
  let Chargesdiv;

  Total.forEach((el) => {
    Chargesdiv = document.createElement("tr");
    Chargesdiv.classList = "trCharge";
    //console.log(el.Name)
    if (
      el.Name === "Transportation Charges" ||
      el.Name === "Discount" ||
      el.Name === "Ship & Save"
    ) {
      TotalNet = TotalNet + el.Amount;

      content2 = `  <td class="Ch"> <p class="cha">${el.Name}  </p> </td>
                    <td class="ChAmount align-end"> <p class="cha align-end"> ${addCommas(
                      Number(el.Amount).toFixed(2)
                    )} </p> </td> `;

      Chargesdiv.innerHTML = content2;
      tbody1.append(Chargesdiv);
      if (el.Name === "Ship & Save" || el.Name === "Discount") {
        TSave = TSave + el.Amount;
      }
    }
    //console.log(Chargesdiv);
  });
  Chargesdiv = document.createElement("tr");
  Chargesdiv.classList = "trCharge";
  const content3 = `<td class="ChTotalNet"> <p class="chaTotalNet"> Net Transportation Charges </p> </td>
                    <td><p class="TotalNet" > ${addCommas(
                      Number(TotalNet).toFixed(2)
                    )} </p> </td> <br>`;

  Chargesdiv.innerHTML = content3;
  tbody1.append(Chargesdiv);
  let SubTotalNet = 0;

  Total.forEach((el) => {
    Chargesdiv = document.createElement("tr");
    Chargesdiv.classList = "trCharge";

    if (
      el.Name != "Transportation Charges" &&
      el.Name != "Discount" &&
      el.Name != "Ship & Save"
    ) {
      SubTotalNet = SubTotalNet + el.Amount;
      //console.log(el)
      content2 = `  <td class="Ch"> <p class="cha">${el.Name}  </p> </td>
                    <td class="ChAmount align-end"> <p class="cha align-end"> ${addCommas(
                      Number(el.Amount).toFixed(2)
                    )} </p> </td> `;

      Chargesdiv.innerHTML = content2;
      tbody1.append(Chargesdiv);
    
    }
    //  console.log(Chargesdiv);
  });
  Chargesdiv = document.createElement("tr");
  Chargesdiv.classList = "trCharge";

  SubTotalNet = SubTotalNet + TotalNet;
  //for (i = 0; i < 1; i++) {
  const content4 = `<td class="ChSubtotal"> <p class="TotaldeSubtotal"> Subtotal </p> </td>
  <td><p class="SubtotalN" > ${addCommas(
    Number(SubTotalNet).toFixed(2)
  )} </p> </td> <br>`;
  
  Chargesdiv.innerHTML = content4;
  tbody1.append(Chargesdiv);

  const h3t = document.createElement("h3");
  h3t.classList.add("h3t");

  h3t.innerHTML = `USD ${addCommas(Number(SubTotalNet).toFixed(2))}`;
  divtOTAL.append(h3t);

  const h3 = document.createElement("h3");
  h3.classList.add("h3");

  h3.innerHTML = `You saved $${addCommas(
    Number(Math.abs(TSave).toFixed(2))
  )} in this billing period!`;
  divSave.append(h3);

  let content1;
  const unionconst = [];
  unionconst.push(
    "Ship Date",
    "Payor",
    "Reference",
    "Air Waybill",
    "Service/Pak",
    "Orig/Dest",
    "Pieces",
    "Weight",
    "Delivered",
    "Signed by",
    "SENDER",
    "RECIPIENT",
    "Subtotal"
  );

  for (i = 0; i < onlyitems.length; i++) {
    if (!unionconst) {
      unionconst.push(`${onlyitems[i].trim()}`);
    } else {
      unionconst.push(`${onlyitems[i].trim()}`);
    }
  }

  for (i = 0; i < unionconst.length; i++) {
    if (!content1) {
      content1 = `<th scope=col> ${unionconst[i]} </th>  `;
    } else {
      content1 = `${content1} <th scope=col> ${unionconst[i]} </th>`;
    }
    trthead.innerHTML = `${content1} `;
    thead.append(trthead);
  }

  data.forEach((el) => {
    const tr = document.createElement("tr");
    tr.classList.add("trlist");

    const Subtotal = el.OriginCurrency + " " + el.NetCharges;
    const Weight = el.RatedWeight + " " + el.CustomerPreferredWeightType;

    const content = `
       <td class=desc> <p class=title>${convertDateFormat(
         el.Shipdate
       )}</p> </td >
       <td class=desc> <p class=title>${el.PaymentTypeDescription}</p> </td>
       <td class=desc> <p class=title>${el.Reference}</p> </td>
       <td class=desc> <p class=title>${el.AWBnumber}</p> </td>
       <td class=desc> <p class=title>${el.ServicePakDescription}</p> </td>
       <td class=desc> <p class=title> ${el.RouteRoutecodeINOUT} </p> </td>
       <td class=desc> <p class=title>${el.Piecescount}</p> </td>
       <td class=desc> <p class=title> ${Weight} </p> </td>
       <td class=desc> <p class=title>${convertDateFormat(el.PODdate)} ${
      el.PODtime
    }</p> </td>
       <td class=desc> <p class=title>${el.linePodConsigneesignature}</p> </td>
       <td class=desc> <p class=title>${el.Shippername}  ${
      el.Shippercompanyname
    } ${el.ShipperAddress1} ${el.ShipperAddress2} ${el.ShipperCity} ${
      el.Shipperstatecode
    } ${el.Shipperpostalcode} ${el.Shippercountrycode}</p> </td>
       <td class=desc> <p class=title>${el.Consigneename} ${
      el.Consigneecompanyname
    } ${el.Consigneeaddress1} ${el.Consigneeaddress2} ${el.ConsigneeCity} ${
      el.Consigneestatecode
    } ${el.Consigneepostalcode} ${el.Consigneecountrycode}</p> </td>
       <td class=desc> <p class=title>${Subtotal}</p></td>
      `;
    tr.innerHTML = content;
    tbody.append(tr);
  });

  /******************************** */
  const pdatepay = document.querySelector(".pdatepay");
  const datepay = document.createElement("h5");
  datepay.classList = "datepay";
  pdatepay.innerHTML = "";

  let f = new Date(convertDateFormat(InvoiceDate));
  f.setDate(f.getDate() + 15);
  DatePay = convertDateFormat(f);

  datepay.innerHTML = `Payment due date: ${DatePay}`;
  pdatepay.append(datepay);

  /************************************** */

  const trinfopay = document.createElement("tr");
  trinfopay.classList.add("trinfopay");

  const content5 = ` <td class=tdpay> <p class=ppay>${Invoicenumber}</p> </td >
    <td class=tdpay> <p class=ppay>${Accountnumber}</p> </td >
    <td class=tdpay tpay> <p class=ppay>USD   $${addCommas(
      Math.abs(SubTotalNet).toFixed(2)
    )} </p> </td >
    <td class=tdpay> <p class=ppay> 0.00 </p> </td >
    `;

  trinfopay.innerHTML = content5;
  tbody2.append(trinfopay);
  element.classList.remove("visually-hidden");
}
