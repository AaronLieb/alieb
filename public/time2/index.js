$(document).ready(main());

function main() {
  $(".select").each(function(){
    $(this).wrap("<span class='select-wrapper'></span>");
    $(this).after("<span class='holder'></span>");
  });
  $(".select").change(function(){
    var selectedOption = $(this).find(":selected").text();
    $(this).next(".holder").text(selectedOption);
  }).trigger('change');
}

function copyText() {
  console.log("Text Copied");
  $(".output").select()
  document.execCommand("copy");
  $(".output").empty();
  $(".popup").show().delay(300).fadeOut(700);
}

function timeToSeconds(t) {
    var t1a = t.split(":");
    var seconds = 0;
    for (let i in t1a) {
        seconds += t1a[i] * (60 ** (t1a.length - 1 - i))
    }
    return seconds
}

function timeToMinutes(t) {
    var hours = Math.floor(t / 3600)
    var decimal = 100
    if (hours > 0) {
        decimal = 1
    }
    var minutes = Math.floor((t - (hours * 3600)) / 60)
    var seconds = Math.round(((t - (hours * 3600 + minutes * 60))) * decimal) / decimal
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    if (hours > 0) {
        return (hours + ":" + minutes + ":" + seconds)
    } else {
        return (minutes + ":" + seconds)
    }
}

function linearConvert(d1, t1, d2) {
    return timeToMinutes((d2 / d1) * timeToSeconds(t1))
}

function convert(d1, t1, d2) {
    return timeToMinutes(timeToSeconds(t1) * (d2 / d1) ** 1.06)
}

function toMeters(str) {
    str = str.toLowerCase()
    str = str.replace(/\s/g, '');
    var reg = /[a-r-t-z]+/
    var reg2 = /[^a-z]+/
    let unit = reg.exec(str)
    if (unit == null) {
        unit = "m"
    }
    let num = reg2.exec(str)
    let dict = {
        mile: 1609.34,
        mi: 1609.34,
        m: 1,
        meter: 1,
        kilometer: 1000,
        km: 1000,
        k: 1000,
        y: 0.9144,
        yard: 0.9144
    }
    let meterDistance = dict[unit]
    return num * meterDistance
}

function calculate() {
    let d1 = toMeters(document.getElementById("distance1").value)
    let t1 = document.getElementById("time1").value
    let d2 = toMeters(document.getElementById("distance2").value)
    let t2 = document.getElementById("time2")
    let pace = /*document.getElementById("pace")*/ false;
    let result = "Error"
    if (pace.value == "true") {
        result = convert(d1, t1, d2)
    } else {
        result = linearConvert(d1, t1, d2)
    }
    t2.value = result
}
