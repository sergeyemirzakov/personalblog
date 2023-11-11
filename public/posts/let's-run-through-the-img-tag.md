---
title: 'Let''s run through the <img> tag and optimize images in HTML'
date: '2023-09-14'
tags: 'HTML_CSS'
shortDescription: 'Now the img tag gives us a lot of opportunities to work with images. Let''s take a little more detailed look at this.'
---

Let’s talk about images and why using background-image in CSS is not a good 
solution if you want to put a background image on your first screen (for instance).

Let’s imagine one situation. You got the design and you finished styling in the CSS. Suddenly the designer writes to you and says: 
“Hey, dude, we need to put a background image one the first screen of the page”.

Okay, no problemmo, right? And you can do something like that:

```css
.screen {
  background-image: url('/image.jpg');
}
```
You are glad, the designer’s team happy as well, your image is proudly displayed on the first screen.

But what if it’s a not good? Or no? Let's deep into the details.

## Why you have to revise using a background image in CSS

I assume that you use external css files and include them in the <code>head</code> tag. 
But let’s recall how browser works. The browser has to scan entire your html file, fetch 
the CSS and only after that it will start to find your css properties with the image which was 
applied to an element. It takes time, and we are also missing out on the really cool features that
the browser is providing us right now. We will talk about this a bit later.

Also, we have to keep in mind responsive design. Indeed, often we have to display 
different images related to the size of the screen.

You can go with this way:

```css
.screen { 
  background-image: url('/image.jpg'); 
}
@media only screen and (min-width: 768px) {
  .screen { 
    background-image: url('/image-768.jpg'); 
  }
}
@media only screen and (min-width: 1268px) {
  .screen { 
    background-image: url('/image-1268.jpg'); 
  }
}
```

As you can see, we can write a really huge css file only for one image.
But we need to take into account not only the screen size, but also the resolution.

## Advantages of the img tag

Let's take a look at the modern <code>loading</code> attribute:

```html
<img 
  loading="lazy"
  ... 
>
```

The <code>loading=lazy</code> attribute added to the <code>img</code> 
tag allows to postpone loading elements that are not currently in the viewport.

The good news is this attribute is supported by all modern browsers and does not need JS. 
Check this [there](https://caniuse.com/loading-lazy-attrthere).

But you should avoid using this attribute for the first screen if you want to display
the image immediately or for those images that should be displayed first.

But also you can set the <code>fetchpriority</code> attribute.

## Resource hints

One of the last added and useful attributes is <code>fetchpriority</code>. 
It tells browser about priority of the image. Let's say that we need to begin loading some images a bit earlier than others.

```html
<div class="items">
  <img class="item" fetchpriority="high">
  <img class="item" fetchpriority="low">
  <img class="item" fetchpriority="low">
</div>
```

## Optimal size for all screen sizes and resolutions

The srcset attribute automatically places a suitable image depending on the
size and resolution of the screen. This works much better than a set of images in
CSS because it allows you to use a width descriptor.

```html
<img 
  srcset="
    https://placehold.co/100x200 100w,
    https://placehold.co/200x200 200w,
    https://placehold.co/400x200 400w,
    https://placehold.co/800x200 800w"
  ...
>
```

The advantage of the <code>scrset</code> attribute is that it takes into account not only image size but also the resolution.

## Support for modern formats

If you want to use modern formats like web or have, you can specify them,
and if the browser supports them, it will accept them first. 
In order to do this, you can wrap the <code>img</code> tag in the <code>picture</code>:

```html
<picture>
  <source 
    type="image/webp"
    srcset="
      /image.webp?width=100 100w,
      /image.webp?width=200 200w,
      /image.webp?width=400 400w,
      /image.webp?width=800 800w
    " />
  <img ... />
</picture>
```

If desired you can add the avif format and build such a structure:

```html
<picture>
  <source 
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w, ...">
  <source 
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w, ...">
  <img ...>
</picture>
```

## The sizes attribute

By default, the browser assumes that all images have a width of 100vw and only after scanning the entire HTML it knows the correct size. 
In order to tell him the correct size we can use the <code>sizes</code> attribute:

```html
<img
  srcset="..."
  sizes="
  (max-width: 400px) 200px, 
  (max-width: 800px) 500px, 
  100vw"
...
>
```

## Let's collect everything we have

Well, it looks massive, doesn't it? But we can be sure that it will work.
For example, if the browser supports the avif format, it will grab only this and show it,
because it will read all the conditions that we specified in the <code>source</code> 
attribute and stop at the format that it understands, if not, then it will take the format 
that we specified in <code>img</code>:

```html
<picture>
  <source 
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />
  <source 
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />
  <img 
    src="/image.jpg"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 900px) 600px, 50vw"
    loading="lazy"
    alt="Some image"
  />
</picture>
```

And let's look at how we can use a background image without the <code>background-image</code> property in CSS.
We can do this as follows, and also use all available attributes, if we need:

```html
<div class="container">
  <picture class="bg-image">
    <img src='https://images.unsplash.com/photo-1694687530306-e334f8ffa84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3475&q=80'/>
  </picture>
  <h1>I am on top of the image</h1>
</div>
<style>
  .container { position: relative; height: 300px; }
  h1 { position: relative; text-align: center; color: white; }
  .container .bg-image { position: absolute; inset: 0; }
  .bg-image img { width: 100%; height: 100%; object-fit: cover; }
</style>
```

And finally a little advice. All images that are added purely for
beauty: abstract form, colors, gradient - can be marked with the <code>role</code> attribute::

```html
<img role="presentation" ... >
```

This is it. But you can always use ready-made components.
Today frameworks such as [Nextjs](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/) 
or platforms such as [Cloudinary](https://cloudinary.com/) or [Builder.io](https://www.builder.io/) provide image components.





