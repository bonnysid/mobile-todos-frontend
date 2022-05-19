import React from 'react';
import { Categories } from '../pages/Categories';
import { Category } from '../pages/Category';
import { Todo } from '../pages/Todo';
import { Main } from '../pages/Main';
import { Login } from '../pages/Login';

export enum Routes {
    MAIN = 'MAIN',
    LOGIN = 'LOGIN',
    CATEGORY = 'CATEGORY',
    CATEGORIES = 'CATEGORIES',
    TODO = 'TODO',
}

export interface IRoute {
    name: Routes;
    component: React.ReactElement
}

export const PublicRoutes: IRoute[] = [
    { name: Routes.LOGIN, component: <Login /> },
    { name: Routes.CATEGORIES, component: <Categories /> },
    { name: Routes.CATEGORY, component: <Category /> },
    { name: Routes.MAIN, component: <Main /> },
    { name: Routes.TODO, component: <Todo /> },
];
