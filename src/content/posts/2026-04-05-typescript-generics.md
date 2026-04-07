---
title: TypeScript 泛型完全指南
description: 深入理解 TypeScript 泛型的使用场景、语法和最佳实践，让你的代码更加灵活和类型安全。
date: 2026-04-05
draft: false
featured: false
category: frontend
tags:
  - typescript
  - 教程
  - 类型系统
readingTime: 12
---

## 什么是泛型

泛型（Generics）是 TypeScript 中一种强大的类型抽象机制，它允许你编写可复用且类型安全的代码。

简单来说，泛型就是**类型的变量**——就像函数可以接收参数一样，泛型允许我们编写接受类型参数的函数或类。

## 基本语法

### 函数泛型

```typescript
// 定义泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用
const num = identity<number>(42);
const str = identity<string>("hello");
```

### 类型推断

TypeScript 可以自动推断泛型类型：

```typescript
const num = identity(42); // TypeScript 推断为 number
const str = identity("hello"); // TypeScript 推断为 string
```

## 常见使用场景

### 1. 泛型约束

限制泛型的范围：

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
logLength({ length: 10 }); // OK
```

### 2. 泛型接口

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "张三" },
  status: 200,
  message: "成功",
};
```

### 3. 泛型类

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
```

### 4. 泛型工具类型

TypeScript 内置的泛型工具类型：

```typescript
// Partial - 将所有属性变为可选
type PartialUser = Partial<User>;

// Required - 将所有属性变为必需
type RequiredUser = Required<User>;

// Pick - 选取部分属性
type UserPreview = Pick<User, "id" | "name">;

// Omit - 排除部分属性
type UserWithoutId = Omit<User, "id">;
```

## 高级用法

### 多类型参数

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = merge({ name: "张三" }, { age: 25 });
// result: { name: string; age: number }
```

### 默认类型参数

```typescript
interface Response<T = any> {
  data: T;
  status: number;
}

// 不指定类型时默认为 any
const response: Response = {
  data: "hello",
  status: 200,
};

// 指定类型
const userResponse: Response<User> = {
  data: { id: 1, name: "张三" },
  status: 200,
};
```

## 最佳实践

1. **尽量使用类型推断**：让 TypeScript 自动推断泛型类型
2. **适当约束**：使用 `extends` 限制泛型范围
3. **命名约定**：使用 `<T>`、`<T, U>` 或有意义的名称如 `<TItem>`
4. **避免 any**：尽量不要使用 `any`，使用泛型代替

## 总结

泛型是 TypeScript 中非常重要的概念，掌握好泛型可以让你的代码：

- 更加类型安全
- 更加复用
- 更加清晰

希望这篇指南能帮助你更好地理解和使用 TypeScript 泛型！
