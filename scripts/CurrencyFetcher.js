export function getExchangeRates() {
  var xhttp = new XMLHttpRequest();

  // xhttp.onreadystatechange = parseCurrencies;

  xhttp.open(
    "GET",
    // "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
    "https://devweb2019.cis.strath.ac.uk/~aes02112/ecbxml.php",
    false
  );
  xhttp.send();
  return parseCurrencies.bind(xhttp)();
}

function parseCurrencies() {
  if (this.readyState == 4 && this.status == 200) {
    let xmlDoc = this.responseXML;
    let childNodes = xmlDoc.getElementsByTagName("Cube")[1].childNodes;
    let childNodeList = [];
    let childNode;
    for (childNode of childNodes) {
      childNodeList.push(childNode);
    }
    childNodes = childNodeList.filter(element => element.nodeName === "Cube");
    let currencies = childNodes.map(element => {
      let currency = {};
      currency.name = element.getAttribute("currency");
      currency.rate = element.getAttribute("rate");
      return currency;
    });
    currencies.push({ name: "EUR", rate: "1.0" });
    console.log(currencies);
    return currencies;
  }
}
