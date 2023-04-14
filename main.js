const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/"; //Домен подключения
const apiKey = "efb5278c-38e4-443f-8f89-4542d6349c80"; //Личный API ключ

const holidays = [                                 //Выходные дни
    "01-01",
    "02-23",
    "03-08",
    "05-09",
    "09-01",
    "06-12",
    "05-01",
];

//Метод showAlert, создает и добавляет уведомления на веб-страницу. Функция принимает два аргумента - error и color.
//При вызове функции, создает элемент div и добавляет ему классы "alert", "alert-dismissible" и указанный цвет.
//Затем функция добавляет переданное сообщение об ошибке (error) в тело созданного элемента.
//Далее функция создает кнопку для закрытия уведомления, добавляет ей атрибуты и классы, и добавляет ее в тело элемента.
//И в конце, функция добавляет созданный элемент в блок на веб-странице с классом "alerts".
// И установливает таймер на удаление уведомления через 4 секунды.

function showAlert(error, color) {                             //уведомления
    let alerts = document.querySelector(".alerts");										//Поиск элементов с классом alert
    let alert = document.createElement("div");												//Создаю элемент div
    alert.classList.add("alert", "alert-dismissible", color);					//к элементам выбранным в строчке 16 добавляю классы "alert", "alert-dismissible" и цвет
    alert.setAttribute("role", "alert");															//к элементам div добавляю атрибуты "role", "alert"
    alert.append(error);																							//в тело элемента добавляю сообщение ERROR, которое передал в начале ф-ции
    let btn = document.createElement("button");												//создаю новый элеменм кнопку
    btn.setAttribute("type", "button");																//Ставлю атрибуты, что тип кнопки - это кнопка
    btn.classList.add("btn-close");																		//Назначаю кнопке класс "btn-close"
    alert.classList.add("position-sticky");														//К div из строчки 16 добавляю класс "position-sticky"
    alert.classList.add("end-50");																		//К div из строчки 16 добавляю класс "end-50"
    alert.classList.add("my-0");																			//К div из строчки 16 добавляю класс "my-0""
    btn.setAttribute("data-bs-dismiss", "alert");											//Устанавливаю атрибуты "data-bs-dismiss", "alert" к Кнопке
    btn.setAttribute("aria-label", "Close");													//Устанавливаю атрибуты "data-bs-dismiss", "alert" к Кнопке
    alert.append(btn);																								//Добавляю кнпоку в "alert"
    alerts.append(alert);																							//в "allerts" добавляю "alert"
    setTimeout(() => alert.remove(), 4000);														//устанавливаю таймер что через 4000 секунд сообщение пропадает
}

//Метод clickMainObject(event) вызывается при нажатии на объект с классом ".btn-main-object" и устанавливает текст контейнера этого
//элемента равным тексту выбранного элемента, переданного в функцию. Затем вызывается функция newSearch().
function clickMainObject(event) {                                              //Нажатие на достопримечательность
    let mainObject = document.querySelector(".btn-main-object");				//Поиск на странице объекта с классом ".btn-main-object"
    mainObject.textContent = event.target.textContent;									//в контейнер текста, выбранного элемента, устанавливаем значение текста переданного в ф-цию элемента
    newSearch();																												//Вызываем ф-циюю newSearch()
}

//Функция createTooltipTh(data) создает элемент типа TH, который будет использоваться для всплывающих подсказок.
//Элементу устанавливаются необходимые атрибуты, а затем он возвращается из функции.
function createTooltipTh(data) {                                               //Создаем всплывающие подсказки
    let desc = document.createElement("th");														//создаю на странице элемент типа TH
    desc.setAttribute("data-bs-toggle", "tooltip");											//Атрибуту "data-bs-toggle" элемента, устанавливаем значение "tooltip"
    desc.setAttribute("data-bs-placement", "top");											//Атрибуту "data-bs-placement" элемента, устанавливаем значение "top"
    desc.setAttribute("data-bs-custom-class", "custom-tooltip");				//Атрибуту "data-bs-custom-class" элемента, устанавливаем значение "custom-tooltip"
    desc.setAttribute("data-bs-title", data);														//Атрибуту "data-bs-title" элемента, устанавливаем значение data
    return desc;																												//Возвращаю этот элемент
}

