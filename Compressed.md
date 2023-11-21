# Vue 3 cheatsheet

З використанням композиційного API та script setup.

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
приймає фабрику або об'єкт з гет і сет (краще уникати).  
Перераховується при зміні реактивних залежностей.  
!!! Без побічних ефектів

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

Значення може бути вбудованим обробником або методом.  
Доступ до аргументу події через $event або стрілкову ф-ю.

```html
<button v-on:click="count++">Increase</button>
<button @click="count++">Increase</button>
<button @click="handler">Increase</button>
<button @click="handler, $event">Increase</button>
<button @click="(e) => handler(e)">Increase</button>
<button @click.ctrl.left="handler">Increase</button>
```

Модифікатори:  
`.stop` викликає eventStopPropagination;  
`.prevent` викликає event.preventDefault;  
`.self` спрацьовує лише на собі;  
`.capture`, `.once`, `.passive` параметри слухача;  
ключові модифікатори, модифікатори системи, миші тощо.

#### Прив'язування елементів форми

Двостороння прив'язка за властивістю та подією:
Текстові `input` та `textarea` - `value` та `input`;
`:checkbox` та `:radio` - `checked` та `change`;
`select` - `value` та `change`.  
Початковий стан оголошується на стороні JS.

```html
<input v-model="message" />
<input
	type="checkbox"
	v-model="isChecked"
/>
```

`.lazy` винхронізує після `change` замість `input`;  
`.number` автоматично перетворює дані в число;
`.trim` автоматично обрізає пробіли.

#### Хуки життєвоо циклу

Тільки синхронно в setup.  
`onBeforeMount` перед монтуванням в DOM;  
`onMounted` вмонтований в DOM, є доступ;  
`onBeforeUpdate` реактивна зміна даних;  
`onUpdated` оновлений в DOM;  
`onBeforeUnmount` ще доступний перед демонтуванням;  
`onUnmounted` демонтування виконано.

#### Спостерігачі

Створення побічних ефектів при зміні стану до оновлення.  
`watch` приймає реф, реактив, геттер, масив джерел;  
викликається при першій зміні, з `immediate` негайно.  
`watchEffect` автоматично відстежує залежності;  
викликається негайно; може бути ефективніший.  
Після оновлення: `flush: post` або `watchPostEffect`.  
Асинхронні спостерігачі необхідно зупиняти.

```js
const count = ref(0);
// watch(source, callback, options)
watch(count, changed => cosnole.log(changed));
// watchEffect(callback, options)
watchEffect(() => console.log(count.value));
```

#### Референції в шаблонах

Пряме посилання на елемент DOM (після монтування).

```js
// script setup
const input = ref(null);
onMounted(() => {
	input.value.focus();
});
// template
<input ref="input" />;
```

#### Реєстрація компонентів

Глобально зареєстровані доступні у всьому додатку.

```js
import { createApp } from "vue";
import MyComponent from "./MyComponent.vue";
const app = createApp({});
app.component("ComponentA", MyComponent);
```

Локально зареєстровані доступні лише поточному компоненту.

```js
// script setup
import MyComponent from "./MyComponent.vue";
// template
<MyComponent />;
```

#### Реквізити

Рекомендований спосіб передачі даних parent -> child.  
Невід'ємна частина ідентичності компонента.  
Може встановлюватись синтаксисом об'єкта з перевірками.

```js
// ChildComponent script
const props = defineProps(["foo"]);
console.log(props.foo);
// ParentComponent template
<ChildComponent foo="textValue" />
<ChildComponent :foo="varValue" />
<ChildComponent v-bind="obj" />
```

#### Події

Дані зберігаються в батьківському компоненті;  
рекомендований спосіб змінити дані з дочірнього.  
Додаткові аргументи $emit - аргументи події.  
При прослуховуванні доступ через стрілку або в метод.

```html
<!-- ChildComp.vue -->
<button @click="$emit('someEvent', n)">Press</button>
<!-- ParentComp.vue -->
<ChildComp @some-event="increaseCount" />
<ChildComp @some-event="(n) => count += n" />
```

Поза шаблоном використовується макрос defineEmits().

```js
const emit = defineEmits(["inFocus", "submit"]);
function buttonClick() {
	emit("submit");
}
```

#### v-model з компонентами

Двостороннє прив'язування властивості parent та child.  
Псевдонім для реквізиту і події, за умовчуванням:  
реквізит `modelValue` та подія `update:modelValue`.  
Аргумент дир-ви міняє на `argName` і `update:argName`.

```js
// script setup
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
// template
<input :value="modelValue"
@input="$emit('update:modelValue', $event.target.value)"
/>
```

```js
// script setup
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const value = conputed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});
// template
<input v-model="value" />
```

#### Прохідні атрибути

Коли важко передбачити контекст використання.  
Не оголошений явно в реквізитах або випроміненнях.  
Типові приклади - атрибути class і style.  

```html
<!-- ParentComp.vue -->
<ChildComp class="large" />
<!-- ChildComp.vue -->
<button class="btn">Press</button>
<!-- render -->
<button class="btn large">Press</button>
```

#### Слоти

Заміняє слот на переданий вміст.  
Для кількох слотів елемент template з v-slot.  
За умовчуванням ім'я default.

```html
<!-- ParentComp.vue -->
<ChildComp>Press</ChildComp>
<!-- ChildComp.vue -->
<button><slot /></button>
<!-- render -->
<button>Press</button>
```