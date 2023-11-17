# Vue-lessons-2023

This template should help get you started developing with Vue 3 in Vite.

**Recommended IDE Setup:**  
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
See [Vite Configuration Reference](https://vitejs.dev/config/).

## Початок

### Вступ

**Vue** - фреймворк для JS, створений для розробки користувацьких інтерфейсів. Працює на базі HTML, CSS, JS з можливістю декларативно програмувати користувацькі інтерфейси на основі компонентів.

**Способи використання Vue:**
\- розширення статичного HTML,  
\- вбудовування як веб-компонента в будь-яку сторінку,  
\- створення односторінкового додатку (SPA),  
\- фулстек / додаток з рендеронгом на стороні серверу (SSR),  
\- jamstack / генерація статичного додатку (SSG),  
\- створення десктопних, мобільних, WebGL додатків, навіть додатків для термінала.

У проектах Vue використовуються компоненти HTML-подібного формату Single-File Component (SFC, \*.vue). SFC інкапсулює логіку JS, шаблон HTML та стилі CSS в одному файлі.

Компоненти можна створювати в двох різних стилях API:  
**опційний API** побудовано навколо концепції "екземпляра компонента", краще узгоджуєтсья з розробкою на основі класу, більш зручний для початківців;  
**композиційний API** побудовано навколо концепції оголошення реактивних змінних безпосередньо в області функції, для складніших компонентів/випадків.

### Швидкий старт

Має бути встановлений Node.js >= 16.0.

1. `npm create vue@latest` - швидке розгортання vue проекта на базі vite (з опціями).
2. `cd projecName` - перехід до директорії з проектом.
3. `npm install` - встановити необхідні для роботи пакети.
4. `npm run dev` - компіляція та сервер з заміною для розробки.
5. `npm run build` - компіляція та упаковка для продакшена.

## Основи

### Створення додатку

Кожен додаток починається зі створення нового **екзкмпляру додатку** функцією `createApp()`.

```js
import { createApp } from "vue";
const app = createApp({});
```

Корневий компонент містить інші дочірні компоненти. При використанні Однофайлових компонентів зазвичай корневий компонент імпортується з іншого файлу.

```js
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
```

Для рендеру екземпляра додатка необхідно викликати метод `.mount()`, приймає аргумент-контейнер, який може бути актуальним DOM-елементом або радком-селектором.

```js
app.mount("#app");
```

Вміст корневого компонента рендериться всередині контейнера, сам контейнер не є частиною додатка.  
Метод `.mount()` має бути викликаний після всіх налаштувань та реєстрації додаткових ресурсів.  
Шаблон корневого компонента зазвичай є частиною самого компонента, але може бути наданий окремо, написаний безпосередньо в контейнері для монтування.  
Екземпляр додатка надає доступ до об'єкта `.config`, що дозволяє налаштувати кілька параметрів на рівні додатка, а також забезпечує кілька методів реєстрації ресурсів.  
API `createApp` дозволяє декільком додаткам співіснувати на одній сторінці, кожен з яких має свою область конфігурації та глобальних ресурсів.

### Синтаксис шаблону

Інтерполяція тексту - найпростіша форма прив'язування даних `{{ msg }}`. Тег "вуса" буде замінений на значення переданої властивості (msg) з відповідного компонента екземпляра як текст.

Для введення html-коду використовується директива `v-html=""`. Вміст елемента з даною директивою буде замінений на значення переданої властивості, інтерпретованого як HTML.

Директива `v-bind:attr="dinamic"` наказує підтримувати синхронізацію атрибута елемента з переданою властивістю (при null та undefined видаляється). Скорочений вигляд `:attr="dinamic"`. Для динамічного прив'язування кількох атрибутів в директиву передається об'єкт з атрибутами `v-bind="attrObj"`, `const attrObj = {id: 'container', class: 'wrapper'}`

Всередині інтерполяції тексту та в значенні атрибута директив можна використовувати JS вирази, у виразі прив'язки можна викликати метод, відкритий для компонентів:

```js
{{ number + 1}}
{{ ok ? "Yes" : "No"}}
{{ message.split("").reverse().join("")}}
<div :id="`list-${id}`"></div>
<time :title="toTitleDate(date)" :datetime="date"> {{formatDate(date)}} </time>
```

**Директиви** - спеціальні атрибути з префіксом `v-`. Vue надає ряд вбудованих директив. Зазвичай очікуваним значенням директиви є окремі вирази JS. Їх завдання полягає в реактивному застосуванні оновлень до DOM при зміні значення виразу. Н-д `v-if` видаляє/вставляє елемент на основі правдивості значення виразу.  
Деякі директиви приймають **аргумент**, позначений двокрапкою: `v-bind:href="url"` аргумент _href_ прив'язує атрибут _href=""_ до значення виразу _url_.  
В аргументі директиви можна використовувати вираз JS, загорнувши його в квадратні дужки: `v-bind:[attrname]="url"`. В такому випадку значення null видалить прив'язку.  
Особливий спосіб зв'язки події позначають **модифікатори** - спеціальні постфікси, позначені крапкою (н-д v-on:submit.prevent="onSubmit" викличе event.preventDefault() для події).

### Основи реактивності

Рекомендований спосіб оголосити реактивний стан - функція `ref()`. Вона приймає аргумент і повертає його в об'єкті ref із властивістю `.value`:

```js
import { ref } from "vue";
const count = ref(0);
console.log(count.value); // 0
```

Для використання реактивного стану у шаблоні компонента потрібно оголосити його в функції setup() компонента. При цьому в шаблоні не потрібно додавати .value під час використання.

При використанні SFC можна спростити використання за допомогою `<script setup>`:

```html
<script setup>
	import { ref } from "vue";
	const count = ref(0);
	function increment() {
		count.value++;
	}
</script>
<template>
	<button @click="increment">{{ count }}</button>
</template>
```

Імпорт верхнього рівня, змінні та функції, оголошені в script setup, автоматично придатні для використання в шаблоні того самого компонента, як якби він був фукцією тієї ж області видимості.

Референції, навідміну від простих змінних, дають можливість реагувати на зміни стану і відразу ініціювати зміну компоненту (як через гетер та сетер).

Посилання можуть містити будь-які типи значень, у т.ч. глибоко вкладені об'єкти, масиви, вбудовані СД JS. Посилання зробить його глибоко реактивним, тобто зміни будуть виявлятись навіть для вкладених структур.

При зміні реактивного стану DOM оновлюється автоматично, але не синхронно. Vue буферизує змінні до наступного тіку в циклі оновлення для разового оновлення компонента незалежно від кількості змін. Дочекатись завершення оновлення можна за допомогою nextTick() Vue API.

Інший спосіб оголосити реактивний стан - функція `reactive()`, робить сам об'єкт реактивним.

```html
<script setup>
	import { reactive } from "vue";
	const state = reactive({ count: 0 });
</script>
<template>
	<button @click="state.count++">{{ state.count }}</button>
</template>
```

Реактивні об'єкти є Proxy, поводяться так само як звичайні об'єкти, але Vue здатний перехоплювати доступ і мутацію всіх властивостей реактивного об'єкта.

Ф-я reactive() глибоко перетворює об'єкт, вкладені об'єкти також загортаються. Він також внутрішньо викликається ref(), якщо значення є об'єктом. Для відмови від глибокої реактивності використовується `shallowReactive()`.

Реактивним є лише проксі - зміна оригінального об'єкта не призведе до оновлення. Бажано використовувати виключно проксі-версії стану. Виклик reactive() для одного об'єкта або його проксі повертає той самий проксі. Через глибоку реактивність вкладені об'єкти - також проксі.

API `reactive()` працює лише для об'єктів, вимагає збереження посилання на реактивний об'єкт, не підтримує деструктурування. Так рекомендованим методом є `ref()`.

### Обчислювальні властивості

Вбудовані в шаблони вирази досить зручні для простих разових дій. Більш складні дії з великою кількістю логічних операцій краще обробляти за допомогою **обчислювальних властивостей**. Ф-я `computed()` повертає обчислювальну референцію. Доступ до обчислювального результату через `.value`, автоматично розпаковується всередині шаблона. Обчислювальна властивість автоматично відстежує свої реактивні залежності.

```html
<script setup>
	import { reactive, computed } from "vue";
	const author = reactive({
		name: "John",
		books: ["BookName1", "BookName2"],
	});
	const publishedBooksMessage = computed(() =>
		author.books.length > 0 ? "Yes" : "No"
	);
	function getMessage() {
		return publishedBooksMessage.value;
	}
</script>
<template>
	<p>
		Has published books: <span> {{ publishedBooksMessage }}</span>
	</p>
</template>
```

Навідміну від метода для обчислення значення, обчислювальні властивості кешуються на основі їх реактивних залежностей і перераховуються лише при їх зміні.

Якщо обчислювальна властивість має бути записувана, їй явно прописується геттер і сеттер.

```js
const firstName = ref("John");
const lastName = ref("Doe");
const fullName = computed({
	get() {
		return firstName.value + " " + lastname.value;
	},
	set(newValue) {
		[firstName.value, lastName.value] = newValue.split(" ");
	},
});
```

Обчислювальні геттери мають бути без побічних ефектів, лише для обчислення та повернення значення на основі інших. Краще уникати сеттерів.

### Прив'язування класів та стилів

Оскільки `class` та `style` - атрибути, використовуються разом з `v-bind`, окрім рядків можуть бути обчислені як об'єкти або масиви.

```html
<div :class="{ active: isActive }"></div>
<!-- Клас "active" буде автоматично призначений при (isActive === true) -->
<div
	class="static"
	:class="{ active: isActive, 'text-danger': hasError }"
></div>
<!-- Також можна визначити декілька класів як поля в об'єкті, разом зі звичайним класом -->
<div :class="classObject"></div>
<!-- Замість визначення напряму в шаблоні може бути переданий визначений реактивний клас -->
<div :class="[activeClass, errorClass]"></div>
<!-- Значення класів може бути передано масивами -->
```

Поширена і потужна модель - прив'язувати обчислювальні властивості, які повертають об'єкт:

```js
const isActive = ref(true);
const error = ref(null);
const classObject = computed(() => ({
	active: isActive.value && !error.value,
}));
```

Прив'язування вбудованих стилів до об'єктних значень JS підтримує `:style` (узгоджено з властивістю style). Рекомендовано використовувати camelCase, підтримуються ключі і в kebab-case. Прив'язування до об'єкта стилю допомагає підтримувати шаблон чистішим. Прив'язування до масивів дозволить додати декілька об'єктів стилів. Префікси автоматично додаються Vue за потреби. Множинні значення (з префіксами) будуть використовувати останнє підтримуване браузером.

```html
<div
	:style="{ fontSize: fontSize + 'px', 'font-family': fontFamily }"
></div>
<div :style="styleObject"></div>
<div :style="[baseStyles, overridingStyles]"></div>
<div
	:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
></div>
```

### Умовний рендеринг

Директива `v-if` дозволяє згенерувати блок дише при правдивому значенні, `v-else` та `v-else-if` доповнюють умовну логіку:

```html
<div v-if="type === 'A'">Type A</div>
<div v-else-if="type === 'B'">Type B</div>
<div v-else>Unknown</div>
Виводиться лише один блок відповідно до значення змінної
```

Директиви `v-if`, `v-else-if`, `v-else` можуть бути застосований до всього шаблону в елементі `<template>`. Фінальний результат рендеру не містить `<template>`.

Іншу можливість умовного показу надає директива `v-show` з аналогічним використанням. Не підтримується елементом template, не працює з v-else.

Навідміну від v-if, v-show лише перемикає властивість display, елемент завжди згенерований і лишається в DOM.

`v-if` впливає на "справжній" рендеринг, під час перемикання забезпечує належне видалення та створення слухачів подій та дочірніх елементів. При неправдивій умові на початку рендеринга не генерує блок до настання правдивості. `v-else` завжди згенерований попри початкову умову. `v-if` має вищу вартість при перемиканні, `v-show` - при початковому рендерингу.

### Рендеринг списків

Директива `v-for` дає можливість рендерити **список елементів**, основаних на масиві. Виводить відповідні елементи в кількості, яка відповідає масиву. Приймає необов'язковий псевдонім для індексу елемента (v-for="(item, index) in items").

```js
const items = ref(["Anna", "Sam"]);
```

```html
<li v-for="item in items">{{ item }}</li>
Виведе два елемента li з відповідним строковим наповненням
```

Область видимості схожа до циклу forEach. В v-for можна використовувати деструктуризацію (v-for="({message}, index) in items"). Область видимості вкладених v-for подібна до області видимості вкладених ф-й. Підтримує також роздільник `of` замість `in`.

Директиву `v-for` можна використовувати для **ітерування властивостей об'єкта**. Порядок ітерації оснований на результаті виклику Object.keys(). Другий опціональний псевдонім для назви ключа, третій - для індексу.  
Директива `v-for` може приймати **число** і повторювати шаблон відповідно до діапазону `1..n`.

```js
const myObject = reactive({
	title: "How to create lists on Vue",
	author: "John Smith",
	date: "2023-11-07",
});
```

```html
<li v-for="value in myObject">{{value}}</li>
<span v-for="n in 10">{{ n }}</span>
```

Може використовуватися в елементі `<template>` для рендерингу блоку з множинними елементами. При співіснуванні `v-if` має вищій пріоритет ніж `v-for`, не рекомендовано використовувати на одному елементі. В таких ситуаціях `v-for` краще перемістити в обгортаючий тег.

Підтримка стану за допомогою `key`.

`v-for` з компонентом.

Vue здатний виявляти мутації реактивного масиву і запускати необхідні оновлення (push, pop, shift, unshift, splice, sort, reverse). При роботі з немутуючими методами (filter, concat, slice), які повертають новий масив, потрібно замінити старий масив на новий. Vue намагається максимально повторно використовувати елементи DOM, тому заміна масиву з одними елементами досить ефективне.

```js
items.value = items.value.filter(item => item.message.match(/Foo/));
```

Для відображення відфільтрованого/відсортованого масиву без зміни вихідних даних можна створити обчислювальну властивість або функцію. Для методів, які видозмінюють масив, необхідно створити копію вихідного.

### Обробка подій

Для прослуховування подій DOM викор-ся директива з атрибутом `v-on:click="handler"`, зазвичай скорочена до `@click="handler`. Значення обробника може бути вбудованим обробником (в простих випадках) або обробником методів.

```html
<button @click="count++">Increase</button
><span>Count: {{count}}</span>
<button @click="handlerName">Run handler</button>
<!-- метод визначено раніше-->
```

У вбудованих обробниках можна викликати метод для передачі спеціальних аргументів замість рідної події. Доступ до аргументу події у вбудованому обробнику можна отримати за допомогою спеціальної змінної `$event` або використання стрілкової ф-ї.

```html
<button @click="warn(`Cannot send the form`, $event)">Send</button>
<button @click="(event) => warn(`Cannot send the form`, event)">
	Send
</button>
```

Модифікатори `v-on` дають можливість додавати особливості виконання.
`.stop` викликає event.stopPropagation();  
`.prevent` викликає event.preventDefault();
`.self` викликає обробник лише якщо event.target є самим елементом (не з дочірнього);
`.capture`, `.once`, `.passive` вказують на параметри власного методу addEventListener.  
Модифікатори можуть бути розташовані ланцюжком.

Ключові модифікатори для подій клавіатури підтримують будь-які назви ключів, надані через KeyboardEvent.key в kebab-case (@keyup.page-down="handler"). Також Vue надає псевдоніми для найбоільш використовуватих ключів: `.enter`, `.tab`, `.delete`, `.esc`, `.space`, `.up`, `.down`, `.left`, `.right`; та модифікатори для запуску подій лише при натиснутих клавішах-модифікаторах системи: `.ctrl`, `.alt`, `.shift`, `.meta`. Модифікатор `.exact` дозволяє вказати точну комбінацію клавіш (@click.ctrl.exack="handler" спрацює лише при натиснутій ctrl і ніяких більше).

Модифікатори `.left`, `.right`, `.middle` обмежують обробник, викликаний певною кнопкою миші.

### Прив'язування елементів форми

Директива `v-model` дає можливість синхронізувати стан елементів введення форми зі станом у JS. Можна використовувати для елементів різних типів:  
`<input` з текстовими типами та `<textarea>` викор-ть вл-ть `value` та подію `input`,  
`<input type="checkbox">` та `<input type="radio">` викор-ть вл-ть `checked` та подію `change`,  
`<select>` викор-є вл-ть `value` та подію `change`.  
Ігноруватиме початкові атрибути value, checked, selected, розглядаючи поточний стан JS як джерело правди. Початкове значення слід оголосити на стороні JS, використовуючи API реактивності.

```html
<p>Message: {{ message }}</p>
<input
	v-model="message"
	placeholder="Change me"
/>
<input
	type="checkbox"
	id="checkbox"
	v-model="checked"
/>
<label for="checkbox">{{ checked }}</label>
```

Можна прив'язати кілька прапорців до одного масиву або значення Set. У цьому випадку структура міститиме значення поточних прапорців:

```html
<input
	type="checkbox"
	value="First"
	v-model="checkedValues"
/>
<input
	type="checkbox"
	value="Second"
	v-model="checkedValues"
/>
```

Checkbox при відсутності value передає true/false, при наявності - value якщо відмічений. Також Vue надає спеціальні атрибути **true-value** і **false-value**, значення яких передаються за відповідного стану. Значення можна прив'язати динамічно директивою v-bind (:true-value="dynamicTrueValue").

Директива v-model підтримує прив'язування нерядкових значень (:value="{number: 123}").

`.lazy` синхронізує після подій `change`, а не `input`;  
`.number` автоматично перетворює введені дані в числові;  
`.trim` автоматично обрізає введені пробіли.

### Хуки життєвого циклу

Кожен екземпляр компонента проходить ряд етапів, попутно запускаючи функції, які називаються **хуками життєвого циклу** і надають можливість додавати власний код на певних етапах.

Усі хуки прив'язують контекст **this** до поточного екземпляра для доступу.

Хук `onMounted` запускає код після завершення початкового рендерингу і створення DOM вузлів. Коли викликається, Vue автоматично пов'язує зареєстрований колбек з поточним активним екземпляром компонента.

Етапи життєвого циклу екземпляра:  
\- Рендер стикається з компонентом
\--- setup (для композиційного API)
\--- beforeCreate
\- Ініціалізація Опційного API
\- Якщо не має попередньо скомпільований шаблон - компіляція шаблону
\--- beforeMount
\- Початковий рендеринг, створення і вставлення DOM вузлів
\--- mounted
\- Змонтовано
\- при зміні даних
\--- beforeUpdate
\--- updated
\- при демонтуванні
\--- beforeUnmount
\--- unmounted (демонтовано)

### Спостерігачі

Обчислювальні властивості дозволяють декларативно обчислювати похідні значення. **Спостерігачі** дають змогу створити побічні ефекти у відповідь на зміну стану. За допомогою композиційного API використовується функція `watch` для ініціації колбеку при кожній зміні реактивного стану.

Першим аргументом можуть бути різні типи реактивних джерел: референції (влючаючи обчислювальні), реактивні об'єкти, геттер або масив із кількох джерел. Властивість реактивного об'єкта спостерігати не можна, замість цього краще використовувати геттер.

```js
const count = reactive({ value: 0 });
watch(count, changed => {
	cosnole.log(`New value is ${changed.value}`);
});
// watch(count.value, (newValue) => {console.log("Does not work!!")})
watch(
	() => count.value,
	newValue => {
		console.log("It works");
	}
);
```

Коли `watch` викликається безпосередньо для реактивного об'єкта, неявно створюється глибинний спостерігач, колбек викликається для всіх вкладених змін (старе і нове значення вказують на один об'єкт). Якщо ж викликається для геттера, то виклик запускається лише після повернення іншого об'єкта. Примусово привести у глибинний спостерігач дозволяє опція `deep`.