//Функция onClickGuide(event) вызывается при нажатии на кнопку "Да" в списке гидов.
//Она проверяет наличие класса "btn" у переданного элемента. Если класса нет, то функция возвращает.
//Если класс есть, то она находит элемент с классом ".btn-guide" и удаляет у него классы "btn-guide" и "btn-secondary",
//затем добавляет класс "btn-light". Затем переданный элемент получает класс "btn-guide" и удаляет класс "btn-light",
//затем добавляет класс "btn-secondary". Кроме того, кнопка с классом ".checkout-route" перестает быть отключенной
// и вызывается функция scrollIntoView(), чтобы прокрутить страницу к этой кнопке.
function onClickGuide(event) {                                               //Нажатие на "Да" в списке гидов
    if (!event.target.classList.contains("btn")) return;								//Проверка на наличие класса btn, в случае если оно ложно то ф-ця вовращается
    let oldBtn = document.querySelector(".btn-guide");                  //Ищем объект с классом ".btn-guide"
    if (oldBtn) {                                                       //Проверка на наличие объекта
        oldBtn.classList.remove("btn-guide");														//Удаляем класс ".btn-guide" у объекта
        oldBtn.classList.remove("btn-secondary");												//Удаляем класс "btn-secondary" у объекта
        oldBtn.classList.add("btn-light");															//Добавляем класс "btn-light" объекту
    }
    event.target.classList.add("btn-guide");                            //Переданному элементу бобавляем класс ".btn-guide"
    event.target.classList.remove("btn-light");                         //У переданного элемента удаляем класс "btn-light"
    event.target.classList.add("btn-secondary");                        //Переданному элементу бобавляем класс "btn-secondary"
    document.querySelector(".checkout-route").removeAttribute("disabled");//В документе ищем элемент с классом ".checkout-route" и выключаем кнопку
    document.querySelector(".checkout-route").scrollIntoView();        	//В документе ищем элемент с классом ".checkout-route"
}


//функция createLanguageList(guides) создает список языков, используемых гидами, на основе переданного списка гидов.
//Она создает элементы списка на странице и заполняет их значениями языков.
//Для каждого языка в списке гидов создается элемент списка типа li и элемент ссылки a, содержащий язык гида.
//Если язык уже присутствует в списке newList, то элемент списка не создается, чтобы избежать дублирования.
//В результате выполнения функции на странице создается выпадающий список языков для выбора языка экскурсии.
function createLanguageList(guides) {                                        //Создание списка языков
    let newList = [];																										//Создаем переменную newList
    let list = document.querySelector(".language-list");								//В документе ищем объект с классом ".language-list"
    let li = document.createElement("li");                              //В документе создаем элемент list - "li"
    let a = document.createElement("a");                                //В документе создаем элемент a
    a.setAttribute("href", "#");                                        //Элменту a устанавливаем значения атребута "href", "#"
    a.classList.add("dropdown-item")																		//Элементу a добавляем класс "dropdown-item"
    a.textContent = "Язык экскурсии";																		//В текст контейнер а добавляем текст "Язык экскурсии"
    li.append(a);																												//Добавляем а в список
    list.append(li);																										//Добавляем li в list
    for (let guide of guides) {																					//Проходимся по всему списку гидов
        let li = document.createElement("li");													//Создаем элемент типа li
        let a = document.createElement("a");														//Создаем элемент типа а
        a.setAttribute("href", "#");																		//Элменту a устанавливаем значения атребута "href", "#"
        a.classList.add("dropdown-item")																//Элементу a добавляем класс "dropdown-item"
        a.textContent = guide.language;																	//В текст а вписываем значение языка гида
        li.append(a);																										//Добавляем а в li
        if (!newList.includes(guide.language)) {												//Проверям Если в списке newList не содержиться языка гида
            newList.push(guide.language);																//добавляем язык гида в newList
            list.append(li);																						//добавляем li в List
        }
    }
}

