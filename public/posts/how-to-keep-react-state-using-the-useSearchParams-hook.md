---
title: 'How to keep React state using the useSearchParams hook'
date: '2023-03-10'
tags: 'React_Typescript'
shortDescription: 'I would like to discuss how to share state and why using state in some cases is not a good solution.'
---

I would like to discuss how to share state and why using state in some cases is not a good solution.

## Introduction

Let’s image we have an item card. In our case we will consider an example with
a hoodie that has color and size options. But It could be anything or you can
come up something more interesting and complex.
For example sorting, filtering and so on. All what you want.

Please pay attention to the GIF below. I created a simple view to make
it more understandable (I used the [Chakra](https://chakra-ui.com/) UI).

![hoodie](/images/hoodie.gif)

## Why using useState is not good approach

Judging by the GIF, the task is clear, isn't? And of course, the first thoughts will be to do something like this
(sure, we can create separate components and so on to comb our code, but this is just an example):

```tsx
import { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

import gray from '../src/assets/gray.jpg';
import red from '../src/assets/red.jpg';
import blue from '../src/assets/blue.jpg';
import black from '../src/assets/black.jpg';

import './App.css';

type Colors = {
  [key: string]: string;
};

function App() {
  const [color, setColor] = useState('gray');
  const [size, setSize] = useState('s');

  const sizes = ['s', 'l', 'xl', 'xxl'];
  const colors: Colors = {
    gray,
    red,
    blue,
    black,
  };

  return (
    <Container py={20} maxW='3xl'>
      <Box p={30} borderRadius='lg' border='1px' borderColor='gray.300'>
        <Flex alignItems='center'>
          {/***** Image of hoodie *****/}
          <Image src={colors[color]} borderRadius='lg' width={350} alt='Hoodie' />

          <Box p={10}>
            <Heading size='3xl' mb={5}>
              Hoodie
            </Heading>

            {/***** Set color *****/}
            <RadioGroup py={5} onChange={setColor} value={color}>
              <Heading size='sm' mb={4}>
                Colors:
              </Heading>
              <Stack direction='row'>
                {Object.keys(colors).map((color) => (
                  <Radio key={color} size='lg' value={color}>
                    {color.slice(0, 1).toUpperCase() + color.slice(1)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            {/***** Set size *****/}
            <RadioGroup py={5} onChange={setSize} value={size}>
              <Heading size='sm' mb={4}>
                Sizes:
              </Heading>
              <Stack spacing={4} direction='row'>
                {sizes.map((size) => (
                  <Radio key={size} size='lg' value={size}>
                    {size.toUpperCase()}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            <Box py={5}>
              <Heading size='sm' mb={2}>
                Your options:
              </Heading>
              <Text>Color: {color}</Text>
              <Text>Size: {size}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}

export default App;
```

Yes, it works great. But what if the user wants to share this link with someone? Let's look at the GIF again:

![hoodie](/images/hoodie-check-link.gif)

As you may have noticed, we get the default options on a new tab and this behavior can be a little annoying.
Especially if the product has many options. We expect to see the same view, right? So let's choose another way.

## The useSearchParams hook

I'm pretty sure, that you are familiar with [react-router-dom](https://reactrouter.com/en/main) or even used it in your projects,
so let's use it for that.

I assume you know how to install it and we can continue 😉.

Let's change our code a bit. First of all let's import some stuff from <code>react-router-dom</code>:

```tsx
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
```

Let's start with refactoring. First of all, let's remove our state, add some variables and <code>onChange</code> handler:

```tsx
function App() {
  // We can remove that
  // const [color, setColor] = useState('gray')
  // const [size, setSize] = useState('s')

  // Adding variables
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const colorQueryParameter = searchParams.get('color') || 'gray';
  const sizeQueryParameter = searchParams.get('size') || 's'

  const sizes = ['s', 'l', 'xl', 'xxl'];
  const colors: Colors = {
    gray,
    red,
    blue,
    black
  }

  // Adding handler
  const onChangeHandler = (color: string, size: string) => {
    navigate({
      search: `?${createSearchParams({
        color,
        size,
      })}`,
    });
  }

  return (
    // ...some
  )
}
```

We also need to change our markup:

```tsx
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

function App() {
  // ...
  return (
    <Container py={20} maxW='3xl'>
      <Box p={30} borderRadius='lg' border='1px' borderColor='gray.300'>
        <Flex alignItems='center'>
          {/***** Image of hoodie *****/}
          <Image
            src={colors[colorQueryParameter]}
            borderRadius='lg'
            width={350}
            alt='Hoodie'
          />

          <Box p={10}>
            <Heading size='3xl' mb={5}>
              Hoodie
            </Heading>

            {/***** Set color *****/}
            <RadioGroup py={5} defaultValue={colorQueryParameter} name='color'>
              <Heading size='sm' mb={4}>
                Colors:
              </Heading>
              <Stack direction='row'>
                {Object.keys(colors).map((color) => (
                  <Radio
                    onChange={() => onChangeHandler(color, sizeQueryParameter)}
                    key={color}
                    size='lg'
                    value={color}
                  >
                    {color.slice(0, 1).toUpperCase() + color.slice(1)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            {/***** Set size *****/}
            <RadioGroup py={5} defaultValue={sizeQueryParameter} name='size'>
              <Heading size='sm' mb={4}>
                Sizes:
              </Heading>
              <Stack spacing={4} direction='row'>
                {sizes.map((size) => (
                  <Radio
                    onChange={() => onChangeHandler(colorQueryParameter, size)}
                    key={size}
                    size='lg'
                    value={size}
                  >
                    {size.toUpperCase()}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            <Box py={5}>
              <Heading size='sm' mb={2}>
                Your options:
              </Heading>
              <Text>Color: {colorQueryParameter}</Text>
              <Text>Size: {sizeQueryParameter}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}

export default App;
```

Let's get it all together:

```tsx
import './App.css';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import gray from '../src/assets/gray.jpg';
import red from '../src/assets/red.jpg';
import blue from '../src/assets/blue.jpg';
import black from '../src/assets/black.jpg';

import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

type Colors = {
  [key: string]: string;
};

function App() {
  const sizes = ['s', 'l', 'xl', 'xxl'];
  const colors: Colors = {
    gray,
    red,
    blue,
    black,
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const colorQueryParameter = searchParams.get('color') || 'gray';
  const sizeQueryParameter = searchParams.get('size') || 's';

  const onChangeHandler = (color: string, size: string) => {
    navigate({
      search: `?${createSearchParams({
        color,
        size,
      })}`,
    });
  };

  return (
    <Container py={20} maxW='3xl'>
      <Box p={30} borderRadius='lg' border='1px' borderColor='gray.300'>
        <Flex alignItems='center'>
          {/***** Image of hoodie *****/}
          <Image
            src={colors[colorQueryParameter]}
            borderRadius='lg'
            width={350}
            alt='Hoodie'
          />

          <Box p={10}>
            <Heading size='3xl' mb={5}>
              Hoodie
            </Heading>

            {/***** Set color *****/}
            <RadioGroup py={5} defaultValue={colorQueryParameter} name='color'>
              <Heading size='sm' mb={4}>
                Colors:
              </Heading>
              <Stack direction='row'>
                {Object.keys(colors).map((color) => (
                  <Radio
                    onChange={() => onChangeHandler(color, sizeQueryParameter)}
                    key={color}
                    size='lg'
                    value={color}
                  >
                    {color.slice(0, 1).toUpperCase() + color.slice(1)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            {/***** Set size *****/}
            <RadioGroup py={5} defaultValue={sizeQueryParameter} name='size'>
              <Heading size='sm' mb={4}>
                Sizes:
              </Heading>
              <Stack spacing={4} direction='row'>
                {sizes.map((size) => (
                  <Radio
                    onChange={() => onChangeHandler(colorQueryParameter, size)}
                    key={size}
                    size='lg'
                    value={size}
                  >
                    {size.toUpperCase()}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <Divider />

            <Box py={5}>
              <Heading size='sm' mb={2}>
                Your options:
              </Heading>
              <Text>Color: {colorQueryParameter}</Text>
              <Text>Size: {sizeQueryParameter}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}

export default App;
```

Let's take a look at the GIF again:

![hoodie](/images/hoodie-final-result.gif)

As we can see, all the parameters were saved, and when we opened a new tab, we saw the correct view.
Since we just need to update the URL to update the state, we can even use the default HTML behavior to update our state.

And I think that's it. As I wrote above, we can use this when you want to implement filtering, sorting, and so on.

I wish you successful experiments 🙌