За умовчуванням колбек буде викликано при першій зміні спостережуваного джерела. Для невідкладного виклику використовується опція `immediate`.

Альтернативним засобом є ф-я `watchEffect()`, яка дозволяє негайно виконати побічний ефект, автоматично відстежуючи реактивні залежності ефекту. При великій кількості залежностей дає змогу не підтримувати їх список вручну. Може виявитись ефективнішим, ніж глибокий спостерігач, бо відстежуватиме лише властивості, використовувані в колбеку.

```js
watchEffect(() => {
	console.log(`New value is ${count.value}`);
});
```

За заумовчуванням користувацькі колбеки спостерігача викликаються перед оновленням компонента. Відповідно DOM буде у стані до внесення Vue оновлень. Для виклику колбека після оновлення потрібно вказати опцію `flush: post` для watch або викликати `watchPostEffect`.

Спостерігачі, оголошені синхронно в `<script setup`, прив'язані до екземпляра компонента-власника і будуть автоматично зупинені при його демонтуванні. Краще надавати перевагу синхронним. Спостерігачі, викликані **асинхронно** необхідно зупиняти вручну за допомогою поверненої watch або watchEffect ф-ї:

```js
const unwatch = watchEffect(() => {});
unwatch(); // пізніше, коли спостерігач непотрібен
```