//функция createGuidesTable(guides, lang, minInput, maxInput)создает таблицу для списка гидов.
//Принимает четыре параметра: guides - массив объектов-гидов, lang - строку, которая означает выбранный язык,
// minInput - число, которое означает минимальный опыт работы гида,
//и maxInput - число, которое означает максимальный опыт работы гида. Функция очищает текстовые поля элементов с классами ".table-guides"
// и ".language-list", создает список языков
//с помощью функции createLanguageList(guides), проходится по всем объектам массива guides и создает строки таблицы.
// Для каждого объекта создается строка таблицы с помощью методов DOM.
//В каждой строке создаются ячейки таблицы, которые содержат информацию о гиде.
// Затем функция сравнивает фильтры (язык, минимальный и максимальный опыт работы) с каждым гидом и добавляет
//строку таблицы в элемент с классом ".table-guides", если соответствующие фильтры совпадают с данными гида.
// Если в таблицу не добавлено ни одной строки, то отключается кнопка с классом ".checkout-route".
//Функция также добавляет обработчик событий onClickGuide на кнопку "✓".

function createGuidesTable(guides, lang, minInput, maxInput) {                  //Создание таблицы гидов
    let guidesTable = document.querySelector(".table-guides");					//в документе ищем элемент с классом .table-guides"
    guidesTable.innerHTML = "";                                         //текстовое поле этого элемента оставляем пустым
    document.querySelector(".language-list").innerHTML = "";            //Ищем переменную с классом ".language-list" и ее текстовое поле оставляем пустым
    createLanguageList(guides);                                         //вызываем ф-цию createLanguageList с параметром guides
    for (let guide of guides) {                                         //Проходимся по всем гидам
        let row = document.createElement("tr");                         //создаем документ типа "tr"
        row.classList.add("fs-6");                                      //добавляем класс "fs-6"
        let th = document.createElement("th");               //Создаю элемент "th"
        th.setAttribute("scope", "row");																//устанавливаю атрибуту "scope" значение "row"
        th.classList.add("fs-1");                                       //Добавляю к "th" кдасс "fs-1"
        th.classList.add("text-center");																//Добавляю к "th" кдасс "text-center"
        let icon = document.createElement("span");                      //Создаю элемент "span"
        icon.classList.add("bi");																				//Добавляю класс "bi"
        icon.classList.add("bi-person-rolodex");												//Добавляю класс "bi-person-rolodex"
        th.append(icon);																								//Добавляю icon в "th"
        row.append(th);																									//Добавляю "th" в row

        let nameGuide = document.createElement("td");              //create name
        nameGuide.classList.add("nameOfGuide");
        nameGuide.textContent = guide.name;
        row.append(nameGuide);

        let languageGuide = document.createElement("td");          //create language
        languageGuide.textContent = guide.language;
        row.append(languageGuide);

        let workExp = document.createElement("td");              //create work experience
        workExp.textContent = guide.workExperience;
        row.append(workExp);

        let price = document.createElement("td");                  //create price per hour
        price.classList.add("priceOfGuide");
        price.textContent = guide.pricePerHour;
        row.append(price);

        let btnTd = document.createElement("td");              //create button place
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-light");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "✓";
        btn.setAttribute("data-guide-id", guide.id);
        btnTd.append(btn);
        btnTd.onclick = onClickGuide;
        row.append(btnTd);
        //Сравнение с фильтрами
        if ((lang == guide.language) && (minInput <= guide.workExperience) && (guide.workExperience <= maxInput)) guidesTable.append(row);
        else if ((lang == "Язык экскурсии") && (minInput <= guide.workExperience) && (guide.workExperience <= maxInput)) {
            guidesTable.append(row);
        }
    }
    if (document.querySelector(".table-guides").children.length == 0) {
        document.querySelector(".checkout-route").setAttribute("disabled", "");
    }
}


//Функция createWorkExperience получает массив данных об опыте работы и устанавливает значения минимального и максимального
// опыта работы в соответствующие элементы формы.

