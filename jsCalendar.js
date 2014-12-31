var gMonthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

function BuildCalendar(calendarID){
	var calendar = document.getElementById(calendarID);
	calendar.innerHTML = ""	
			
	var table = document.createElement("table");	
		
	table.appendChild(BuildCalendarDayHeader(calendarID));
		
	for(var row = 1; row <= 6; ++row){			
		var tr = document.createElement("tr"); 
		for(var column = 1; column <= 7; ++column){				
			var td = document.createElement("td"); 
			td.setAttribute("id", calendarID + "_" + row.toString() + "_" + column.toString());
			td.setAttribute("class", "tdCalDay");
			td.setAttribute("onclick", "CalendarCellClick(this.id);"); 
			tr.appendChild(td);
		}
		table.appendChild(tr); 
	}
	calendar.appendChild(CreateDateTitle(calendarID));
	calendar.appendChild(table);
	var today = new Date(); 	
	
	UpdateCalendar(calendarID, today.getFullYear(), today.getMonth(), today.getDate()); 
}

function CalendarCellClick(cellID){
	var thisCell = document.getElementById(cellID);	
	var calendarID = cellID.split("_")[0];
	
	var year = $("#" + calendarID + "_TitleYear")[0].innerHTML; 
	var month = $("#" + calendarID + "_TitleMonth")[0].innerHTML; 
	
	for(var i = 0; i < gMonthNames.length; ++i){
		if(gMonthNames[i] == month){
			month = i; 
			break;
		}
	}
	
	var rowNum = cellID.split("_")[1];	
	var day = thisCell.innerHTML;
	var lastMonth = false;
	var nextMonth = false;
	"CellNotThisMonth"
	"tdCalDay"
	var previousSelectedCell = $("#" + calendarID + " .tdSelected")[0];
	if(previousSelectedCell != null){
		var previousSelectedCellClasses = previousSelectedCell.className.split(" "); 
		previousSelectedCell.className = "";
		for(var i = 0; i < previousSelectedCellClasses.length; ++i){		
			if(previousSelectedCellClasses[i] != "tdSelected"){
				previousSelectedCell.className += previousSelectedCellClasses[i] + " "; 			
			}			
		}
	}	
		
	var thisCellClasses = thisCell.className.split(" ");
	for(var i = 0; i < thisCellClasses.length; ++i){
		if(thisCellClasses[i] == "CellNotThisMonth"){				
			if(rowNum == 1){
				lastMonth = true;
				break;
			}
			if(rowNum = 6){
				nextMonth = true;
				break;
			}
		}
	}
		
	if(!lastMonth && !nextMonth){
		UpdateDateTitle(calendarID, year, month, day);
		thisCell.className += " tdSelected";
	}
	else{
		if(lastMonth)
			month -= 1; 
		if(nextMonth)
			month += 1;
		UpdateCalendar(calendarID, year, month, day);	
	}
}

function BuildCalendarDayHeader(calendarID){
	var tableHeader = document.createElement("tr");
	
	var tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Su"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
		
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Mo"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
	
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Tu"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
	
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "We"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
	
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Th"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
	
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Fr"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell); 
	
	tableHeaderCell = document.createElement("td");
	tableHeaderCell.innerHTML = "Sa"; 
	tableHeaderCell.className = "tdCalDayHead";
	tableHeader.appendChild(tableHeaderCell);
	
	return tableHeader;
}

function CreateDateTitle(calendarID){
	var divTitle = document.createElement("div"); 
	divTitle.setAttribute("id", calendarID + "_CalendarTitle"); 
	divTitle.setAttribute("class", "calDateTitle");
	var divYear = document.createElement("div");
	divYear.setAttribute("id", calendarID + "_TitleYear");
	divYear.setAttribute("class", "calDateTitleData"); 
	var divMonth = document.createElement("div");
	divMonth.setAttribute("id", calendarID + "_TitleMonth");
	divMonth.setAttribute("class", "calDateTitleData"); 
	var divDay = document.createElement("div");
	divDay.setAttribute("id", calendarID + "_TitleDay");
	divDay.setAttribute("class", "calDateTitleData"); 
	
	var divLastMonth = document.createElement("div");
	divLastMonth.setAttribute("id", calendarID + "_LastMonthButton");
	divLastMonth.setAttribute("class", "calMonthNavigation");
	divLastMonth.setAttribute("onclick", "MonthNavClick(this.id);");
	divLastMonth.innerHTML = "<"; 
	var divNextMonth = document.createElement("div");
	divNextMonth.setAttribute("id", calendarID + "_NextMonthButton");
	divNextMonth.setAttribute("class", "calMonthNavigation");
	divNextMonth.setAttribute("onclick", "MonthNavClick(this.id);"); 
	divNextMonth.innerHTML = ">";
	
	
		
	divTitle.appendChild(divLastMonth);
	divTitle.appendChild(divMonth);
	divTitle.appendChild(divDay);
	divTitle.appendChild(divYear);
	divTitle.appendChild(divNextMonth);
	return divTitle;
}

