---
title: 'Mock axios with Jest and React Testing Library in Typescript'
date: '2023-02-01'
tags: 'React_Typescript_Testing'
shortDescription: "Actually we really often face with a case when we need to mock some data and test it. Let's figure out how we can do it using axios."
---

Probably each project has tests for some parts or even for all. 
And that's why we have to able to write tests. Actually often case when we need to test some api and mock it. 
At first glance, this looks like a rather complicated part, and we can find a lof of arcticle where authors advise using some libararies for that. 
And some of them suggest really good solutions. For instance [Mock Server Worker](https://mswjs.io/). 
Take a look at this when you have some free time.

But in this article I want to try to mock axios using Jest and don't have any additional dependencies.

## Launching the application

I used create-react-app to get started quickly and easily. I am sure you already know how can do it. If not you can run the instuction below:

```shell
npx create-react-app my-app --template typescript
```

And also we need to add axios in our app:

```shell
npm install axios
```

Fine! We did it!

Let's create some components and implementing an api request. 
I decided to use known to everyone service [JSON Placeholder](https://jsonplaceholder.typicode.com/) in order get users for our app.

And my request looks like that: 

```ts
 const getUsers = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      setIsLoading(true);
      const { data, status } = await axios.get(url);
      const users = await data.map((user: UsersType) => {
        return {
          id: user.id,
          name: user.name,
        };
      });

      if (status !== 200) {
        throw Error('Something went wrong');
      }

      setIsLoading(false);
      setUsers(users);
    } catch (err) {
      setIsLoading(false);
    }
  };
```

And all together it looks like this:

```tsx
import axios from 'axios';
import { useState } from 'react';
import Container from '../Container';
import s from './Users.module.css';
import UsersList from './UsersList';

export type UsersType = {
  id: number;
  name: string;
};

const Users = () => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      setIsLoading(true);
      const { data, status } = await axios.get(url);
      const users = await data.map((user: UsersType) => {
        return {
          id: user.id,
          name: user.name,
        };
      });

      if (status !== 200) {
        throw Error('Something went wrong');
      }

      setIsLoading(false);
      setUsers(users);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className={s.root}>
        <button onClick={getUsers}>Get users</button>
        {isLoading ? <div>Loading...</div> : <UsersList users={users} />}
      </div>
    </Container>
  );
};

export default Users;
```

Let's I explain what we have above. We already familiar with <code>getUsers</code> function and it makes a request to retrieve a list of users. 
Then we set all users into <code>setUsers</code> and pass them like a props to the <code>UsersList</code> component.

The <code>UsersList</code> component looks pretty easy: 

```tsx
import { UsersType } from '..';

interface UsersListProps {
  users: UsersType[];
}

const UsersList = ({ users }: UsersListProps) => {
  return (
    <ul>
      {users.map((user: UsersType) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
```

## Writing the test

And now we came to the main target of this article. It's mocking of axios library.

Let's create a file for tests. Let's call it <code>Users.test.tsx</code> you can also face with <code>Some.specs.tsx</code>.
As for me, it doesn't really matter. But you can find more answers [here](https://stackoverflow.com/questions/16802030/whats-the-difference-between-tests-and-specs).

First of all we need to mock axios and it is done as follows:

```tsx
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```

Then let's prepare all mock data for testing:

```tsx
const users = [
  { id: 1, name: 'Joe Doe' },
  { id: 2, name: 'Jane Doe' },
];

const mockedResponse = {
  data: users,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
```

Fine! We are ready to write a test!

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import Users from '.';

import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  render(<Users />);

  test('should render list of the users', async () => {
    const users = [
      { id: 1, name: 'Joe Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    const mockedResponse = {
      data: users,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    fireEvent.click(screen.getByText('Get users'));
    expect(await screen.findByText('Loading...')).toBeInTheDocument();

    const userList = await screen.findAllByRole('listitem');
    expect(userList[0]).toHaveTextContent('Joe Doe');
    expect(userList[1]).toHaveTextContent('Jane Doe');
  });
});
```
![test-passes](/images/should-render-list-of-the-users-test-passes.jpg)

And I believe that's it. Good luck with your experiments 🙌