function createWorkExperience(data) {                             //Создание опыта работы
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    maxInput.value = "";
    minInput.value = "";
    let min = 1000;
    let max = 0;
    for (let guide of data) {
        if (guide.workExperience < min) {
            min = guide.workExperience;
        }
        if (guide.workExperience > max) {
            max = guide.workExperience;
        }
    }
    maxInput.value = max;
    minInput.value = min;
}

//Функция searchingGuides принимает идентификатор маршрута, создает новый URL для получения списка гидов, используя API-ключ,
// и затем выполняет запрос на сервер с помощью fetch.
//Когда данные приходят в ответ, они передаются в функцию createGuidesTable, которая отображает таблицу гидов на странице.
//Затем вызывается createWorkExperience, чтобы установить значения опыта работы в соответствующие элементы формы.

async function searchingGuides(idRoute) {                                   //Поиск гидов
    let nUrl = new URL(url + "routes/" + idRoute + "/guides");
    nUrl.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, "Язык экскурсии", 0, 50);
        createWorkExperience(data);
    } catch (error) {
        console.log(error.message);
    }
}

//Функция searchGuidesForRoute вызывается при нажатии на кнопку "Да" в таблице маршрутов. Она получает идентификатор маршрута,
//устанавливает его в атрибуте элемента кнопки, отображает название маршрута на странице, вызывает функцию searchingGuides для
//получения списка гидов и передает идентификатор маршрута в качестве аргумента.

function searchGuidesForRoute(event) {                                     //Нажатие на "Да" в таблице маршрутов
    if (!event.target.classList.contains("btn-for-guides")) return;
    document.querySelector(".search-btn-guides").setAttribute("data-route-id", event.target.id);
    document.querySelector(".checkout-route").setAttribute("disabled", "");
    let nameOfRoute = document.querySelector(".guides").querySelector("p");
    nameOfRoute.textContent = "";
    nameOfRoute.scrollIntoView();
    let oldBtn = event.target.parentNode.parentNode.parentNode.querySelector(".btn-secondary");
    if (oldBtn) {
        oldBtn.classList.remove("btn-secondary");
        oldBtn.classList.add("btn-light");
    }

    event.target.classList.remove("btn-light");
    event.target.classList.add("btn-secondary");
    let str = "Доступные гиды по маршруту: ";
    let onClickRoute = event.target.parentNode.parentNode;
    nameOfRoute.textContent = str + onClickRoute.firstChild.getAttribute("data-bs-title");
    document.querySelector(".btn-language").textContent = "Язык экскурсии";
    searchingGuides(event.target.id);
}

//Ниже код создает строку в таблице маршрутов, которая содержит имя маршрута, краткое описание,
//основные объекты и кнопку для выбора гидов, которые будут проводить экскурсии по этому маршруту.

function createRoute(data) {                     //Создание маршрута
    let table = document.querySelector(".table-routes");
    let row = document.createElement("tr");
    let th = createTooltipTh(data.name);               //create name
    th.setAttribute("scope", row);
    let numOfChars = 0;
    let name = "";

//Для имени маршрута создается ячейка с подсказкой, где имя маршрута
//ограничивается 30 символами, и если оно длиннее, то оно обрезается и заменяется многоточием.

    for (let char of data.name) {
        if (numOfChars == 30) {
            name += "...";
            break;
        }
        name += char;
        numOfChars++
    }
    //th.classList.add("text-wrap");
    th.textContent = name;
    row.append(th);

    //let desc = document.createElement("td");             //create description
    numOfChars = 0;
    let descWords = "";

//Для краткого описания и основных объектов также создаются ячейки с подсказками, где описание ограничено 20 символами.

    for (let char of data.description) {
        if (numOfChars == 20) break;
        descWords += char;
        numOfChars++;
    }
    let desc = createTooltip(data.description);

    desc.textContent = descWords + "...";
    row.append(desc);

    //let mainObj = document.createElement("td");          //create main objects
    numOfChars = 0;
    let mainObjects = "";
    for (let char of data.mainObject) {

        if (numOfChars == 20) break;
        mainObjects += char;
        numOfChars++;
    }
    let mainObj = createTooltip(data.mainObject);
    mainObj.textContent = mainObjects + "...";
    row.append(mainObj);

    let btnTd = document.createElement("td");              //create button place
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-light");
    btn.classList.add("btn-for-guides");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("id", data.id);
    //btn.setAttribute("href", "#guides-list");
    //btn.href = "#guides-list";

//Кнопка "✓" на последней ячейке строки используется для выбора гидов, и имеет класс "btn-for-guides",
//который позволяет его идентифицировать и обрабатывать события нажатия на кнопку. При нажатии на кнопку
//запускается функция searchGuidesForRoute(), которая запрашивает доступных гидов для выбранного маршрута.

    btn.textContent = "✓";
    btnTd.append(btn);
    btnTd.onclick = searchGuidesForRoute;
    row.append(btnTd);

    table.append(row);
}

