# Способ и программные средства выбора сценариев управления рисками на основе нечетких автоматов

Разработанные программные средства используют клиент-серверную архитектуру. В данном репозитории находится код сервера.

![Рисунок 1](https://github.com/codeBurger770/farm-frontend/raw/master/readme/1.png)

## Клиент-серверная архитектура разработанных программных средств

![Рисунок 2](https://github.com/codeBurger770/farm-frontend/raw/master/readme/2.png)

## Логическая модель базы данных 

![Рисунок 3](https://github.com/codeBurger770/farm-frontend/raw/master/readme/3.png)

## События и риск-события
Событие – это то, что может произойти с определенной вероятностью.

`Ei=<D,P>`, где `E` – событие; `i` – номер события; `D` – описание события; `P` – вероятность наступления события.

Риск-событие – это то, что может произойти с определенной вероятностью и нанести ущерб.

`REi=<D,P,C>`, где `RE` – риск-событие; `i` – номер риск-события; `D` – описание риск-события; `P` – вероятность наступления риск-события; `C` – ущерб от наступления риск-события.

## Логический оператор И
Логический оператор И – данный оператор связывает входные события или риск-события с выходным событием или риск-событием. При наступление всех входных событий или риск-событий происходит наступление выходного события или риск-события.

`ANDi=<X1,X2,Y>`, где `AND` – логический оператор И; `i` – номер логического оператора И; `X1` – первое входное событие или риск-событие; `X2` – второе входное событие или риск-событие; `Y` – выходное событие или риск-событие.

Причем вероятность выходного события или риск-события вычисляется как:

`Py=min(Px1,Px2)`, где `Py` – вероятность выходного события или риск-события; `Px1` – вероятность первого входного события или риск-события; `Px2` – вероятность второго входного события или риск-события.

![Рисунок 4](https://github.com/codeBurger770/farm-frontend/raw/master/readme/4.png)

## Логический оператор ИЛИ
Логический оператор ИЛИ – данный оператор связывает входные события или риск-события с выходным событием или риск-событие. При наступлении хотя бы одного входного события или риск-события или всех событий или риск-событий происходит наступление выходного события или риск-события.

`ORi=<X1,X2,Y>`, где `OR` – логический оператор ИЛИ; `i` – номер логического оператора ИЛИ; `X1` – первое входное событие или риск-событие; `X2` – второе входное событие или риск-событие; `Y` – выходное событие или риск-событие.

Причем вероятность выходного события или риск-события вычисляется как:

`Py=max(Px1,Px2)`, где `Py` – вероятность выходного события или риск-события; `Px1` – вероятность первого входного события или риск-события; `Px2` – вероятность второго входного события или риск-события.

![Рисунок 5](https://github.com/codeBurger770/farm-frontend/raw/master/readme/5.png)

## Несколько логических операторов И или ИЛИ
Если несколько логических операторов И или ИЛИ приводят к наступлению одного события или риск-события, то вероятность выходного события или риск-события вычисляется по следующей формуле:

`Py=min(P1,P2,...,Pi,...,Pn), при i=1...n`, где `Py` – вероятность выходного события или риск-события; `i` – номер логического оператора И или ИЛИ; `Pi` – вероятность выходного события или риск-события логического оператора И или ИЛИ под номером i.

![Рисунок 6](https://github.com/codeBurger770/farm-frontend/raw/master/readme/6.png)

## Ситуация и риск-ситуация
Ситуация – это множество событий и риск-событий, приводящих к результирующему событию.

`Sei={e,re|e∈E,re∈RE}`, где `ei` – результирующие событие; `Sei` – ситуация, описывающая `ei`; `e` – событие; `re` – риск-событие; `E` – множество событий; `RE` – множество риск-событий.

Риск-ситуация – это множество событий и риск-событий, приводящих к результирующему риск-событию.

`RSrei={e,re|e∈E,re∈RE}`, где `rei` – результирующие риск-событие; `RS` – риск-ситуация, описывающая `rei`; `e` – событие; `re` – риск-событие; `E` – множество событий; `RE` – множество риск-событий.

## Нечеткий автомат
Структурно нечеткий автомат представляет собой ориентированный граф, узлами которого являются его состояния, а дуги характеризуют переходы между состояниями.

![Рисунок 7](https://github.com/codeBurger770/farm-frontend/raw/master/readme/7.png)

![Рисунок 8](https://github.com/codeBurger770/farm-frontend/raw/master/readme/8.png)

## Композиция нечетких автоматов для идентификации, анализа и оценивания событий и риск-событий
Структура событий и риск-событий:

![Рисунок 9](https://github.com/codeBurger770/farm-frontend/raw/master/readme/9.png)

Композиция нечетких автоматов:

![Рисунок 10](https://github.com/codeBurger770/farm-frontend/raw/master/readme/10.png)

## Способ построения композиции нечетких автоматов
*Этап 1*. Среди всех событий и риск-событий находятся начальные, это такие события и риск-события, которые не являются выходами логических операторов И или ИЛИ.

*Этап 2*. Для каждого начального события задается ситуация:

![Рисунок 11](https://github.com/codeBurger770/farm-frontend/raw/master/readme/11.png)

Затем создается нечеткий автомат:

![Рисунок 12](https://github.com/codeBurger770/farm-frontend/raw/master/readme/12.png)

![Рисунок 13](https://github.com/codeBurger770/farm-frontend/raw/master/readme/13.png)

*Этап 3*. Для каждого начального риск-события задается риск-ситуация:

![Рисунок 14](https://github.com/codeBurger770/farm-frontend/raw/master/readme/14.png)

Затем создается нечеткий автомат:

![Рисунок 15](https://github.com/codeBurger770/farm-frontend/raw/master/readme/15.png)

![Рисунок 16](https://github.com/codeBurger770/farm-frontend/raw/master/readme/16.png)

*Этап 4*. Для каждого логического оператора И задаются ситуации или риск-ситуации его входов и выхода.
Затем создается нечеткий автомат:

![Рисунок 17](https://github.com/codeBurger770/farm-frontend/raw/master/readme/17.png)

![Рисунок 18](https://github.com/codeBurger770/farm-frontend/raw/master/readme/18.png)

*Этап 5*. Для каждого логического оператора ИЛИ задаются ситуации или риск-ситуации его входов и выхода.
Затем создается нечеткий автомат:

![Рисунок 19](https://github.com/codeBurger770/farm-frontend/raw/master/readme/19.png)

![Рисунок 20](https://github.com/codeBurger770/farm-frontend/raw/master/readme/20.png)

## Сценарий управления рисками и мероприятия
Сценарий управления рисками – это совокупность мероприятий.

`SC={m|m∈M}`, где `SC` – сценарий управления рисками; `m` – мероприятие; `M` – множество мероприятий.

Мероприятие – это совокупность действий нацеленных либо на событие или риск-событие, либо на логический оператор И или ИЛИ.

`Mi=<T,D,C>`, где `M` – мероприятие; `i` – номер мероприятия; `T` – тип мероприятия; `D` – описание мероприятия; `C` – стоимость мероприятия.

## Способ выбора сценариев управления рисками на основе композиции нечетких автоматов
*Этап 1*. Задается количество сценариев `𝑁`, между которыми будет выбираться лучший сценарий управления рисками.

*Этап 2*. Среди всех событий и риск-событий находятся начальные, это такие события и риск-события, которые не являются выходами логических операторов И или ИЛИ.

*Этап 3*. Среди начальных событий и риск-событий находятся начальные активные события и риск-события.

*Этап 4*. Подаем все начальные активные события и риск-события на композицию нечетких автоматов, тем самым получая все активные события и риск-события.

*Этап 5*. Подсчитываем общий ущерб, как сумму ущербов всех активных риск-событий:

`TCre=∑Cre`, где `TCre` – общий ущерб; `Cre` – ущерб одного активного риск-события.

*Этап 6*. Формируем сценарий управления рисками 𝑆𝐶, как пул случайных мероприятий и применяем его.

*Этап 7*. Подсчитываем стоимость сценария управления рисками по следующей формуле:

`Csc=∑Cm`, где `Csc` – стоимость сценария управления рисками; `Cm` – стоимость одного мероприятия из сценария управления рисками.

*Этап 8*. Повторяем этапы с 2 по 5. Если новый общий ущерб `TCre` меньше старого и стоимость сценария управления рисками `Csc` не превышает новый общий ущерб, то помещаем кортеж `<SC,TCre,Csc>` в массив всех сценариев управления рисками.

*Этап 9*. Если в массиве всех сценариев управления рисками достаточно сценариев, то есть совпадает с количеством сценариев `𝑁`, то переходим к этапу 10, а иначе к этапу 6.

*Этап 10*. Среди сценариев из массива всех сценариев управления рисками выбираем тот, у которого наименьший общий ущерб и наименьшая стоимость:

`TCre→min` и `Csc→min`

## Оценка целостности и работоспособности при динамических изменениях для модели композиция нечетких автоматов
Исходная композиция нечетких автоматов:

![Рисунок 21](https://github.com/codeBurger770/farm-frontend/raw/master/readme/21.png)

Результат удаления логического оператора ИЛИ, на вход которого подается RE3 и RE4, а на выходе RE5:

![Рисунок 22](https://github.com/codeBurger770/farm-frontend/raw/master/readme/22.png)