### Референції в шаблонах

Спеціальний атрибут `ref` дає можливість отримати пряме посилання на певний елемент DOM або екземпляр дочірнього компонента після його монтування.

```js
const input = ref(null);
onMounted(() => {
	input.value.focus();
});
```

```html
<input ref="input" />
```

Отримати доступ до референції можна лише **після монтування компонента**, елемент існує лише після першого рендера. У випадках спостереження за змінами посилання шаблону необхідно вказати випадок, коли він дорівнює null.

Якщо `ref` використовується всередині `v-for`, відповідна референція має містити масив, який буде заповнено елементами після монтування. Масив референцій не гарантує порядок вихідного масиву.

Референції в функціях

Референція компонента

### Основи компонентів

Компоненти дозволяють нам розділити інтерфейс користувача на незалежні частини, які можна багаторазово використовувати, і думати про кожну частину окремо. Зазвичай програму організовують у дерево вкладених компонентів.

Коли використовується етап збірки, як правило, кожен компонент визначається у спеціальному файлі з розширенням `.vue`, відомого як однофайловий компонент (SFC).

Для використання дочірнього компонента його необхідно імпортувати в батьківський. За допомогою `<script setup` імпортовані компоненти автоматично стають доступними для шаблону. Також можна глобально зареєструвати компонент, відкривши доступ для всіх компонентів без необхідності імпорту.