function MonthNavClick(buttonID){
	var calendarID = buttonID.split("_")[0];
	var direction = (buttonID.split("_")[1] == "NextMonthButton" ? 1 : -1); 
	
	var year = $("#" + calendarID + "_TitleYear")[0].innerHTML; 
	var month = $("#" + calendarID + "_TitleMonth")[0].innerHTML; 
	var day =  $("#" + calendarID + "_TitleDay")[0].innerHTML; 
	
	for(var i = 0; i < gMonthNames.length; ++i){
		if(gMonthNames[i] == month){
			month = i; 
			break;
		}
	}
	
	var newDate = new Date(year, (month + 1) + direction, 0);
	var numDaysInNewMonth = newDate.getDate();
	
	day = (day > numDaysInNewMonth ? numDaysInNewMonth : day); 
	
	UpdateCalendar(calendarID, newDate.getFullYear(), newDate.getMonth(), day);	
}


function UpdateDateTitle(calendarID, year, month, day){
	var lblYear = document.getElementById(calendarID + "_TitleYear");
	var lblMonth = document.getElementById(calendarID + "_TitleMonth");
	var lblDay = document.getElementById(calendarID + "_TitleDay");
	
	lblYear.innerHTML = year;
	lblMonth.innerHTML = gMonthNames[month];
	lblDay.innerHTML = day;
}

function UpdateCalendar(calendarID, year, month, day){			
	if(month == -1){
		year = parseInt(year) - 1;
		month = 11; 
	}
	else if(month == 12){
		year = parseInt(year) + 1; 
		month = 0;
	}
	
	var yearOfPreviousMonth = year; 
	var previousMonth = month - 1;	
	if(previousMonth == -1){
		previousMonth = 12;
		yearOfPreviousMonth -= 1; 
	}
	
	UpdateDateTitle(calendarID, year, month, day); //Selected date
	
	var now = new Date();
	var monthIsCurrent = (now.getMonth() == month && year == now.getFullYear());
	var today = now.getDate();
	
	var dayOfWeekOfFirst = (new Date(year, month, 1).getDay()) + 1;
	var daysInMonth = new Date(year, month + 1, 0).getDate();		
	var daysInPreviousMonth = new Date(yearOfPreviousMonth, previousMonth + 1, 0).getDate(); 			
	var lastMonth = true;	
	var nextMonth = false;	
	var lastMonthDaysToRep = dayOfWeekOfFirst - 1;	
		
	
	if(lastMonthDaysToRep == 0)
		lastMonthDaysToRep = 7; 	
	var lastMonthStartingPoint = (daysInPreviousMonth) - (lastMonthDaysToRep - 1);	
	var numDaysAdded = 0; 	
	for(var row = 1; row <= 6; ++row){			
		for(var column = 1; column <= 7; ++column){			
			var cellValue; 
			var cellClass = "";
			if(lastMonth){
				cellClass = "CellNotThisMonth";
				cellValue = lastMonthStartingPoint + numDaysAdded; 
			}			
			else{			
				cellValue = numDaysAdded + 1;			
				if (nextMonth)
					cellClass = "CellNotThisMonth";
				else{
					cellClass = "tdCalDay";
					if((numDaysAdded + 1) == day){
						cellClass += " tdSelected";
					}
					if(monthIsCurrent && (numDaysAdded + 1) == today){
						cellClass += " tdToday";
					}
				}
			}
					
			var cell = document.getElementById(calendarID + "_" + row.toString() + "_" + column.toString());
			cell.className = cellClass;
			cell.innerHTML = cellValue; 			
			++numDaysAdded; 
			if(lastMonth && numDaysAdded == lastMonthDaysToRep){
				lastMonth = false;				
				numDaysAdded = 0;
			}
			else if(numDaysAdded == daysInMonth){	
				nextMonth = true;
				numDaysAdded = 0; 
			}			
		}			
	}
}

