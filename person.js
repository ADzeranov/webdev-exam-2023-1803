const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/";
const apiKey = "efb5278c-38e4-443f-8f89-4542d6349c80";
let allData;


const holidays = [                                              //Праздники
    "01-01",
    "02-23",
    "03-08",
    "05-09",
    "09-01",
    "06-12",
    "05-01",
];

function showAlert(error, color) {                              //Уведомления
    let alerts = document.querySelector(".alerts");
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-dismissible", color);
    alert.setAttribute("role", "alert");
    alert.append(error);
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn-close");
    alert.classList.add("position-sticky");
    alert.classList.add("end-50");
    alert.classList.add("my-0");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
    alert.append(btn);
    alerts.append(alert);
    setTimeout(() => alert.remove(), 4000);
}

async function nameOfRoute(idRoute) {                      //Узнать название маршрута
    let nUrl = new URL(url + "routes/" + idRoute);
    nUrl.searchParams.append("api_key", apiKey);
    let nameRoute = "";
    try {
        let response = await fetch(nUrl);
        let route = await response.json();
        nameRoute = route.name;
    } catch (error) {
        console.log(error.message);
    }
    return nameRoute;
}

async function nameOfGuide(idGuide) {                       //Узнать ФИО гида
    let nUrl = new URL(url + "guides/" + idGuide);
    nUrl.searchParams.append("api_key", apiKey);
    let nameGuide = "";
    try {
        let response = await fetch(nUrl);
        let guide = await response.json();
        document.querySelector(".table-routes").setAttribute("data-pricePerHour", guide.pricePerHour);
        nameGuide = guide.name;
    } catch (error) {
        console.log(error.message);
    }
    return nameGuide;
}

function clickOnTrash(event) {                                   //Открытие модального окна удаления заявки
    if (!event.target.classList.contains("bi-trash-fill")) return;
    let idTask = event.target.parentNode.parentNode.id;
    document.querySelector(".delete").setAttribute("data-task-id", idTask);
}

function clickOnEye(event) {                                     //Открытие модального окна просмотра заявки
    if (!event.target.classList.contains("bi-eye-fill")) return;
    let modal = document.querySelector("#showTask");
    modal.querySelector("#exampleModalLabel").textContent = "Заявка номер " + event.target.parentNode.parentNode.id;

    let guideId = event.target.parentNode.parentNode.getAttribute("data-guide-id");
    let guideFio = modal.querySelector("#name");
    nameOfGuide(guideId).then((response) => guideFio.value = response);

    let routeName = modal.querySelector("#route");
    routeName.value = event.target.parentNode.parentNode.children[1].textContent;

    let date = modal.querySelector("#date");
    date.setAttribute("readonly", "");
    let strDate = event.target.parentNode.parentNode.children[2].textContent.split(".");
    let trueDate = new Date(strDate[2] + "-" + strDate[1] + "-" + strDate[0]);
    date.value = trueDate.toJSON().slice(0, 10);

    let time = modal.querySelector("#time");
    time.setAttribute("readonly", "");
    let timeRoute = event.target.parentNode.parentNode.getAttribute("data-time");
    time.value = timeRoute;

    let duration = modal.querySelector("#selectLength");
    duration.setAttribute("disabled", "");
    let durationRoute = event.target.parentNode.parentNode.getAttribute("data-duration");
    duration.value = durationRoute;

    let personsRange = modal.querySelector("#customRange2");
    personsRange.setAttribute("readonly", "");
    personsRange.setAttribute("disabled", "");

    let personsText = modal.querySelector("#number-people");
    personsText.setAttribute("readonly", "");
    personsText.setAttribute("disabled", "");
    let persons = event.target.parentNode.parentNode.getAttribute("data-persons");
    personsRange.value = persons;
    personsText.value = persons;

    let options = modal.querySelector(".options");
    options.innerHTML = "";
    options.textContent = "Дополнительные опции: ";
    let switches = modal.querySelectorAll(".form-switch");
    for (let swit of switches) {
        swit.innerHTML = "";
    }
    let option1 = document.createElement("input");
    option1.setAttribute("type", "text");
    option1.classList.add("form-control-plaintext");
    option1.setAttribute("readonly", "");
    option1.value = "Быстрый выезд гида (в течение часа). Повышает стоимость на 30%";
    let routeOptionF = event.target.parentNode.parentNode.getAttribute("data-option1");
    if (routeOptionF == "true") options.append(option1);

    let option2 = document.createElement("textarea");
    option2.setAttribute("type", "text");
    option2.classList.add("form-control-plaintext");
    option2.setAttribute("readonly", "");
    option2.value = "Тематические сувениры для посетителей (+500 рублей за каждого посетителя)";
    let routeOptionS = event.target.parentNode.parentNode.getAttribute("data-option2");
    if (routeOptionS == "true") options.append(option2);

    let price = modal.querySelector("#price");
    let priceRoute = event.target.parentNode.parentNode.children[3].textContent;
    price.value = priceRoute;
    modal.querySelector(".back-btn").classList.add("d-none");
    let createBtn = modal.querySelector(".create-btn");
    createBtn.setAttribute("data-bs-dismiss", "modal");
    createBtn.classList.remove("create-change-task");
    createBtn.textContent = "Готово";
}

function numberOfVisitors() {                              //Количество человек
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    let plus = 0;
    if (number <= 5) plus = 0;
    else if ((number > 5) && (number <= 10)) plus = 1000;
    else if ((number > 10) && (number <= 20)) plus = 1500;
    return plus;
}

function isThisDayOff() {                                  //Праздничный или выходной день
    let form = document.querySelector("#create-task-form");
    let isHoliday = new Date(form.elements["date"].value);
    let YearMonthDay = isHoliday.toJSON().slice(0, 10).split("-");
    let MonthDay = YearMonthDay[1] + "-" + YearMonthDay[2];
    let plus = 1;
    if ((isHoliday.getDay() == 0) || (isHoliday.getDay() == 6) || (holidays.includes(MonthDay))) {
        plus = 1.5;
    }
    return plus;
}

function isItMorningOrEvening() {                          //Время дня
    let form = document.querySelector("#create-task-form");
    let time = parseInt(form.elements["time"].value.split(":")[0]);
    let plus = 0;
    if ((time >= 9) && (time < 12)) plus = 400;
    else if ((time >= 20) && (time <= 23)) plus = 1000;
    return plus;
}

function hoursNumber() {                                  //Количество часов
    let form = document.querySelector("#create-task-form");
    let hours = form.elements["selectLength"].value;
    return hours;
}

function checkOptionFirst() {                             //Выбор первой опции
    let option = document.querySelector("#option1");
    let price = 1;
    if (option.checked) {
        price = 1.3;
    }
    return price;
}

function checkOptionSecond() {                            //Выбор второй опции
    let option = document.querySelector("#option2");
    let price = 0;
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    if (option.checked) {
        price = 500 * number;
    }
    return price;
}

function guideServiceCost() {                           //Стоимость гида в час
    let price = document.querySelector(".table-routes").getAttribute("data-pricePerHour");
    return price;
}

function changeTotalPrice(event) {                      //Изменение стоимости заявки
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

function changeTotalPriceForPersons(event) {            //Измение поля количества человек
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}