```js
import ButtonCounter from "./ButtonCounter.vue";
```

При використанні компонента створюється його окремий екземпляр, кожен має свій незалежний стан.

```html
<h1>Independent counters:</h1>
<div><ButtonCounter /></div>
<div><ButtonCounter /></div>
```

**Реквізити** - власні атрибути, які можна зареєструвати в компоненті. Реквізити оголошуються в через макрос `defineProps`, який доступний лише в script setup, і який повертає об'єкт з усіма властивостями, переданими компоненту для доступу з JS. Після реєстрації реквізиту можна передати йому дані як спеціальний атрибут.

```js
const props = defineProps(["title"]);
console.log(props.title);
```

```html
<BlogPost title="My blog title" />
<!-- для списку елементів на основі масива об'єктів динамічно -->
<BlogPost
	v-for="post in posts"
	:key="post.id"
	:title="post.title"
/>
```

**Прослуховування подій** в дочірніх компонентах батьківським компонентом відбувається за допомогою системи подій. Прослуховувач події вказується в батьківському компоненті, дочірні компоненти створюють події, викликаючи вбудований метод `emit`, передаючи назву події. Додатково можна задокументувати випромінені події за допомогою макросу `defineEmits`.

```html
<!-- parrent element-->
<BlogPost @eventName="doSmth" />
```

