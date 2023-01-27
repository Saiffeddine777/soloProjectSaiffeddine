
var clients = []
var suppliers = []

var Client = function (name) {
    var obj = {}
    obj.name = name;
    obj.amount = 0;
    obj.increase = increase;
}

var increase = function (n) {
    this.amount += n
}

var Supplier = function (name) {
    var obj = {}
    obj.name = name;
    obj.amountS = 0;
    obj.increaseS = increaseS;
}
var increaseS = function (n) {
    this.amountS += n
}

//selecting a type of entry(supplier or client)
$('#newinvbutton').on("click", function () {
    $("#selectinv").show()
})

$('#selectinv').change(function () {
    if (($('#selectinv').val()) === "Supplies invoice") {
        $("#suppliername").show()
        $("#clientname").hide()
    }
})

$('#selectinv').change(function () {
    if (($('#selectinv').val()) === "Sales invoice") {
        $("#clientname").show()
        $("#suppliername").hide()
    }
})

$('#selectinv').change(function () {
    if (($('#selectinv').val()) === "Select an option") {
        $("#suppliername").hide()
        $("#clientname").hide()
    }
})
//---------------------------------------------------------

function createSupplier() {
    var S = Supplier($('#suppliername').val())
    suppliers.push(S)
    alert("we have added a new supplier")
}

function createClient() {
    var C = Client($('#clientname').val());
    clients.push(C)
    alert("we have added a new client")
}


// making an entry of client
$('#clientname').on('keypress', function (e) {
    if (e.which == 13) {
        $('.invbody').show()
        for (var i = 0; i < clients.length; i++) {
            if ($('#clientname').val() === clients[i].name) {
                $('.invbody').prepend($("<p class = 'message'>this client already exist</p>"))
            }
            else {
                return createClient()
            }
        }
        $('#invclient').show()
        $('#invsupplier').hide()
    }
})
// making an entry of supplier


$('#suppliername').on('keypress', function (e) {
    if (e.which == 13) {
        $('.invbody').show()
        for (var j = 0; j < clients.length; j++) {
            if ($('#suppliername').val() === suppliers[j].name) {
                alert("this supplier already exist</p>")
            }
            else {
                return createSupplier()
            }
        }
        $('#invclient').hide()
        $('#invsupplier').show()
    }
})

// article entries of clients
var i = 0
$("#addarticle").on("click", function () {
    $('table').append("<tr id ='setting" + i + "'><td><input type ='text' id= 'a" + i + "' class ='article'  ></td><td><input type ='text' id='up" + i + "' class ='unitprice' value= 0 ></td><td><input type ='text' id='q" + i + "' class ='quantity' value= 0></td><td><input type ='text' id='vat" + i + "' class ='vat' value= 0></td><td><input type ='text' id='tot" + i + "' class ='totalbyproduct' value = 0></td></tr>")
    i++
})

var x = 0
$("#addarticles").on("click", function () {
    $('table').append("<tr id ='settings" + x + "'><td><input type ='text' id= 'as" + x + "' class ='article' ></td><td><input type ='text' id='ups" + x + "' class ='unitprice' value= 0 ></td><td><input type ='text' id='qs" + x + "' class ='quantity' value= 0></td><td><input type ='text' id='vats" + x + "' class ='vat' value= 0></td><td><input type ='text' id='tots" + x + "' class ='totalbyproduct' value = 0></td></tr>")
    x++
})

//calculate the value of the invoice clients
$("#geninvbtn").on("click", function () {
    var total = 0
    for (var s = 0; s < i; s++) {
        $(`#tot${s}`).val(($(`#up${s}`).val()) * 1 * ($(`#q${s}`).val()) * 1 * ($(`#vat${s}`).val()) * 1) 
        total += ($(`#tot${s}`).val());
    }
    $("#invvalue").text(total) 
    for (var y = 0; y < clients.length; y++) {
        if (clients[y].name === $('#clientname')) {
            clients[y].increase(total)
        }
    }
})
//calculate the value of the invoice suppliers
$("#geninvbtns").on("click", function () {
    var totals = 0
    for (var r = 0; r < x; r++) {
        $(`#tots${r}`).val(($(`#ups${r}`).val()) * 1 * ($(`#qs${r}`).val()) * 1 * ($(`#vats${r}`).val()) * 1) 
        totals  += ($(`#tots${r}`).val()); 
    }
    $("#invvalues").text(totals) 
    for (var o = 0; o < suppliers.length; o++) {
        if (suppliers[o].name === $('#clientname')) {
            suppliers[o].increaseS(totals)
        }
    }
})

$("#genclist").click(function () {
    for (var k = 0; k < clients; k++) {
        $("listofclients").append(`<li>${clients[k].name}with an amount of ${clients[k].amount}</li>`)
    }
})
$("#genslist").click(function () {
    for (var l = 0; l < suppliers; l++) {
        $("#listofsuppliers").append(`<li>${suppliers[l].name}with an amount of ${suppliers[l].amount}</li>`)
    }
})

//calculate balance
//balance equals (revenue of client - spending on suppliers)
function totalRevenue(array) {
    var total = 0
    for (var m = 0; m < array; m++) {
        total += array[m].amount
    }
    return total
}

function totalSpending(array) {
    var total = 0
    for (var n = 0; n < array; n++) {
        total += array[n].amount
    }
    return total
}

function balanceB(array1, array2) {
    return totalRevenue(array1) - totalSpending(array2)
}
$("#calculatebtn").on('click', function () {
    $("#balance").val(balanceB(clients, suppliers)) 
})

//most lucrative client

$("bestclientbtn").on("click",function(){
    var temp 
    var max = clients[0].amount
    for(var p = 0;p<clients.length;p++){
        if(clients[p].amount > max){
            clients[p].amount = max
            temp = client[p].name
        }
    }
    alert ("your most lucrative client is "+ temp)
})

