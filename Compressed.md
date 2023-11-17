# Vue 3 cheatsheet

---

#### Швидкий старт

Розгортання проекту на базі Vite з опціями.  
Вимагає Node.js 16+.

```bash
npm create vue@latest
cd projectName
npm install
npm run dev
```

#### Створення додатку

```js
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.mount("#app");
```

#### Синтаксис шаблону

Інтерполяція тексту, підтримує js вирази.

```html
<p>{{ msg }}</p>
<p>{{ msg.reverce() }}</p>
```

Директиви:  
`v-if` додає елемент в DOM якщо true;  
`v-else-if`, `v-else` працюють як умовні;  
`v-show` переключає значення CSS display;  
`v-text` встановлює inner text;  
`v-html` встановлює inner html;  
`v-for` цикл крізь масив/об'єкт;  
`v-on` (`@`) прослуховує DOM події;  
`v-bind` (`:`) реактивно оновлює атрибут;  
`v-model` двостороння прив'язка даних;  
`v-once` становлює значення раз, не оновлює.

#### Основи реактивності

Оголошення реактривного стану:  
`ref()` приймає все, повертає об'єкт референції;
`reactive()` приймає об'єкти, повертає проксі.  
При зміні стану змінюють компонент.

```js
const count = ref(0);
```

#### Обчислювальні властивості

Обчислення складної логіки, кількох властивостей.  
`computed()` повертає обчислену референцію;  
приймає фабрику або об'єкт з гет і сет.  
Перераховується при зміні реактивних залежностей.

```js
const fullName = computed(() => name + " " + surname);
```

#### Прив'язування атрибутів

```html
<div v-bind:class="active"></div>
<div :class="active"></div>
<div :class="{active: isActive}"></div>
<div :class="classObject"></div>
<div :class="[mainClasses, otherClasses]"></div>
```

#### Умовний рендеринг

`v-if` рендерить елемент за умови "по-справжньому";  
`v-show` лише перемикає властивість display.

```html
<div v-if="type === 'A'">Type A</div>
<div v-else-if="type === 'B'">Type B</div>
<div v-else>Unknown</div>
<div v-show="isActive">Toggle</div>
```

#### Рендеринг списків

`v-for` рендерить список елементів на основі масиву.  
Підтримка стану за допомогою `key`.  
Приймає необов'язковий псевдонім для індексу.  
Може ітерувати по властивостям об'єкта або діапазону.

```html
<li v-for="item in array">{{item}}</li>
<li v-for="(item, index) in array">{{item}}</li>
<li v-for="value in myObject">{{value}}</li>
<li v-for="n in 10">{{n}}</li>
```

#### Обробка подій
