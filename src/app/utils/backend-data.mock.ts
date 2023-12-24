import { HttpErrorResponse } from '@angular/common/http';
import { TestData } from './interfaces';

export const testData: TestData = {
  name: 'Тестирование программиста QA',
  _id: 'testDataId',
  time: 180000,
  questions: [
    {
      _id: 'quetionId_1',
      multy: true,
      question: 'С какими видами тестирования Вы работали?',
      answers: [
        'Модульное',
        'Интеграционное',
        'Функциональное',
        'Сквоздное',
        'Приемочное',
        'Производительности',
        'Smoke',
      ],
    },
    {
      _id: 'quetionId_2',
      multy: true,
      question: 'С какими инструментами Вы работали?',
      answers: [
        'Selenium',
        'Katalon Studio',
        'UFT',
        'IBM Rational Functional Tester',
        'TestComplete',
      ],
    },
    {
      _id: 'quetionId_3',
      multy: false,
      question: 'Что Вы цените больше всего на работе?',
      answers: [
        'Опытный коллектив',
        'Высокую оплату',
        'Культуру в компании',
        'Перспективы карьерного роста',
        'Получение уникального опыта',
        'Другое',
      ],
    },
  ],
};

export const checkId = (id: string) => {
  return id == 'rightId'
    ? 'authToken'
    : new HttpErrorResponse({
        status: 401,
        error: 'Пользователь не авторизован',
      });
};