//Этот метод создает элементы таблицы маршрутов и элементы пагинации для списка маршрутов на веб-странице.
//Он очищает содержимое таблицы маршрутов и пагинации, а затем создает новые элементы пагинации с помощью цикла for,
// основанного на количестве элементов данных, переданных функции в переменной allData.
//Затем он определяет диапазон элементов данных, которые должны отображаться на текущей странице, используя переданный
// активный номер страницы в activePage. Он проходит по этому диапазону элементов данных
//и для каждого из них вызывает функцию createRoute(), которая создает новую строку таблицы маршрутов с данными из каждого элемента данных.

function createTableRouteElements(allData, activePage) {                      //Создание элементов
    document.querySelector(".table-routes").innerHTML = "";
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    to = (allData.length == 0) ? 1 : Math.ceil(allData.length / 10)

    for (let i = 1; i < to + 1; i++) {
        let li = document.createElement("li");
        li.classList.add("page-item");
        let a = document.createElement("a");
        a.classList.add("page-link");
        a.classList.add("bg-secondary");
        a.classList.add("text-warning");
        if (activePage == i) a.classList.add("active");
        a.setAttribute("href", "#pages");
        a.textContent = i;
        li.append(a);
        pagination.append(li);
    }
    let currentPage = activePage
    let start = currentPage * 10 - 10;
    let end = (start + 10) > allData.length ? (start + allData.length % 10) : start + 10;
    for (let i = start; i < end; i++) {
        createRoute(allData[i]);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


//Функция создает список достопримечательностей на основе данных, переданных в качестве аргумента.
// Она проходит по каждому элементу массива данных и разбивает строку "mainObject" на подстроки,
//используя разделитель " - ". Затем для каждой подстроки создается новый элемент списка <li>,
// содержащий ссылку <a> с текстом, равным сокращенной версии подстроки, и атрибутом "data-bs-title",
//содержащим полную версию подстроки.
// Функция использует Bootstrap-теги данных для создания всплывающих подсказок на основе атрибутов "data-bs-toggle",
// "data-bs-placement", "data-bs-custom-class"
//и "data-bs-title", которые позволяют пользователю увидеть полную версию подстроки при наведении курсора на сокращенную версию.

function downloadMainObjectsList(data) {                         //Создание списка достопримечательностей
    let dropList = document.querySelector(".main-objects-list");
    newList = [];
    for (let drop of data) {
        let l = drop.mainObject.split(" - ");
        for (let newObj of l) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.setAttribute("href", "#sights");
            shortString = newObj.substring(0, 15);
            seenString = shortString + "...";
            if (!newList.includes(seenString)) {
                a.textContent = seenString
                a.setAttribute("data-bs-toggle", "tooltip");
                a.setAttribute("data-bs-placement", "top");
                a.setAttribute("data-bs-custom-class", "custom-tooltip");
                a.setAttribute("data-bs-title", newObj);
                newList.push(shortString);
                li.append(a);
                dropList.append(li);
            }
        }
    }
    return newList
}


// Метод getData() отвечает за получение данных из внешнего источника с помощью API.
// В этом методе формируется URL с параметрами API-ключа, отправляется запрос и полученный
//ответ обрабатывается как JSON. Если при выполнении происходит ошибка,
// вызывается функция showAlert() с сообщением об ошибке и стилем оповещения alert-danger.

async function getData() {
    try {
        let nUrl = new URL(url + "routes");
        nUrl.searchParams.append("api_key", apiKey);
        let response = await fetch(nUrl);
        let data = await response.json();
        return data
    } catch (error) {
        showAlert(error.message, "alert-danger");
    }
}

//Метод waysSearchBtnListener() является обработчиком нажатия кнопки Enter в поле ввода для поиска.
//При нажатии на эту кнопку, метод вызывает обработчик события клика по кнопке поиска.

function waysSearchBtnListener() {
    input = document.querySelector(".search-field")
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".search-btn").click();
        }
    })
}
//Метод newSearch() является обработчиком события клика по кнопке "новый поиск".
//При вызове метода переменная activePage устанавливается равной 1,
// а затем вызывается обработчик события клика по кнопке поиска searchBtnHandler().
function newSearch() {
    activePage = 1
    searchBtnHandler(activePage)
}

