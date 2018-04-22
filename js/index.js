var oLi = document.getElementById("prolist").getElementsByTagName("li");
var oDiv = document.getElementById("cartwrap");
var tBody = document.getElementById("tbody");
var trs = tBody.getElementsByTagName("tr");
var sum = 0;

var proitem;
for(var i=0;i<oLi.length;i++){
	oLi[i].ondragstart = function () {
		proitem = this;
	}
}
oDiv.ondragover = function (ev) {
	var ev = ev||window.ev;
	ev.preventDefault();
}
//根据商品id找到其名称和单价
var getProName = function (id) {
	for(var x=0;x<oLi.length;x++){
		if(id==oLi[x].dataset.id){
			return oLi[x].children[1].children[0].innerHTML;
		}
	}
}
var getProPrice = function (id) {
	for(var y=0;y<oLi.length;y++){
		if(id==oLi[y].dataset.id){
			return oLi[y].children[1].children[1].children[0].innerHTML;
		}
	}
}
oDiv.ondrop = function () {
	var dragEleId = proitem.dataset.id; //商品id
	// 找有没有重复的
	var repeatnum = -1;
	for(var j=0;j<trs.length;j++){
		if(dragEleId==trs[j].dataset.id){
			repeatnum = j;
			break;
		}
	}
	if(repeatnum==-1){
		var td01 = document.createElement("td"),
			td02 = document.createElement("td"),
			td03 = document.createElement("td"),
			tr = document.createElement("tr");
		td01.classList.add('td01');
		td02.classList.add('td02');
		td03.classList.add('td03');
		td01.innerHTML = getProName(dragEleId);
		td02.innerHTML = 1;
		td03.innerHTML = getProPrice(dragEleId);
		tr.appendChild(td01);
		tr.appendChild(td02);
		tr.appendChild(td03);
		tr.dataset.id = dragEleId;
		tBody.insertBefore(tr,tBody.children[0]);
		sum += parseFloat(td03.innerHTML);
	}
	else {
		//数量自增一，金额为单价*数量
		trs[repeatnum].children[1].innerHTML++;
		trs[repeatnum].children[2].innerHTML = (getProPrice(dragEleId)*trs[repeatnum].children[1].innerHTML).toFixed(1);
		sum += parseFloat(getProPrice(dragEleId));
	}
	trs[trs.length-1].children[1].innerHTML = sum;
}

