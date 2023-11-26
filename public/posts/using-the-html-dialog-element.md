---
title: 'Using the HTML dialog element'
date: '2023-10-20'
tags: 'HTML_CSS'
shortDescription: "Dialogs are an integral part of any user interface, be it the web, mobile, or any other that exists today. Let's look at the advantages of the dialog element."
---

The <code>dialog</code> tag came for implementing modals and non-modal dialogs in web interfaces. Let's agree that working with modal has almost always been difficult and that's why a lot of developers decided to use some additional libraries. And this is not bad approach but usually we don't need to use all features from these libraries and also it increases the overall bundle size of your app.

## Supporting

You might be wondering about support, as it is a kind of fresh fruit. Yes, but all modern browsers already support it for more than one year.
You can see more details about browser support from [caniuse](https://caniuse.com/dialog).

For browsers with no support, a [polyfill](https://github.com/GoogleChrome/dialog-polyfill) can be used.

## What is a dialog element?

Do you want to confirm something from the user? You present the user a dialog with selectable options. Do you want to gather info from the user? You use a dialog with a submittable form input. There are numerous use cases when it comes to using the dialog in your UIs.

A very basic <code>dialog</code> element looks like that:

```html
<dialog>Hello world!</dialog>
```

Yeah, maybe you have tried to do the same but you don't see it. All good, it is hidden by default. Let's just add <code>open</code> attribute:

```html
<dialog open>Hey, now you can see me</dialog>
```

## Styling of dialog element

Okay, now we can see it but you can ask yourself how did I get this black border? I did not add any styles for that.
Everything is fine these are the default browser styles, but they are really easy to set up.

For instance if you want to remove this black border and add some custom styles, here’s how you can do it:

```css
dialog {
  border: none;
  border-radius: 10px;
  padding: 30px;
  background-color: hotpink;
}
```

## Adding interactivity

I am pretty sure that in real development you will use these dialog boxes a little differently.
Definitelly you can use some triggers to show their. Let's say when clicking a button:

```html
<button type="button" onclick="window.myDialog.show()">Just open</button>
<button type="button" onclick="window.myDialog.showModal()">Open as a modal</button>
<dialog id="myDialog">🖖 Some text content</dialog>
```

As you can notice, we have two methods. These are <code>show()</code> and <code>showModal()</code>. Let's figure out with that!

- <code>show()</code> — adding <code>open</code> and <code>aria-modal="false"</code> attributes. And also doesn't block interaction with page.
- <code>showModal()</code> — openning in modal mode. Adding <code>open</code> and <code>aria-modal="true"</code> attributes. it opens on top of the page, has a background blackout, the rest of the content is not available for interaction.

Okay, we got how it opens it thereforce let's understand how to close.

Actully this is pretty easy. We should call <code>close()</code> method.

```html
<dialog open="open" id="closeMe">
  <h2>Close me! 🙏</h2>
  <p>We get the same result</p>
  <button type="button" onclick="window.closeMe.close()">Close using JavaScript</button>
  <form method="dialog">
    <button>Close using form behavior</button>
  </form>
</dialog>
```

On top of this, we can close our <code>dialog</code> tag using <b>Enter</b> key. Sounds cool, doesn't?

Try to play with it!

## Some tweaks

You will also want to change or set a custom background color. Feel free, you can do it actually easy. We were presented a pseudo CSS property. It's called <code>::backdrop</code>.

Here's an example how we can use it:

```css
dialog::backdrop {
  background-color: black;
}
```

## How to handle outside click

By default, when <code>dialog</code> is opened, it can not be closed when we click outside of its area. Let's take <code>getBoundingClientRect()</code> in order to get coordinates. And based on this, we can call the dialog’s <code>close()</code> event like so:

```js
yourDialog.addEventListener('click', (event) => {
  const rect = collectEmail.getBoundingClientRect();
  if (
    event.clientY < rect.top ||
    event.clientY > rect.bottom ||
    event.clientX < rect.left ||
    event.clientX > rect.right
  ) {
    favDialog.close();
  }
});
```

Thanks for reading and good luck with experiments 🙌