//Функция searchBtnHandler обрабатывает нажатие кнопки "Искать". Она сначала получает данные вызовом функции getData(),
// затем загружает список достопримечательностей
//с помощью функции downloadMainObjectsList(data).
// Затем функция проверяет, было ли выбрано какое-либо достопримечательность, и если было выбрано, добавляет его в список поиска.
//Затем функция ищет маршруты, которые включают выбранные достопримечательности,
// и если в поле поиска был введен текст, фильтрует маршруты по этому тексту.
//В конце, функция вызывает функцию createTableRouteElements(newRoutes, activePage), чтобы создать таблицу с найденными маршрутами.

async function searchBtnHandler(activePage) {
    try {
        data = await getData()
        newList = downloadMainObjectsList(data);
        let searchField = document.querySelector(".search-field").value.toLowerCase();
        let nUrl = new URL(url + "routes");
        nUrl.searchParams.append("api_key", apiKey);
        let mainObjText = document.querySelector(".btn-main-object").textContent.slice(0, -3);
        if (newList.includes(mainObjText)) findList = [mainObjText];
        else findList = newList.slice();
        console.log(findList)
        let newRoutes = [];
        for (let route of data) {
            for (let obj of findList) {
                if (route.mainObject.includes(obj)) {
                    if (searchField.length != 0) {
                        if (!route.name.toLowerCase().includes(searchField)) {
                            continue
                        }
                    }
                    newRoutes.push(route);
                    break
                }
            }
        }
        createTableRouteElements(newRoutes, activePage);
    } catch (error) {
        showAlert(error.message, "alert-danger");
    }
}

//Функция pageBtnHandler обрабатывает нажатие кнопок пагинации, чтобы перейти на другую страницу.
//Если была нажата кнопка пагинации, то функция вызывает функцию searchBtnHandler(activePage), передавая ей номер активной страницы.

function pageBtnHandler(event) {                                     //Переход на другую страницу
    if (!event.target.classList.contains("page-link")) return;
    activePage = event.target.textContent
    searchBtnHandler(activePage);
}

//Метод searchGuidesWithLanguageClick() вызывается при клике на кнопку языка и использует выбранный язык,
// минимальный и максимальный опыт работы, и идентификатор маршрута,
//чтобы найти подходящих гидов. Он отправляет запрос к API с указанными параметрами,
// получает ответ и создает таблицу гидов с использованием метода createGuidesTable().

