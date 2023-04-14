const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/";
const apiKey = "c67f2277-7aed-4821-a074-2fc510e2aae2";
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
//функция showAlert создает уведомление на странице с заданным текстом сообщения об ошибке и цветом фона уведомления.
function showAlert(error, color) {                              //Уведомления
    let alerts = document.querySelector(".alerts");
    let alert = document.createElement("div");
//Создает новый элемент div с классами "alert", "alert-dismissible" и заданным цветом фона. Затем добавляет сообщение об ошибке внутрь этого элемента.
    alert.classList.add("alert", "alert-dismissible", color);
    alert.setAttribute("role", "alert");
    alert.append(error);
//Далее, функция создает кнопку для закрытия уведомления, устанавливает необходимые атрибуты, и добавляет ее внутрь элемента уведомления.
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn-close");
    alert.classList.add("position-sticky");
    alert.classList.add("end-50");
    alert.classList.add("my-0");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
//Затем, функция добавляет созданный элемент уведомления в контейнер на странице с классом "alerts
    alert.append(btn);
    alerts.append(alert);
//Наконец, функция устанавливает таймер на удаление созданного элемента уведомления через 4 секунды.
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

// функция отправляет асинхронный GET-запрос на сервер, чтобы получить информацию о конкретном гиде по его идентификатору (idGuide).
//Для этого формируется URL-адрес и добавляется API-ключ, затем выполняется запрос fetch().
//Если запрос выполнен успешно, функция извлекает ФИО гида из ответа в формате JSON и возвращает его.
//Если запрос не выполнен успешно, функция логирует сообщение об ошибке в консоль и возвращает пустую строку.
//Функция также устанавливает атрибут "data-pricePerHour" у таблицы маршрутов, чтобы сохранить цену за час работы гида.
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

//Функция clickOnTrash обрабатывает событие клика на иконку корзины в строке таблицы задач.
//Если иконка была кликнута, то функция получает id задачи из элемента DOM и устанавливает этот id в
//атрибут data-task-id элемента с классом delete,
//который используется для удаления задачи. Если иконка корзины не была кликнута, то функция ничего не делает.
function clickOnTrash(event) {                                   //Открытие модального окна удаления заявки
    if (!event.target.classList.contains("bi-trash-fill")) return;
    let idTask = event.target.parentNode.parentNode.id;
    document.querySelector(".delete").setAttribute("data-task-id", idTask);
}

//clickOnEye открывает модальное окно для просмотра заявки. При этом он заполняет поля формы данными о заявке,
// полученными из разметки таблицы.
//Функция nameOfGuide() вызывается, чтобы получить ФИО гида по его id.
// Эта информация также заполняется в соответствующее поле формы.
//Затем остальные поля заполняются значениями из разметки таблицы,
// а также отключаются для редактирования. Если у заявки есть дополнительные опции, то они отображаются в форме.
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
    option1.value = "Скидка для пенсионеров (25% скидка)";
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

//Метод numberOfVisitors() возвращает значение, зависящее от количества посетителей.
// Если посетителей не более 5, то значение равно 0, если от 6 до 10, то 1000, если от 11 до 20, то 1500.
function numberOfVisitors() {                              //Количество человек
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    let plus = 0;
    if (number <= 5) plus = 0;
    else if ((number > 5) && (number <= 10)) plus = 1000;
    else if ((number > 10) && (number <= 20)) plus = 1500;
    return plus;
}
//Метод isThisDayOff() возвращает значение, зависящее от того, является ли выбранный день праздничным или выходным.
// Если да, то значение равно 1.5, иначе 1.
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
//Метод isItMorningOrEvening() возвращает значение, зависящее от времени суток.
// Если выбранное время находится в диапазоне с 9:00 до 11:59, то значение равно 400, если в диапазоне с 20:00 до 23:59, то 1000.
function isItMorningOrEvening() {                          //Время дня
    let form = document.querySelector("#create-task-form");
    let time = parseInt(form.elements["time"].value.split(":")[0]);
    let plus = 0;
    if ((time >= 9) && (time < 12)) plus = 400;
    else if ((time >= 20) && (time <= 23)) plus = 1000;
    return plus;
}
//Метод hoursNumber() возвращает значение, зависящее от выбранной продолжительности услуги. Значение равно выбранному количеству часов
function hoursNumber() {                                  //Количество часов
    let form = document.querySelector("#create-task-form");
    let hours = form.elements["selectLength"].value;
    return hours;
}
//checkOptionFirst() проверяет, выбрана ли первая опция, и устанавливает цену в зависимости от этого.
function checkOptionFirst() {                    //Выбор первой опции
	let option = document.querySelector("#option1");
	let price = 1;
	if (option.checked) {
			price = 1.3;
	}
	return price;
}
//checkOptionSecond() проверяет, выбрана ли вторая опция, и устанавливает цену в зависимости от этого и от количества посетителей.
function checkOptionSecond() {                   //Выбор второй опции
	let option = document.querySelector("#option2");
	let price = 0;
	let form = document.querySelector("#create-task-form");
	let number = form.elements["customRange2"].value;
	if (option.checked) {
			price = 500 * number;
	}
	return price;
}
//guideServiceCost() возвращает стоимость гида в час.
function guideServiceCost() {                           //Стоимость гида в час
    let price = document.querySelector(".table-routes").getAttribute("data-pricePerHour");
    return price;
}

//changeTotalPrice(event) используется для изменения стоимости заявки в зависимости от выбранных пользователем параметров:
//время гида, количество посетителей, день недели, время суток, выбранные опции.
// Он вызывает другие функции (numberOfVisitors(),
//isThisDayOff(), isItMorningOrEvening(), hoursNumber(), checkOptionFirst(), checkOptionSecond(), guideServiceCost())
// для вычисления стоимости заявки и обновляет значение в соответствующем поле на странице.
function changeTotalPrice(event) {                      //Изменение стоимости заявки
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

//Функция changeTotalPriceForPersons отслеживает изменения поля количества человек и устанавливает соответствующее значение
// в поле "Количество человек".
//Затем она пересчитывает общую стоимость заявки, используя ряд других функций,
// таких как guideServiceCost(), hoursNumber(), isThisDayOff(), isItMorningOrEvening(),
//numberOfVisitors() и checkOptionFirst(). В конечном итоге, функция обновляет значение поля "Стоимость" в форме заявки.
function changeTotalPriceForPersons(event) {            //Измение поля количества человек
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}
// функция clickOnPen открывает модальное окно для редактирования заявки.
// Она получает данные из выбранной заявки и заполняет соответствующие поля модального окна данными из заявки.
// Когда пользователь кликает на иконку карандаша (класс "bi-pencil-square"), функция срабатывает и открывает модальное окно.
function clickOnPen(event) {                            //Открытие модального окна редактирования заявки
    //Проверяется, что иконка карандаша была кликнута (если не была, то функция завершается).
    if (!event.target.classList.contains("bi-pencil-square")) return;
    //Получается ссылка на модальное окно редактирования заявки.
    let modal = document.querySelector("#showTask");
    //В модальном окне изменяется заголовок на "Редактирование заявки".
    modal.querySelector("#exampleModalLabel").textContent = "Редактирование заявки";
    //Получается идентификатор гида из атрибута data-guide-id родительского элемента, содержащего иконку карандаша.
    let guideId = event.target.parentNode.parentNode.getAttribute("data-guide-id");
    //Получается идентификатор заявки из атрибута id родительского элемента, содержащего иконку карандаша.
    let taskId = event.target.parentNode.parentNode.id;
    //Записывается идентификатор заявки в атрибут data-task-id кнопки "Создать".
    modal.querySelector(".create-btn").setAttribute("data-task-id", taskId);
    let guideFio = modal.querySelector("#name");
    let priceHour = document.querySelector(".table-routes");
    //Вызывается функция nameOfGuide() с идентификатором гида в качестве параметра.
		// Эта функция возвращает Promise, который разрешается с ФИО гида. Затем ФИО гида записывается в поле для ввода.
    nameOfGuide(guideId).then((response) => guideFio.value = response);
    //Получается ссылка на поле для ввода названия маршрута и записывается в него название маршрута из соответствующего столбца таблицы.
    let routeName = modal.querySelector("#route");
    routeName.value = event.target.parentNode.parentNode.children[1].textContent;

    //Получается ссылка на поле для ввода даты и время начала экскурсии и заполняются соответствующие поля модального окна.
    let date = modal.querySelector("#date");
    date.removeAttribute("readonly");
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    date.setAttribute("min", newDate.toJSON().slice(0, 10));
    let strDate = event.target.parentNode.parentNode.children[2].textContent.split(".");
    let trueDate = new Date(strDate[2] + "-" + strDate[1] + "-" + strDate[0]);
    date.value = trueDate.toJSON().slice(0, 10);

    //Получается ссылка на поле для ввода длительности экскурсии и заполняется его значение.
    let time = modal.querySelector("#time");
    time.removeAttribute("readonly");
    let timeRoute = event.target.parentNode.parentNode.getAttribute("data-time");
    time.value = timeRoute;

    //Получается ссылка на ползунок для выбора количества посетителей и заполняются соответствующие поля модального окна.
    let duration = modal.querySelector("#selectLength");
    duration.removeAttribute("disabled");
    let durationRoute = event.target.parentNode.parentNode.getAttribute("data-duration");
    duration.value = durationRoute;
    let personsRange = modal.querySelector("#customRange2");
    personsRange.removeAttribute("readonly");
    personsRange.removeAttribute("disabled");
    personsRange.oninput = changeTotalPriceForPersons;
    let personsText = modal.querySelector("#number-people");
    let persons = event.target.parentNode.parentNode.getAttribute("data-persons");
    personsRange.value = persons;
    personsText.value = persons;

    //Создаются и добавляются в модальное окно переключатели для выбора дополнительных опций.
    //Получается ссылка на поле для ввода стоимости экскурсии и заполняется его значение.

    modal.querySelector(".options").innerHTML = "";

    let option1 = modal.querySelector(".form-switch-option1");
    option1.innerHTML = "";
    let switchInput1 = document.createElement("input");
    switchInput1.classList.add("form-check-input");
    switchInput1.setAttribute("type", "checkbox");
    switchInput1.setAttribute("role", "switch");
    switchInput1.setAttribute("id", "option1");
    switchInput1.oninput = changeTotalPrice;
    let switchLabel1 = document.createElement("label");
    switchLabel1.classList.add("form-check-label");
    switchLabel1.setAttribute("for", "option1");
    switchLabel1.textContent = "Использовать скидку для пенсионеров";
    let routeOptionF = event.target.parentNode.parentNode.getAttribute("data-option1");
    if (routeOptionF == "true") {
        switchInput1.checked = true;
        switchInput1.setAttribute("readonly", "");
        switchInput1.setAttribute("disabled", "");
    } else {
        switchInput1.checked = false;
        switchInput1.removeAttribute("readonly");
        switchInput1.removeAttribute("disabled");
    }
    option1.append(switchInput1);
    option1.append(switchLabel1);

    let option2 = modal.querySelector(".form-switch-option2");
    option2.innerHTML = "";
    let switchInput2 = document.createElement("input");
    switchInput2.classList.add("form-check-input");
    switchInput2.setAttribute("type", "checkbox");
    switchInput2.setAttribute("role", "switch");
    switchInput2.setAttribute("id", "option2");
    switchInput2.oninput = changeTotalPrice;
    let switchLabel2 = document.createElement("label");
    switchLabel2.classList.add("form-check-label");
    switchLabel2.setAttribute("for", "option2");
    switchLabel2.textContent = "Тематические сувениры для посетителей";
    let routeOptionS = event.target.parentNode.parentNode.getAttribute("data-option2");
    if (routeOptionS == "true") {
        switchInput2.checked = true;
        switchInput2.setAttribute("readonly", "");
        switchInput2.setAttribute("disabled", "");
    } else {
        switchInput2.checked = false;
        switchInput2.removeAttribute("readonly");
        switchInput2.removeAttribute("disabled");
    }
    option2.append(switchInput2);
    option2.append(switchLabel2);

    let price = document.querySelector("#price");
    let priceRoute = event.target.parentNode.parentNode.children[3].textContent;
    price.value = priceRoute;

    //Делается кнопка "Назад" видимой и кнопке "Создать" удаляется атрибут data-bs-dismiss, а также изменяется текст кнопки на "Сохранить" и добавляется класс "create-change-task".
    modal.querySelector(".back-btn").classList.remove("d-none");
    let createBtn = modal.querySelector(".create-btn");
    createBtn.removeAttribute("data-bs-dismiss");
    createBtn.textContent = "Сохранить";
    createBtn.classList.add("create-change-task");
}

//функция создает строку таблицы, которая представляет собой маршрут.
// Она принимает два аргумента: данные маршрута и номер строки в таблице.
//Для начала, функция создает элемент "tr" и устанавливает атрибуты "id" и "data-" для хранения информации о маршруте.
// Затем функция создает ячейку таблицы
//для номера маршрута и добавляет ее в строку таблицы. С помощью асинхронной функции "nameOfRoute" получается название маршрута из API,
// и затем оно добавляется в ячейку таблицы.
//Далее, функция создает ячейки таблицы для даты, цены и действий над маршрутом.
// Для ячейки даты функция преобразует дату из формата JSON в формат "ДД.ММ.ГГГГ".
//Для ячейки действий функция создает три значка: "глаз" для просмотра маршрута,
// "карандаш" для редактирования маршрута и "корзина" для удаления маршрута.
//Каждый значок имеет соответствующие атрибуты, которые управляют модальными окнами для просмотра, редактирования и удаления маршрута.
//В конце, созданная строка таблицы добавляется в таблицу, которая была выбрана с помощью querySelector.
function createRoute(data, number) {                    //Создание заявки
    let table = document.querySelector(".table-routes");
    let row = document.createElement("tr");
    row.setAttribute("id", data.id);
    row.setAttribute("data-guide-id", data.guide_id);
    row.setAttribute("data-time", data.time);
    row.setAttribute("data-duration", data.duration);
    row.setAttribute("data-persons", data.persons);
    row.setAttribute("data-option1", data.optionFirst);
    row.setAttribute("data-option2", data.optionSecond);

    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = number;
    row.append(th);

    let name = document.createElement("td");
    nameOfRoute(data.route_id).then((response) => name.textContent = response);
    row.append(name);

    let dateRoute = document.createElement("td");
    dateee = new Date(data.date);
    DayMonthYear = dateee.toJSON().slice(0, 10).split("-");
    dateRoute.textContent = DayMonthYear[2] + "." + DayMonthYear[1] + "." + DayMonthYear[0];
    row.append(dateRoute);

    let priceRoute = document.createElement("td");
    priceRoute.textContent = data.price;
    row.append(priceRoute);

    let actions = document.createElement("td");
    actions.classList.add("d-flex");
    actions.classList.add("flex-wrap");
    let eye = document.createElement("i");
    eye.classList.add("bi");
    eye.classList.add("bi-eye-fill");
    eye.classList.add("mx-2");
    eye.setAttribute("data-bs-toggle", "modal");
    eye.setAttribute("data-bs-target", "#showTask");
    eye.onclick = clickOnEye;
    actions.append(eye);

    let pen = document.createElement("i");
    pen.classList.add("bi");
    pen.classList.add("bi-pencil-square");
    pen.classList.add("mx-2");
    pen.setAttribute("data-bs-toggle", "modal");
    pen.setAttribute("data-bs-target", "#showTask");
    pen.onclick = clickOnPen;
    actions.append(pen);

    let trash = document.createElement("i");
    trash.classList.add("bi");
    trash.classList.add("bi-trash-fill");
    trash.classList.add("ms-2");
    trash.setAttribute("data-bs-toggle", "modal");
    trash.setAttribute("data-bs-target", "#deleteTask");
    trash.onclick = clickOnTrash;
    actions.append(trash);
    row.append(actions);

    table.append(row);
}

//pageBtnHandler является обработчиком событий клика по кнопкам переключения страниц в пагинации.
//Она проверяет, является ли целевой элемент кнопкой переключения страниц (имеет ли класс "page-link").
//Если нет, то функция ничего не делает. Если элемент является кнопкой переключения страниц,
// то она удаляет класс "active" у текущей активной кнопки переключения страниц
//и добавляет этот класс элементу, на который кликнули. Затем функция вызывает createElements с переданным ей массивом данных.
function pageBtnHandler(event) {                              //Переключение по страницам (пагинация)
    if (!event.target.classList.contains("page-link")) return;
    let oldBtn = document.querySelector(".active");
    oldBtn.classList.remove("active");
    event.target.classList.add("active");
    createElements(allData);
}

//createElements создает список заявок на странице, исходя из переданного массива данных.
//Она сначала очищает таблицу заявок и пагинацию от предыдущих элементов, затем создает новую пагинацию с помощью цикла,
//который создает новые элементы списка для каждой страницы (по 5 заявок на странице).
// Каждая кнопка имеет обработчик событий клика pageBtnHandler.
//Затем функция определяет текущую страницу и создает элементы таблицы для заявок на этой странице с помощью цикла for.
//Функция вызывает createRoute для каждой заявки на странице, передавая ей данные и порядковый номер заявки в списке.
function createElements(data) {                            //Создание списка заявок
    document.querySelector(".table-routes").innerHTML = "";
    let oldBtn = document.querySelector(".active");
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";
    for (let i = 1; i < Math.ceil(data.length / 5) + 1; i++) {
        let li = document.createElement("li");
        li.classList.add("page-item");
        let a = document.createElement("a");
        a.classList.add("page-link");
        a.classList.add("bg-secondary");
        a.classList.add("text-warning");
        if (oldBtn.textContent == i) a.classList.add("active");
        a.setAttribute("href", "#");
        a.textContent = i;
        a.onclick = pageBtnHandler;
        li.append(a);
        pagination.append(li);
    }

    let currentPage = document.querySelector(".active").textContent;
    let start = currentPage * 5 - 5;
    let end = (start + 5) > data.length ? (start + data.length % 5) : start + 5;
    for (let i = start; i < end; i++) {
        createRoute(data[i], i + 1);
    }
}
//downloadData() отвечает за загрузку списка заявок с сервера и сохранение полученных данных в переменной allData.
//С помощью функции createElements() создается список заявок на основе полученных данных.
async function downloadData() {                  //Загрузка заявок
    let nUrl = new URL(url + "orders");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        allData = JSON.parse(JSON.stringify(data));
        createElements(data);
    } catch (error) {
        console.log(error.message);
    }
}

//deleteTask() отвечает за удаление выбранной заявки с сервера. Она получает id заявки,
// формирует URL для отправки запроса на удаление с помощью fetch().
//В случае успешного удаления заявки, функция вызывает downloadData() для обновления списка заявок.
//Если удаление не удалось, то функция вызывает функцию showAlert() для отображения сообщения об ошибке.
async function deleteTask(event) {                        //Удаление заявки
    if (!event.target.classList.contains("delete")) return;
    let idTask = event.target.getAttribute("data-task-id");
    let nUrl = new URL(url + "orders/" + idTask);
    nUrl.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(nUrl, {
            method: "DELETE",
        });
        let data = await response.json();
        document.querySelector(".page-link").classList.add("active");
        if (data.error) showAlert(data.error, "alert-danger");
        else showAlert("Заявка успешно удалена", "alert-success");
        downloadData();
    } catch (error) {
        console.log(error.message);
    }
}
//saveNewTask сохраняет изменения в заявке после редактирования.
// Она вызывается при отправке формы редактирования заявки и проверяет валидность времени, указанного в форме.
//Если время валидно, функция формирует и отправляет запрос на изменение заявки на сервер.
// Если запрос выполнен успешно, функция вызывает функцию downloadData для обновления списка заявок.
//Если запрос выполнен с ошибкой, функция вызывает функцию showAlert для отображения сообщения об ошибке.
async function saveNewTask(event) {                      //Сохранение отредактированной заявки
    if (!event.target.classList.contains("create-change-task")) return;
    let formForSend = new FormData();
    let form = document.querySelector("#create-task-form");
    formForSend.append("date", form.elements["date"].value);
    formForSend.append("time", form.elements["time"].value);
    formForSend.append("duration", form.elements["selectLength"].value);
    formForSend.append("persons", form.elements["customRange2"].value);
    formForSend.append("price", form.elements["price"].value);
    formForSend.append("optionFirst", (form.elements["option1"].checked) ? 1 : 0);
    formForSend.append("optionSecond", (form.elements["option2"].checked) ? 1 : 0);
    let taskId = event.target.getAttribute("data-task-id");
    let nUrl = new URL(url + "orders/" + taskId);
    nUrl.searchParams.append("api_key", apiKey);

    if (form.elements["time"].validity.valid) {                      //Проверка валидности времени
        try {
            event.target.setAttribute("type", "button");
            let modal = document.querySelector("#showTask");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            let response = await fetch(nUrl, {
                method: "PUT",
                body: formForSend,
            });
            let data = await response.json();
            if (data.error) showAlert(data.error, "alert-danger");
            else showAlert("Заявка успешно изменена", "alert-success");
            downloadData();
            console.log(data);
        } catch (error) {
            showAlert(error.message, "alert-danger");
        }
    } else {
        event.target.setAttribute("type", "submit");
    }
}

window.onload = function () {
    downloadData(); //загружает данные с сервера и вызывает функцию createElements() для отображения данных на странице.
    document.querySelector(".delete").onclick = deleteTask; // назначает функцию deleteTask() на клик элемента с классом delete
    document.querySelector("#selectLength").oninput = changeTotalPrice; //назначает функцию changeTotalPrice() на событие input элемента с id selectLength
    document.querySelector("#time").oninput = changeTotalPrice; //  назначает функцию changeTotalPrice() на событие input элемента с id time
    document.querySelector("#date").oninput = changeTotalPrice; // назначает функцию changeTotalPrice() на событие input элемента с id date
    document.querySelector("#option1").oninput = changeTotalPrice; // назначает функцию changeTotalPrice() на событие input элемента с id option1
    document.querySelector("#option2").oninput = changeTotalPrice; // назначает функцию changeTotalPrice() на событие input элемента с id option2
    document.querySelector(".create-btn").onclick = saveNewTask; //назначает функцию saveNewTask() на клик элемента с классом create-btn
};
