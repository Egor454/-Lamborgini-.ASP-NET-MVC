document.addEventListener("DOMContentLoaded", function (event) {
    getCar(); 
    getCurrentUser();
});
var status_user = 0;// переменная отвечающие за того кто авторизован в данный моменит
var UserID = ""; //переменная для присвоения id пользователя
let sum = 0;// переменная для присвоения суммы заказа
//вывод всех элементов 
function getCar() {
    $.ajax({
        url: "/api/car", //Адрес контроллера
        type: "GET", //Метод контроллера, который вызвать
        dataType: "HTML", //Как отобразить данные
        success: function (data) { //Если такой контроллер присутствует и в нем есть этот метод то переходим сюда, иначе в error
            let car = JSON.parse(data); //полученные данные переводим в строчку
            let html = ""; //текст вставки, то что будет вставлено в div
            if (car) { //Проверка, если ли вообще данные в БД
                for (var i in car) { //Считываем по объекту
                    html += '<div class="col-lg-3 col-md-3 catalog  panel - warning ">';
                    html += '<div class="panel-body">';
                    html += '<h3>' + car[i].name + '</h3>';
                    html += '<p>Комплектация: ' + car[i].configuration.name + '</p>';
                    html += '<p>Скорость: ' + car[i].speed + 'км/ч .</p>';
                    html += '<p>Мощность: ' + car[i].power + ' л.с.</p>';
                    html += '<p>Цвет: ' + car[i].color.name + '</p>';  
                    html += '<p>Стоимость: ' + car[i].cost + ' руб.</p>';
                    html += '<div class="dropdown">';
                    html += '</div>';
                    if (status_user == 0 || status_user == 1)// в зависимости кто щас авторизован показывает те или иные кнопки
                    {
                        html += '<button type="button" class="btn btn-success btn-block innerBtn"  onclick="addBasket(' + car[i].carID + ');"> Купить </button>';//кнопка купить, доступна когда авторизован пользователь или вообще не авторизован
                        $(".addCar").css("display", "none");
                    }
                    else {// если авторизован админ
                        html += '<button type="button" class="btn btn-warning btn-block innerBtn"   data-toggle="modal" data-target="#myModal2" onclick="Getcarup(' + car[i].carID + ');"> Редактировать </button>';// кнопка редактировать
                        html += '<button type="button" class="btn btn-danger btn-block innerBtn"   onclick="deleteCar(' + car[i].carID + ');"> Удалить </button>';//кнопка удалить
                        $(".addCar").css("display", "block");
                    }
                    html += '</div>';
                    html += "</div>";
                }
            }
            html += "</div>";
            $('#carsDiv').html(html);   //Добавление строк в html
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
//Создание новой машины
function createCar() {
    var name = $('#addName').val(); //переменной name передаем значение с поля с именем
    var mark = $('#addMark').val();// переменной mark передаем значение с поля с маркой
    var speed = $('#addSpeed').val();// переменной speed передаем значение с поля со скоростью
    var power = $('#addPower').val();// переменной power передаем значение с поля с мощностью
    var configuration = $('#addConfiguration').val();// переменной configuration передаем значение с поля с конфигурацией
    var color = $('#addColor').val();// переменной color передаем значение с поля с цветом
    var cost = $('#addCost').val();// переменной cost передаем значение с поля со стоимостью

    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: '/api/car',//URL фадрес,на который будет отправлен Ajix запрос
        type: 'POST',// отправляет ти запроса
        contentType: 'application/json',// При отправке Ajiax pзапроса,данные передаются в том виде, в котором указаны в данном параметре
        dataType: 'HTML',//Как отобразить данные
        data: JSON.stringify({// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            name: name,
            mark: mark,
            speed: speed,
            power: power,
            configurationFK: configuration,
            colorFK: color,
            cost: cost
        }),
        success: function (data) {
            getCar();// обновить данне на странице
        },
        statusCode: {// кодам выполнения запроса сопоставляется функции ,которые при этом будет вызваны
            401: function (data) {
                $("#error-msg").modal('show');// открыть окно с сообщением
   
            }
        }
    });
}
//удалить объект
function deleteCar(id) {
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: '/api/car/' + id,//URL фадрес,на который будет отправлен Ajix запрос
        type: 'DELETE',// отправляет ти запроса
        dataType: 'HTML',//Как отобразить данные
        success: function () {
            getCar();// обновить данные в случае успеха
        },
        statusCode: {
            401: function (data) {//если неудача вывести ошибку
                $("#error-msg").modal('show');
   
            }
        }
    });
}
function Showcar(car) {
    if (car != null) {
        $("#editId").val(car.carID);// пполучаем id машины
        $("#editName").val(car.name);//получем в поле выбранное значение
        $("#editMark").val(car.mark);// получем в поле выбранное значение
        $("#editSpeed").val(car.speed);// получем в поле выбранное значение
        $("#editPower").val(car.power);// получем в поле выбранное значение
        $("#editConfiguration").val(car.configurationFK);// получем в поле выбранное значение
        $("#editColor").val(car.colorFK);// получем в поле выбранное значение
        $("#editCost").val(car.cost);// получем в поле выбранное значение
    }
    else {
        alert("Такой машины нет");
    }
}
function Getcarup(id) {
    $.ajax({
        url: '/api/car/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            Showcar(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
//Изменение автомобиля
function updateCar() {
    var id = $('#editId').val();// переменной id передаем значение редактированного автомоббиля
    var name = $('#editName').val();//переменной name передаем значение с поля с именем
    var mark = $('#editMark').val();// переменной mark передаем значение с поля с маркой
    var speed = $('#editSpeed').val();// переменной speed передаем значение с поля со скоростью
    var power = $('#editPower').val();// переменной power передаем значение с поля с мощностью
    var configuration = $('#editConfiguration').val();// переменной configuration передаем значение с поля с конфигурацией
    var color = $('#editColor').val();// переменной color передаем значение с поля с цветом
    var cost = $('#editCost').val();// переменной cost передаем значение с поля со стоимостью
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: '/api/car/' + id,//URL фадрес,на который будет отправлен Ajix запрос
        type: 'PUT',// отправляет ти запроса
        contentType: 'application/json',// При отправке Ajiax pзапроса,данные передаются в том виде, в котором указаны в данном параметре
        data: JSON.stringify({// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            CarID: id,
            Name: name,
            Mark: mark,
            Speed: speed,
            Power: power,
            ConfigurationFK: configuration,
            ColorFK: color,
            Cost: cost
        }),
        success: function (data) {// Функия ,которая будет вызвана в случае успешного завершения запроса
            getCar();
            console.log(data);
        },
        statusCode: {
            401: function (data) {// функция в случае неудачного запроса
                $("#error-msg").modal('show');// отабразитьокно ошибки

            }
        }
    });
}

//Авторизация
function logIn() {
    var email = $('#Email').val();// переменной email передаем значение с поля с email
    var password = $('#Password').val();// переменной password передаем значение с поля с поролем
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: 'api/Account/Login',//URL фадрес,на который будет отправлен Ajix запрос
        type: 'POST',// отправляет ти запроса
        contentType: 'application/json',// При отправке Ajiax pзапроса,данные передаются в том виде, в котором указаны в данном параметре
        data: JSON.stringify({// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            email:email,
            password: password,
            rememberMe: Remember.checked,
        }),
        success: function (data) {
            let html = "";  //Текст вставки
            if (!data.error) {  //Если ошибка отсутсвует
                $('#login').modal('hide');   //Закрыть окно авторизации
            }
            else {  //Если ошибка есть
                html += "<div class=msgClass>";
                html += data.message;   //Сообщение об ошибкой
                html += "<strong>";
                for (var i in data.error) {
                    html += "<br>" + data.error[i]; //Описание самой ошибка
                }
                html += "</strong>";
                html += "</div>";
                $('#errorlogin').html(html);   //Добавление строк в html
            }
            getCurrentUser();   //Проверка на авторизацию(роль), чтобы вывести нужные данные
            getCar();
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}



//Выход из аккаунта
function logOff() {
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: 'api/Account/logoff',//URL фадрес,на который будет отправлен Ajix запрос
        type: 'POST',// отправляет ти запроса
        contentType: 'application/json',// При отправке Ajiax pзапроса,данные передаются в том виде, в котором указаны в данном параметре
        success: function (data) {// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            status_user = 0;    //Пользователь вышел из аккаунты
            getCurrentUser();
            getCar();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
//Проверка авторизации на сайте
function getCurrentUser() {
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: 'api/Account/isAuthenticated',//URL фадрес,на который будет отправлен Ajix запрос
        type: 'POST',// отправляет ти запроса
        contentType: 'application/json',// При отправке Ajiax pзапроса,данные передаются в том виде, в котором указаны в данном параметре
        success: function (data) {// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            if (data.result) {  //Проверка выполнен ли вход
                if (data.result[0] == "admin")
                    status_user = 2;    //Зашел админ
                if (data.result[0] == "user")
                    status_user = 1;    //Зашел пользователь
            }
            UserID = data.ld;// Присвоение id текущего пользователя
            let html = "";  //Текст вставки
            if (status_user == 0) { //Если пользователь не авторизован
                html += '<li><a href="#login"  data-toggle="modal" data-target="#login"><i class="glyphicon glyphicon-log-in"></i></a></li>';
            }
            else {  //Пользователь авторизован
                html += '<li class="nav-item"><a class="nav-link" href ="#">' + data.message + '</a ></li ><li class="nav-item"><a class="nav-link" onclick="logOff();" href="#">Выход</a></li>';//вывод email пользователя и вывод кнопки выход
            } 
            getCar();  //Обновить данные
            console.log(status_user);
            $('#logIn').html(html);
            console.log(data);
            console.log(UserID);
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
//добавить в корзину
function addBasket(id) {
    $.ajax({// выполняет асинхронный HTTP (Ajiax) запрос
        url: '/api/car/' + id,//URL фадрес,на который будет отправлен Ajix запрос
        type: 'GET',// отправляет ти запроса
        dataType: 'HTML',
        success: function (data) {// данные,которые будут переданы на сервер, JSON.stringify - преобразует значение Javascript в строку JSON
            let car = JSON.parse(data);
            let amount = 0;//количество в корзине
            let html = "";// строка вставки
            html += $('#orderbasket').html();
            html += "<div id ="+ car.carID +" class=\"row korzina\"><div class=\"col-md-4\">" + car.name + "</div>";
            html += "<input class=\"form-check-input\" type=\"checkbox\" cheked=\"cheked\" style=\"display:none\" value=\"" + car.carID + "\"></input>";
            html += "<div class=\"col-md-4\">Цвет:" + car.color.name + " </div>";
            html += "<div class=\"col-md-4\">Цена:" + car.cost + " ₽ ";
            html += "<button type=\"button\" class=\"closebtn\" onclick=\"remove("+ car.cost +","+ car.carID +")\">X</button></div>";
            amount = amount + 1;// при добавлении продукта, добавляем 1 к количеству
            sum = sum + car.cost;//пересчитывание суммы
            console.log(sum);
            console.log(car);
            $('#orderbasket').html(html);// вывод в окно
            $('#basketN').html(amount);
            $('#OrderSum').html("<p>К оплате: <strong>" + sum + "₽</strong></p>");//вывод суммы
        },
        statusCode: {
            401: function (data) {
                $("#error-msg").modal('show');// если ошибка

            }
        }
    });
}
//удаление из корзины
function remove(cost,id) {
    $("#" + id + "").remove();
    sum = sum - cost;//вычитаем цену удаленного продукта
    $('#OrderSum').html("<p>К оплате: <strong>" + sum + "р</strong></p>");
}
//Оформить заказ
function addOrder() {
    var adress = $('#inputAddress').val(); //Переменной adress передаем значение из поля с адресом
    var zakaz = []; //Массив с Id продуктов в козине
    var a = $('input:checked'); //Выбираем все отмеченные checkbox
    for (var x = 0; x < a.length; x++) { //Перебераем все объекты
        zakaz.push(a[x].value); //Добавляем значения в выходной массив
    }
    $.ajax({ //Выполняет асинхронный HTTP (Ajax) запрос
        url: '/api/order', //URL адрес, на который будет отправлен Ajax запрос
        type: 'POST', //Определяет тип запроса
        contentType: 'application/json', //При отправке Ajax запроса, данные передаются в том виде, в котором указаны в данном параметре
        data: JSON.stringify({ //Данные, которые будут переданы на сервер, JSON.stringify - преобразует значение JavaScript в строку JSON
            userFK: UserID,
            cost: sum, 
            address: adress
        }),
        success: function (data) { //Функция, которая будет вызвана в случае успешного завершения запроса, data - данные, которые прислал сервер
            for (var i in zakaz) { //Заполняем таблицу, которая разрывает связь многие ко многим между таблицами "продукты" и "заказ"
                $.ajax({
                    url: '/api/order_line',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        orderFK: data.orderID, //Id заказа
                        carFK: zakaz[i] //Id продуктов в корзине
                    }),
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                    }
                });
            }
            sum = 0;
            amount = 0;
            $('#orderbasket').html("");
            $('#inputAddress').val("");
            $('#OrderSum').html("");
            $('#basketN').html("");
            $('#ModalOrder').modal('hide'); //Закрыть окно корзины
            console.log(data);
            $('#Acceptorder').modal('show'); //Открыть окно с сообщением
        },
        statusCode: { //Кодам выполнения запроса сопоставляются функции, которые при этом будет вызваны
            401: function () {
                $("#error-msg").modal('show');
            }
        }
    });
}