async function searchGuidesWithLanguageClick() {                    //Поиск при смене языка
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    let dataRouteId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let nUrl = new URL(url + "routes/" + dataRouteId + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}

//Метод btnLanguageClick() вызывается при клике на элемент выпадающего меню языков.
//Он меняет текст кнопки языка на выбранный элемент и вызывает метод searchGuidesWithLanguageClick().

function btnLanguageClick(event) {                           //Смена языка
    if (!event.target.classList.contains("dropdown-item")) return;
    document.querySelector(".btn-language").textContent = event.target.textContent;
    searchGuidesWithLanguageClick();
}

//Этот метод не содержит кода и, скорее всего, был предназначен для обработки изменения минимального или
// максимального значения опыта работы.
function changeWorkExperience(event) {

}

//Метод  searchGuidesWithFilters(event): осуществляет поиск гидов для выбранного маршрута с применением фильтров,
// таких как язык и опыт работы.
//Создаёт URL с параметрами для получения данных с API, получает данные и передаёт их функции createGuidesTable,
// которая отображает список гидов на странице.

async function searchGuidesWithFilters(event) {                  //Поиск гидов с фильтрами
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    let nUrl = new URL(url + "routes/" + event.target.getAttribute("data-route-id") + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}

//Метод numberOfVisitors(): возвращает количество посетителей для задачи создания новой экскурсии в форме,
// основываясь на выбранном пользователем значении ползунка.
function numberOfVisitors() {                //Количество человек
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    let plus = 0;
    if (number <= 5) plus = 0;
    else if ((number > 5) && (number <= 10)) plus = 1000;
    else if ((number > 10) && (number <= 20)) plus = 1500;
    return plus;
}

//Метод guideServiceCost(): возвращает стоимость гида за час, основываясь на выбранном пользователем гиде и маршруте,
// и на данных, полученных с API.
function guideServiceCost() {                //Стоимость гида за час
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;

    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    return price;
}

//Метод isThisDayOff() проверяет, является ли выбранная дата выходным днем или праздником и возвращает коэффициент,
// учитывающий этот факт при расчете стоимости.
function isThisDayOff() {                           //Скидка за выходной или праздничный день
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

//Метод isItMorningOrEvening() проверяет, является ли выбранное время утренним (с 9 до 12) или вечерним (с 20 до 23)
// и возвращает коэффициент, учитывающий этот факт при расчете стоимости.
function isItMorningOrEvening() {              //Время дня
    let form = document.querySelector("#create-task-form");
    let time = parseInt(form.elements["time"].value.split(":")[0]);
    let plus = 0;
    if ((time >= 9) && (time < 12)) plus = 400;
    else if ((time >= 20) && (time <= 23)) plus = 1000;
    return plus;
}
//Метод hoursNumber() возвращает количество выбранных часов для тура.
function hoursNumber() {                         //Количество часов
    let form = document.querySelector("#create-task-form");
    let hours = form.elements["selectLength"].value;
    return hours;
}

//Метод checkOptionFirst() проверяет, выбрана ли первая опция в форме и возвращает соответствующий коэффициент.
function checkOptionFirst() {                             //Выбор первой опции
    let option = document.querySelector("#option1");
    let price = 1;
    if (option.checked) {
        price = 0.75;
    }
    return price;
}
//Метод checkOptionSecond() - проверяет, выбрана ли вторая опция, если да, то вычисляет стоимость, основанную на количестве, выбранном пользователем на ползунке
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

//метод changeNumberOfPeople(event) - обработчик события изменения количества людей, которые будут принимать участие в экскурсии.
//Функция устанавливает значение количества людей в текстовом поле на странице, затем вычисляет и обновляет стоимость экскурсии,
//основываясь на различных факторах, таких как выбранный маршрут, количество часов, выбранная опция, день недели, время суток и
//выбранное количество человек. Функция не возвращает значения, а только обновляет данные на странице.

function changeNumberOfPeople(event) {                //Изменение количества человек
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;
    let hours = form.elements["selectLength"].value;
    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

//checkoutRoute(event) - обработчик события клика на кнопке "Оформить заявку".
// Функция устанавливает значения в текстовых полях на странице, такие как выбранный маршрут,
//выбранное количество часов, выбранное количество людей и стоимость экскурсии, основанную на различных факторах,
// таких как выбранная опция, день недели, время суток и т. д.
//Функция не возвращает значения, а только обновляет данные на странице.

function checkoutRoute(event) {                       //Открытие модального окна с оформлением заявки
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let date = new Date();
    date.setDate(date.getDate() + 1);
    form.querySelector("#date").value = date.toJSON().slice(0, 10);
    form.querySelector("#date").setAttribute("min", date.toJSON().slice(0, 10));
    let name = "";
    let price = 0;
    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    form.elements["name"].value = name;
    form.elements["route"].value = route[1];
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

//changeTotalPrice изменяет цену, которая отображается на странице на основе значения,
//возвращаемого другими функциями:
// guideServiceCost(), hoursNumber(), isThisDayOff(), isItMorningOrEvening(), numberOfVisitors(), checkOptionSecond(), checkOptionFirst().
function changeTotalPrice(event) {           //Изменение цены
    let form = document.querySelector("#create-task-form");
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

//sendRequest отправляет асинхронный POST-запрос на сервер с данными, введенными пользователем в форму заявки,
// в том числе временем, продолжительностью,
//количеством участников и ценой, вычисляемой с помощью функции changeTotalPrice.
// Если данные валидны, то функция скрывает модальное окно и выводит сообщение
//об успешной отправке заявки, в противном случае она не отправляет запрос и возвращает фокус на кнопку создания заявки.
async function sendRequest(event) {                               //Оформление заявки
    if (!event.target.classList.contains("create-btn")) return;
    let formForSend = new FormData();
    let guideId = document.querySelector(".btn-guide").getAttribute("data-guide-id");
    let routeId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let form = document.querySelector("#create-task-form");
    formForSend.append("guide_id", guideId);
    formForSend.append("route_id", routeId);
    formForSend.append("date", form.elements["date"].value);
    formForSend.append("time", form.elements["time"].value);
    formForSend.append("duration", form.elements["selectLength"].value);
    formForSend.append("persons", form.elements["customRange2"].value);
    formForSend.append("price", form.elements["price"].value);
    formForSend.append("optionFirst", (form.elements["option1"].checked) ? 1 : 0);
    formForSend.append("optionSecond", (form.elements["option2"].checked) ? 1 : 0);
    let nUrl = new URL(url + "orders");
    nUrl.searchParams.append("api_key", apiKey);
    if (form.elements["time"].validity.valid) {                    //Проверка валидности времени
        try {
            event.target.setAttribute("type", "button");
            let modal = document.querySelector("#addTask");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            let response = await fetch(nUrl, {
                method: "POST",
                body: formForSend,
            });
            let data = await response.json();
            if (data.error) showAlert(data.error, "alert-danger");
            else showAlert("Заявка успешно оформлена", "alert-success");
        } catch (error) {
            showAlert(error.message, "alert-danger");
        }
    } else {
        event.target.setAttribute("type", "submit");
    }
}
//Тут устанавливаются обработчики событий на различные элементы на странице.
window.onload = function () {
    waysSearchBtnListener() // устанавливает обработчик для кнопки поиска маршрутов
    newSearch() //устанавливает обработчик для кнопки нового поиска маршрутов
    document.querySelector(".main-objects-list").onclick = clickMainObject; //устанавливает обработчик клика на элемент списка основных объектов
    document.querySelector(".pagination").onclick = pageBtnHandler; //устанавливает обработчик клика на элемент пагинации страниц
    document.querySelector(".search-btn").onclick = newSearch; // устанавливает обработчик для кнопки поиска маршрутов
    document.querySelector(".language-list").onclick = btnLanguageClick; //устанавливает обработчик клика на элемент списка языков
    document.querySelector(".search-btn-guides").onclick = searchGuidesWithFilters; // устанавливает обработчик для кнопки поиска гидов с фильтрами
    document.querySelector("#customRange2").oninput = changeNumberOfPeople; //устанавливает обработчик изменения значения ползунка выбора количества человек
    document.querySelector(".checkout-route").onclick = checkoutRoute; //устанавливает обработчик для кнопки оформления заказа
    document.querySelector("#selectLength").oninput = changeTotalPrice; //устанавливает обработчик изменения значения поля выбора продолжительности экскурсии
    document.querySelector("#time").oninput = changeTotalPrice; //  устанавливает обработчик изменения значения поля выбора времени начала экскурсии
    document.querySelector("#date").oninput = changeTotalPrice; //устанавливает обработчик изменения значения поля выбора даты экскурсии
    document.querySelector("#option1").oninput = changeTotalPrice;//устанавливает обработчик изменения значения флажка выбора опции 1
    document.querySelector("#option2").oninput = changeTotalPrice; //устанавливает обработчик изменения значения флажка выбора опции 2
    document.querySelector(".create-btn").onclick = sendRequest; //устанавливает обработчик для кнопки оформления заявки
};