```html
<!-- child element -->
<button @click="$emit('eventName')">Do SMTH</button>
```

Передавати вміст до компонента дає можливість елемент `<slot>`, який буде замінений вмістом:

```html
<!-- тег <slot/> буде замінений вмістом-->
<AlertBox>Something went wrong</AlertBox>
```

Динамічно перемикати між компонентами дає можливість елемент `<component>` зі спеціальним атрибутом `is`, який може містити рядок імені зареєстрованого компонента або фактично імпортований об'єкт компонента.

```js
// попередній імпорт компонентів Home.vue, Posts.vue, Archive.vue
const currentTab = ref("Home");
const tabs = { Home: Home, Posts: Posts, Archive: Archive };
```

```html
<button
	v-for="(tab, label) in tabs"
	@onclick="currentTab = label"
></button>
<!-- відображає лише поточну вкладку -->
<component :is="tabs[currentTab]"></component>
```

## Компоненти поглиблено

### Реєстрація

Компоненти треба зареєструвати, щоб Vue знав, де їх знайти при зустрічі в шаблоні. Компоненти реєструються глобально і локально.

**Глобальна реєстрація** відбувається за допомогою `app.component()`, такі еомпоненти доступні у всьому додатку. При цьому глобальна реєстрація не дозволяє системі збірки видаляти невикористані компоненти і робить залежність менш явною.

