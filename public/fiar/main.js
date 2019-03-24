$(document).ready(function() {
  updateGrid()
});

function updateGrid() {
  let rows = Math.sqrt($("div.gridlet").length);
  let divSize = 300/rows + "px"
  let outlineSize = 0.0625*4/(rows**2) + "em solid"
  $("div.gridlet").css("width",divSize).css("height",divSize).css("outline",outlineSize)
  console.log("rows: " + rows + " size: " + divSize, " outline: " + outlineSize)
  $("div.gridlet").click(function() {
    $(this).css("background-color","red");
  })
  $()
}

function incSize() {
  let ele = "<div class='gridlet'></div>"
  let size = Math.sqrt($("div.gridlet").length);
  let add = (size+1)**2-((size)**2)
  console.log("add: " + add)
  for (let i = 0;i<add;i++) {
    $('div.grid').append(ele)
  }
  updateGrid()

}