```js
import { createApp } from "vue";
const app = createApp({});
app.component("ComponentA", ComponentA);
```

**Локальна реєстрація** поширює доступність зареєстрованих компонентів лише для поточного компонента. При використанні SFC з script setup, імпортовані компоненти використовуються локально **без реєстрації**; без script setup потрібно використовувати пораметр **components**. Локально зареєстровані компоненти доступні лише для поточного компонента але не для його нащадків.

```html
<script setup>
	import ComponentA from "./ComponentA.vue";
</script>
```

```js
import ComponentA from "./ComponentA.js";
export default {
	components: { ComponentA },
};
```

### Реквізити

Компоненти Vue вимагають явного оголошення реквізитів, щоб знати, які зовнішні реквізити слід розглядати як прохідні атрибути. За використання script setup реквізити оголошуютсья за допомогою `defineProps()`, інакше за допомогою параметра `props`. В обох випадках використовується той самий API параметрів реквізитів. Також можна використовувати об'єктний синтаксис.

```js
const props = defineProps(["foo"]);
console.log(props.foo);
```

```js
export default {
	props: [foo],
	setup(props) {
		console.log(props.foo);
	},
};
```

```js
defineProps({
	title: String,
	likes: Number,
});
```

Для оголошення імен реквізитів використовується camelCase, для передачі реквізитів - kebab-case, для тегів компонентів - PascalCase. Статично передається рядкове значення, динамічно - js-вираз (змінні, числа, бул, масив, об'єкт тощо). Всі властивості об'єкта можна передати як реквізит за допомогою `v-bind` без аргументу.

```html
<PageTitle title="My posts" />
<BlogPost
	:title="post.title"
	:lines="4"
	:isPrivate="false"
/>
<!-- всі властивості об'єкта user -->
<User v-bind="user" />
```

Реквізити формують **односторонній зв'язок** між дочірньою та батьківською властивістю. Будь-яких можливостей для зміни батьківських дочірніми потрібно уникати, використовуючи натомість випромінення подій.

Компоненти можуть вказувати вимоги до своїх реквізитів (через об'єкт для defineProps):  
`propA: Number` приймає лише вказаний тип, null та undefined дозволяють будь-який;  
`propB: [String, Number]` вказує кілька можливих типів;  
`propC: {type: String, required: true}` вказує на обов'язковіть реквізита;  
`propD: {type: Number, default: 100}` задає значення за умовчуванням;  
також можна передати об'єкт зі значенням за умовчуванням, вказати спеціальну ф-ю перевірки або ф-ю за умовчуванням.  
Відсутні bool реквізити переводяться в false, інші в undefined.

### Події

Компонент може випромінювати спеціальні події безпосередньо у виразах шаблону (н-д в v-on), використовуючи вбудований метод `$emit`. Батьки можуть прослуховувати це за допомогою v-on. Модифікатор `.once` підтримується слухачами подій. Підтримує автоматичне перетворення регістру. Навідміну від нативних подій, спеціальні не випливають.

```html
<button @click="$emit('someEvent')">Push</button>
```

```html
<MyComponent @some-event.once="callback" />
```

Додаткові аргументи $emit використовуються як аргументи події. При прослуховуванні доступ до аргументів надається через стрілкову ф-ю або передаються в метод.

```html
<MyButton @increase-by="(n) => count += n" />
<MyButton @increase-by="increaseCount" />
```

Поза шаблоном в script setup використовуються макрос `defineEmits()`, повертає еквівалентну до $emit ф-ю. Без script setup події оголошуються за допомогою опції `emits`. Рекомендується визначати всі випромінювані події. Власні події перекривають нативні.

```js
// в script setup
const emit = defineEmits(["inFocus", "submit"]);
function buttonClick() {
	emit("submit");
}
```

```js
// без script setup
export default {
	emits: ["inFocus", "submit"],
	setup(props, ctx) {
		ctx.emit("submit");
	},
};
```

Перевірка подій відбувається за допомогою синтаксису об'єкта. Події призначається ф-я, що отримує призначені аргументи і повертає логічне значення.

```js
const emit = defineEmits({
	submit: ({ email, password }) => {
		if (email && password) return true;
		throw Error("Invalid data");
		return false;
	},
});
```

### v-model з компонентами

Директива `v-model` використовується в компоненті для двостороннього прив'язування. За умовчуванням використовує `modelValue` як реквізит і `update:modelValue` як подію.

```html
<CustomInput v-model="searchText" />
<!-- is equal to -->
<CustomInput
	:model-value="searchText"
	@update:model-value="newValue => searchText = newValue"
/>
```

Реалізація в компоненті передбачає:  
\- прив'язку value рідного елемента до реквізиту і випромінення події при нативній input;  
\- використання обчислювальної властивості, геттер повертає реквізит, а сеттер випромінює подію.

```html
<!-- CustomInput.vue -->
<script setup>
	defineProps(["modelValue"]);
	defineEmits(["update:modelValue"]);
</script>
<template>
	<input
		:value="modelValue"
		@input="$emit('update:modelValue, $event.target.value')"
	/>
</template>
```

```html
<script setup>
	const props = defineProps(["modelValue"]);
	const emit = defineEmits(["update:modelValue"]);
	const value = computed({
		get() {
			return props.modelValue;
		},
		set(value) {
			emit("update:modelValue", value);
		},
	});
</script>
<template>
	<input v-model="value" />
</template>
```

Аргумент директиви `v-model:title="bookTitle"` дає можливість замінити імена реквізиту і події (на title і update:title відповідно для вказаного випадку). Використовуючи аргумент можна створити кілька прив'язок v-model до екземпляра компонента.

Для використання користувацьких модифікаторів defineProps описується синтаксисом об'єкта, де додається реквізит `modelModifiers: { default: () => ({}) }` за умовчуванням. Тоді реквізит буде містити об'єкт з полем модифікатора і значенням true. Використання модифікаторів з аргументами передбачає додавання відповідного реквізита модифікаторів з суфіксом `*Modifiers` (titleModifiers).

```html
<UserName
	v-model:first-name.capitalize="first"
	v-model:last-name.uppercase="last"
/>
```

```js
const props = defineProps({
	firstName: String,
	lastName: String,
	firstNameModifiers: { default: () => ({}) },
	lastNameModifiers: { default: () => ({}) },
});
defineEmits(["update:firstName", "update:lastName"]);
```

### Прохідні атрибути

**Прохідний атрибут** - атрибут або слухач подій, який передається компоненту але **не** оголошується явно в реквізитах або випромінюваннях приймаючого компонента. Типові приклади - атрибути class, style, id тощо. Коли компонент рендерить один корневий елемент, прохідні атрибути автоматично додаються до атрибутів корневого елемента.  
Прохідний атрибут class або style зливається з наявним.  
Слухачі подій також додаються до корневого елемента, при наявності викликаються обидва.  
Якщо корневим компонентом є інший компонент, прохідні атрибути будуть перенаправлені далі, а реквізити і слухачі спожиті компонентом.

```html
<!-- App.vue -->
<MyButton class="large" />
<!-- MyButton.vue -->
<button class="btn">Push</button>
<!-- render -->
<button class="btn large">Push</button>
```

Для відключення автоматичного наслідування, встановлюється `inheritAttrs: false` в параметрах компонента (н-д для застосування до інших елементів а не кореневого). В виразах шаблону прохідні атрибути можна отримати як `$attrs` (всі атрибути, не оголошені параметрами props або emits). Слухачі подій будуть вставлені як функція з 'on-' ($attrs.onclick).

Компоненти з кількома корневими вузлами не мають автоматичної поведінки проходу атрибутів. В такому випадку потрібно явно вказати v-bind="$attrs" для вузла.  
Доступ до прохідних атрибутів з JS отримується через API `useAttrs()` в script setup, або властивість контексту setup() `ctx.attrs`.  
Об'єкт attrs не є реактивним, не можна використовувати спостерігачі за його змінами, для цього є реквізити.

```js
defineOptions({
	inheritAttrs: false,
});
const attrs = useAttrs();
```

### Слоти

Елемент `<slot>` (одинарний або подвійний) дає можливість відтворити на своєму місці вміст, переданий батьківським шаблоном. Вмістом може бути текст, кілька елементів, інші компоненти тощо. Вміст слота має доступ до даних батьківського компонента, оскільки визначений в ньому, але не до даних дочірнього. Всередині подвійного тега slot можна вказати вміст за умовчуванням.

```html
<!-- App.vue -->
<MyButton>Press</MyButton>
<!-- MyButton.vue -->
<button class="btn"><slot /></button>
<!-- render -->
<button class="btn">Press</button>
```

Для передачі кількох виводів використовуються іменовані слоти і елемент template з директивою v-slot (#) в батьківському шаблоні. За умовчуванням слот має ім'я default. Вміст поза template відноситься до default слота. Динамічні назви слотів визначаються з допомогою `#[slotName]`.

```html
<!-- App.vue -->
<MyComponent>
	<template v-slot:btn>Press</template>
	Inner text
	<template #link>Read more</template>
</MyComponenet>
<!-- MyComponent.vue -->
<button><slot name="btn" /></button>
<p><slot /></p>
<a href=""><slot name=:link /></a>
```

**Обмежені слоти**

### Provide / inject

Надати реквізити дочірнім компонентам глибоко в ланцюгу без їх прокидання можна за допомогою `provide` і `inject`, викликаються **синхронно** в script setup або setup().

Функція `provide()` отримує: ключ введення (рядок або Symbol) та надане значення. Значення надання на рівні програми `app.provide(key, val)` доступне для всіх її компонентів.

Вводяться данні за допомогою `inject()`. Приймає ключ провайдера, опціонально стандартне значення і чи є воно фабричною ф-єю.

```js
// Provider.vue
const message = ref("Hello!");
provide("message", message);
// Receiver.vue
const message = inject("message");
console.log(message.value);
```

Реактивне значення встановлює **реактивне** з'єднання з провайдером. Мутації рекомендовано зберігати всередині провайдера та надавати надавати приймачу функції для змін.

```js
// Provider.vue
const direction = ref("North");
function updateLocation(newValue) {
	direction.value = newValue;
}
provide("location", {
	location,
	updateLocation,
});
// Receiver.vue
const { location, updateLocation } = inject("location");
```

При роботі з багатьма залежними провайдерами або компонентами для інших розробників рекомендовано використовувати символьні ключі, експортовані в окремий файл.

### Асинхронні компоненти

При потребі розділити велику програму на менші частини та їх завантажувати по необхідності використовується ф-я `defineAsyncComponent`. Приймає ф-ю-завантажувача, яка повертає проміс. Колбек resolve слід викликати після отримання визначення компонента із сервера або reject при невдачі.

Динамічний імпорт модуля ES також повертає проміс, його доцільно поєднувати з defineAsyncComponent. Комплектувальники як Vite і webpack підтримують цей синтаксис і викорисовуватимуть як точки розділення пакету, тому можна використати для імпорту SFC.

Певертає компонент-оболонку, який викликає ф-ю-завантажувача лише коли фактично показується на сторінці. Передасть всі реквізити та слоти до внутрішнього компонента.

Асинхронні компоненти можна зареєструвати глобально або визначити безпосередньо в батьківському.

```js
import { defineAsyncComponent } from "vue";
const AsyncComp = defineAsyncComponent(() => import(path));
```

Підтримує обробку станів завантаження та помилок за допомогою додаткових параметрів об'єктного синтаксису:  
`loader` - ф-я-завантажувач;
`loadingComponent` - компонент для використання під час асинхронного завантаження;
`delay` - затримка перед показом компонента (у: 200мс);
`errorComponent` - компонент для використання при невдачі завантаження;
`timeout` - час для завантаження (у: infinity).

```js
const AsyncComp = defineAsyncComponent({
	loader: () => import("./Foo.vue"),
	loadingComponent: LoadingComponent,
	delay: 500,
	errorComponent: ErrorComponent,
	timeout: 3000,
});
```

## Повторне використання

### Композиційні функції